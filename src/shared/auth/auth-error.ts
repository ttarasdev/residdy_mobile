import { ApiError } from '../../api/http'

export function authErrorKey(error: unknown, context?: 'login' | 'register' | 'code') {
    if (error instanceof Error && error.message === 'API_NOT_CONFIGURED') return 'auth.errors.configuration'
    if (error instanceof Error && error.message === 'USER_ACCOUNT_REQUIRED') return 'auth.errors.accountType'
    if (error instanceof ApiError) {
        if (error.status === 429) return 'auth.errors.tooMany'
        if (error.status === 401 && context === 'login') return 'auth.errors.credentials'
        if (error.status === 409 && context === 'register') return 'auth.errors.registrationConflict'
        if (error.status === 409) return 'auth.errors.changed'
        if (error.status === 400 && context === 'code') return 'auth.errors.code'
        if (error.status === 400) return 'auth.errors.invalid'
    }
    return 'auth.errors.request'
}
