import { ApiError, multipart, pathSegment, request } from '../http'
import type { ApiRequestOptions, UploadFile } from '../http'
import type { Account } from '../models'
import type {
    AccountAvatar,
    AvatarFile,
    AvatarRequestOptions,
    AvatarVariant,
} from './accounts.types'

export class AccountApiError extends ApiError {
    constructor(status: number, message: string, details?: unknown) {
        super(status, message, details)
        this.name = 'AccountApiError'
    }
}

export const accountsApi = {
    /** GET /account/me. Available without an active subscription. */
    async getMe(options: ApiRequestOptions): Promise<Account> {
        return request('/account/me', options, { errorType: AccountApiError })
    },

    /** POST /account/me/avatar. Available without an active subscription. */
    async uploadMyAvatar(
        file: UploadFile,
        options: AvatarRequestOptions,
    ): Promise<AccountAvatar> {
        return request('/account/me/avatar', options, {
            method: 'POST',
            body: multipart(undefined, file),
            errorType: AccountApiError,
        })
    },

    /** POST /account/:id/avatar. Users may only update their own account. */
    async uploadAvatar(
        id: number,
        options: ApiRequestOptions,
        file: UploadFile,
    ): Promise<Account> {
        return request(`/account/${pathSegment(id)}/avatar`, options, {
            method: 'POST',
            body: multipart(undefined, file),
            errorType: AccountApiError,
        })
    },

    async getAvatarVariant(
        variantId: number,
        options: AvatarRequestOptions,
    ): Promise<AvatarVariant> {
        return request(`/private-variants/${pathSegment(variantId)}`, options, {
            errorType: AccountApiError,
        })
    },

    async downloadAvatar(
        assetId: number,
        options: AvatarRequestOptions,
    ): Promise<Blob> {
        return request(
            `/private-assets/${pathSegment(assetId)}/file`,
            options,
            {
                response: 'blob',
                errorType: AccountApiError,
            },
        )
    },
}
