import AsyncStorage from '@react-native-async-storage/async-storage'
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { AppState } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { readWelcomeCompleted, saveWelcomeCompleted } from '../onboarding/welcome-storage'
import { syncWelcome } from '../onboarding/sync-welcome'
import { useSession } from './SessionProvider'
import { userApi } from '../../api/user/user.api'
import { withApi } from '../config/api'

const WelcomeContext = createContext<{
    completed: boolean | null
    error: boolean
    retry: () => void
    complete: () => Promise<void>
} | null>(null)

export default function WelcomeProvider({ children }: { children: ReactNode }) {
    const [localCompleted, setLocalCompleted] = useState<boolean | null>(null)
    const { session } = useSession()
    const account = session.status === 'authenticated' ? session : null
    useEffect(() => {
        let active = true
        void readWelcomeCompleted(AsyncStorage).then(value => { if (active) setLocalCompleted(value) })
        return () => { active = false }
    }, [])
    const query = useQuery({
        queryKey: ['welcome', account?.account.id, localCompleted],
        enabled: !!account && localCompleted !== null,
        queryFn: () => withApi(options => syncWelcome(!!localCompleted, {
            getMe: () => userApi.getMe({ ...options, token: account!.token }),
            complete: () => userApi.completeOnboarding({ ...options, token: account!.token }),
        })),
        staleTime: Infinity,
        retry: 2,
        networkMode: 'always',
        refetchInterval: state => state.state.status === 'error' ? 30000 : false,
    })
    const { refetch } = query
    useEffect(() => {
        if (!account || localCompleted === null) return
        const listener = AppState.addEventListener('change', state => {
            if (state === 'active') void refetch()
        })
        return () => listener.remove()
    }, [account?.account.id, localCompleted, refetch])
    useEffect(() => {
        if (!query.data?.onboardingCompletedAt || localCompleted) return
        setLocalCompleted(true)
        void saveWelcomeCompleted(AsyncStorage).catch(() => {})
    }, [query.data?.onboardingCompletedAt, localCompleted])
    async function complete() {
        // Persist first: failed API writes can be retried after restart/sign-in.
        await saveWelcomeCompleted(AsyncStorage)
        setLocalCompleted(true)
    }
    const completed = localCompleted === null ? null
        : !account ? localCompleted
        : localCompleted || !!query.data?.onboardingCompletedAt ? true
        : query.data ? false : null
    return <WelcomeContext.Provider value={{ completed, error: query.isError, retry: () => { void refetch() }, complete }}>
        {children}
    </WelcomeContext.Provider>
}
export function useWelcome() {
    const context = useContext(WelcomeContext)
    if (!context) throw new Error('useWelcome requires WelcomeProvider')
    return context
}
