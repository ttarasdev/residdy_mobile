import { ApiError, type PublicRequestOptions } from '../../api/http'
import { userApi } from '../../api/user/user.api'
import type { UserRegisterBody } from '../../api/user/user.types'
import { accountAuthApi } from '../../api/account-auth/account-auth.api'

export async function registerOrResend(body: UserRegisterBody, options: PublicRequestOptions): Promise<void> {
    try {
        await userApi.register(body, options)
    } catch (error) {
        // Only the backend's duplicate-email response should trigger resending.
        if (!(error instanceof ApiError) || error.status !== 409 || error.message !== 'Email already in use') throw error
        // The server only sends confirmation to pending accounts and enforces cooldown.
        // Existing passwords and profiles are never overwritten.
        await accountAuthApi.resend({ email: body.email }, options)
    }
}
