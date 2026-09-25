import { accountsApi } from '../../api/accounts/accounts.api'
import { ApiError } from '../../api/http'
import type { Account } from '../../api/models'

export type Session =
    | { status: 'guest' }
    | { status: 'authenticated'; account: Account; token: string }

interface SessionOptions {
    readToken: () => Promise<string | null>
    clearToken: () => Promise<void>
    baseUrl?: string
    signal?: AbortSignal
}

export async function restoreSession({ readToken, clearToken, baseUrl, signal }: SessionOptions): Promise<Session> {
    const token = await readToken()
    if (!token) return { status: 'guest' }
    if (!baseUrl) throw new Error('EXPO_PUBLIC_API_URL is not configured')

    let account: Account
    try {
        account = await accountsApi.getMe({ baseUrl, token, signal })
    } catch (error) {
        // Only a rejected session invalidates the saved token. Network/5xx/403 do not.
        if (error instanceof ApiError && error.status === 401) {
            await clearToken()
            return { status: 'guest' }
        }
        throw error
    }
    if (account.status !== 'active' || account.type !== 'USERS') {
        await clearToken()
        return { status: 'guest' }
    }
    return { status: 'authenticated', account, token }
}
