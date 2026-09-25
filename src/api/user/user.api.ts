import { request, multipart } from '../http'
import type {
    ApiRequestOptions,
    PublicRequestOptions,
    UploadFile,
} from '../http'
import type * as Types from './user.types'

export const userApi = {
    /** POST /user/me/onboarding/complete — server timestamp, idempotent. */
    async completeOnboarding(options: ApiRequestOptions): Promise<Types.UserGetMeResponse> {
        return request<Types.UserGetMeResponse>('/user/me/onboarding/complete', options, { method: 'POST' })
    },

    /** POST /user/register
     * Public endpoint.
     */
    async register(
        dto: Types.UserRegisterBody,
        options: PublicRequestOptions,
    ): Promise<Types.UserRegisterResponse> {
        return request<Types.UserRegisterResponse>('/user/register', options, {
            method: 'POST',
            auth: false,
            body: dto,
        })
    },

    /** GET /user/me
     * Authenticated account.
     */
    async getMe(options: ApiRequestOptions): Promise<Types.UserGetMeResponse> {
        return request<Types.UserGetMeResponse>('/user/me', options, {
            method: 'GET',
        })
    },

    /** PATCH /user/me
     * Authenticated account.
     */
    async updateMe(
        dto: Types.UserUpdateMeBody,
        options: ApiRequestOptions,
    ): Promise<Types.UserUpdateMeResponse> {
        return request<Types.UserUpdateMeResponse>('/user/me', options, {
            method: 'PATCH',
            body: dto,
        })
    },

    /** DELETE /user/me
     * Authenticated account.
     */
    async removeMe(
        options: ApiRequestOptions,
    ): Promise<Types.UserRemoveMeResponse> {
        return request<Types.UserRemoveMeResponse>('/user/me', options, {
            method: 'DELETE',
        })
    },

    /** POST /user/me/avatar
     * Authenticated account.
     */
    async uploadMyAvatar(
        options: ApiRequestOptions,
        file: UploadFile,
    ): Promise<Types.UserUploadMyAvatarResponse> {
        return request<Types.UserUploadMyAvatarResponse>(
            '/user/me/avatar',
            options,
            {
                method: 'POST',
                body: multipart(undefined, file),
            },
        )
    },
}
