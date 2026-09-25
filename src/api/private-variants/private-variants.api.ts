import { request, pathSegment, multipart } from '../http'
import type { ApiRequestOptions, UploadFile } from '../http'
import type * as Types from './private-variants.types'

export const privateVariantsApi = {
    /** POST /private-variants
     * Authenticated account; subscription checked by server.
     */
    async create(
        dto: Types.PrivateVariantsCreateBody,
        options: ApiRequestOptions,
        file: UploadFile,
    ): Promise<Types.PrivateVariantsCreateResponse> {
        return request<Types.PrivateVariantsCreateResponse>(
            '/private-variants',
            options,
            {
                method: 'POST',
                body: multipart(dto, file),
            },
        )
    },

    /** GET /private-variants/:id
     * Authenticated account.
     */
    async getById(
        id: number,
        options: ApiRequestOptions,
    ): Promise<Types.PrivateVariantsGetByIdResponse> {
        return request<Types.PrivateVariantsGetByIdResponse>(
            `/private-variants/${pathSegment(id)}`,
            options,
            { method: 'GET' },
        )
    },

    /** DELETE /private-variants/:id
     * Authenticated account; subscription checked by server.
     */
    async delete(
        id: number,
        options: ApiRequestOptions,
    ): Promise<Types.PrivateVariantsDeleteResponse> {
        return request<Types.PrivateVariantsDeleteResponse>(
            `/private-variants/${pathSegment(id)}`,
            options,
            { method: 'DELETE' },
        )
    },

    /** PATCH /private-variants/:id/toggle-popular
     * Authenticated account; subscription checked by server.
     */
    async togglePopular(
        id: number,
        options: ApiRequestOptions,
    ): Promise<Types.PrivateVariantsTogglePopularResponse> {
        return request<Types.PrivateVariantsTogglePopularResponse>(
            `/private-variants/${pathSegment(id)}/toggle-popular`,
            options,
            { method: 'PATCH' },
        )
    },
}
