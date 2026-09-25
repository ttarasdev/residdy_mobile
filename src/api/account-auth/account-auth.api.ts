import { request } from '../http'
import type { ApiRequestOptions, PublicRequestOptions } from '../http'
import type * as Types from './account-auth.types'

export const accountAuthApi = {
    /** POST /account-auth/request-email-change
     * Authenticated account.
     */
    async requestEmailChange(
        dto: Types.AccountAuthRequestEmailChangeBody,
        options: ApiRequestOptions,
    ): Promise<Types.AccountAuthRequestEmailChangeResponse> {
        return request<Types.AccountAuthRequestEmailChangeResponse>(
            '/account-auth/request-email-change',
            options,
            { method: 'POST', body: dto },
        )
    },

    /** POST /account-auth/confirm-email-change
     * Authenticated account.
     */
    async confirmEmailChange(
        dto: Types.AccountAuthConfirmEmailChangeBody,
        options: ApiRequestOptions,
    ): Promise<Types.AccountAuthConfirmEmailChangeResponse> {
        return request<Types.AccountAuthConfirmEmailChangeResponse>(
            '/account-auth/confirm-email-change',
            options,
            { method: 'POST', body: dto },
        )
    },

    /** POST /account-auth/confirm
     * Public endpoint.
     */
    async confirm(
        dto: Types.AccountAuthConfirmBody,
        options: PublicRequestOptions,
    ): Promise<Types.AccountAuthConfirmResponse> {
        return request<Types.AccountAuthConfirmResponse>(
            '/account-auth/confirm',
            options,
            { method: 'POST', auth: false, body: dto },
        )
    },

    /** POST /account-auth/resend
     * Public endpoint.
     */
    async resend(
        dto: Types.AccountAuthResendBody,
        options: PublicRequestOptions,
    ): Promise<Types.AccountAuthResendResponse> {
        return request<Types.AccountAuthResendResponse>(
            '/account-auth/resend',
            options,
            { method: 'POST', auth: false, body: dto },
        )
    },

    /** POST /account-auth/request-password-change
     * Authenticated account.
     */
    async requestPasswordChange(
        dto: Types.AccountAuthRequestPasswordChangeBody,
        options: ApiRequestOptions,
    ): Promise<Types.AccountAuthRequestPasswordChangeResponse> {
        return request<Types.AccountAuthRequestPasswordChangeResponse>(
            '/account-auth/request-password-change',
            options,
            { method: 'POST', body: dto },
        )
    },

    /** POST /account-auth/change-password
     * Authenticated account.
     */
    async changePassword(
        dto: Types.AccountAuthChangePasswordBody,
        options: ApiRequestOptions,
    ): Promise<Types.AccountAuthChangePasswordResponse> {
        return request<Types.AccountAuthChangePasswordResponse>(
            '/account-auth/change-password',
            options,
            { method: 'POST', body: dto },
        )
    },

    /** POST /account-auth/login
     * Public endpoint.
     */
    async login(
        dto: Types.AccountAuthLoginBody,
        options: PublicRequestOptions,
    ): Promise<Types.AccountAuthLoginResponse> {
        return request<Types.AccountAuthLoginResponse>(
            '/account-auth/login',
            options,
            { method: 'POST', auth: false, body: dto },
        )
    },

    /** POST /account-auth/forgot-password
     * Public endpoint.
     */
    async forgotPassword(
        dto: Types.AccountAuthForgotPasswordBody,
        options: PublicRequestOptions,
    ): Promise<Types.AccountAuthForgotPasswordResponse> {
        return request<Types.AccountAuthForgotPasswordResponse>(
            '/account-auth/forgot-password',
            options,
            { method: 'POST', auth: false, body: dto },
        )
    },

    /** POST /account-auth/reset-password
     * Public endpoint.
     */
    async resetPassword(
        dto: Types.AccountAuthResetPasswordBody,
        options: PublicRequestOptions,
    ): Promise<Types.AccountAuthResetPasswordResponse> {
        return request<Types.AccountAuthResetPasswordResponse>(
            '/account-auth/reset-password',
            options,
            { method: 'POST', auth: false, body: dto },
        )
    },
}
