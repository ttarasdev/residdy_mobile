import {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
    type ReactNode,
} from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { restoreSession, type Session } from '../auth/session'
import { clearToken, readToken, saveToken } from '../auth/token-storage'
import { onUnauthorized } from '../../api/http'
import { accountsApi } from '../../api/accounts/accounts.api'
import { legalDocumentAcceptancesApi } from '../../api/legal-document-acceptances/legal-document-acceptances.api'
import type { AccountAuthLoginResponse } from '../../api/account-auth/account-auth.types'
import type { LegalDocumentAcceptancesRequirementsResponse } from '../../api/legal-document-acceptances/legal-document-acceptances.types'
import { withApi } from '../config/api'

type SessionState = Session | { status: 'checking' | 'error' }
interface SessionContextValue {
    session: SessionState
    legal?: LegalDocumentAcceptancesRequirementsResponse
    retry: () => void
    signIn: (response: AccountAuthLoginResponse) => Promise<void>
    signOut: () => Promise<void>
    refreshLegal: () => Promise<void>
    sessionExpired: boolean
}
const SessionContext = createContext<SessionContextValue | null>(null)
const sessionKey = ['session'] as const

export default function SessionProvider({ children }: { children: ReactNode }) {
    const client = useQueryClient()
    const [sessionExpired, setSessionExpired] = useState(false)
    const expiry = useRef<Promise<void> | null>(null)
    useEffect(
        () =>
            onUnauthorized((token) => {
                const current = client.getQueryData<Session>(sessionKey)
                if (
                    current?.status !== 'authenticated' ||
                    current.token !== token ||
                    expiry.current
                )
                    return
                setSessionExpired(true)
                client.setQueryData(sessionKey, { status: 'guest' })
                expiry.current = (async () => {
                    await client.cancelQueries()
                    try {
                        await clearToken()
                    } finally {
                        client.removeQueries({
                            predicate: (item) => item.queryKey[0] !== 'session',
                        })
                    }
                })()
                    .catch(() => {
                        // Memory session is already revoked; restoreSession revalidates persisted tokens.
                    })
                    .finally(() => {
                        expiry.current = null
                    })
            }),
        [client],
    )
    const query = useQuery({
        queryKey: sessionKey,
        queryFn: async ({ signal }) => {
            const controller = new AbortController()
            const abort = () => controller.abort()
            signal.addEventListener('abort', abort)
            const timeout = setTimeout(abort, 10000)
            try {
                return await restoreSession({
                    readToken,
                    clearToken,
                    baseUrl: process.env.EXPO_PUBLIC_API_URL,
                    signal: controller.signal,
                })
            } finally {
                clearTimeout(timeout)
                signal.removeEventListener('abort', abort)
            }
        },
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        networkMode: 'always',
    })
    const authenticated =
        query.data?.status === 'authenticated' ? query.data : undefined
    const legalKey = ['legal-requirements', authenticated?.account.id] as const
    const legalQuery = useQuery({
        queryKey: legalKey,
        queryFn: () =>
            withApi((options) =>
                legalDocumentAcceptancesApi.requirements({
                    ...options,
                    token: authenticated!.token,
                }),
            ),
        enabled: !!authenticated,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        networkMode: 'always',
    })
    let session: SessionState = query.isError
        ? { status: 'error' }
        : (query.data ?? { status: 'checking' })
    if (authenticated && legalQuery.isPending) session = { status: 'checking' }
    if (authenticated && legalQuery.isError) session = { status: 'error' }

    async function signIn(response: AccountAuthLoginResponse) {
        await expiry.current
        const account = await withApi((options) =>
            accountsApi.getMe({ ...options, token: response.token }),
        )
        if (account.type !== 'USERS' || account.status !== 'active')
            throw new Error('USER_ACCOUNT_REQUIRED')
        await client.cancelQueries()
        await expiry.current
        await saveToken(response.token)
        setSessionExpired(false)
        client.removeQueries({
            predicate: (item) =>
                item.queryKey[0] !== 'session' &&
                item.queryKey[0] !== 'registration-documents',
        })
        client.setQueryData(['legal-requirements', account.id], response.legal)
        client.setQueryData(sessionKey, (): Session => ({
            status: 'authenticated',
            token: response.token,
            account,
        }))
    }
    async function signOut() {
        await expiry.current
        setSessionExpired(false)
        await client.cancelQueries()
        await clearToken()
        client.removeQueries({
            predicate: (item) => item.queryKey[0] !== 'session',
        })
        client.setQueryData(sessionKey, (): Session => ({ status: 'guest' }))
    }
    async function refreshLegal() {
        const result = await legalQuery.refetch()
        if (result.error) throw result.error
    }
    function retry() {
        if (authenticated) void legalQuery.refetch()
        else void query.refetch()
    }
    return (
        <SessionContext.Provider
            value={{
                session,
                legal: legalQuery.data,
                retry,
                signIn,
                signOut,
                refreshLegal,
                sessionExpired,
            }}
        >
            {children}
        </SessionContext.Provider>
    )
}
export function useSession() {
    const value = useContext(SessionContext)
    if (!value) throw new Error('useSession requires SessionProvider')
    return value
}
