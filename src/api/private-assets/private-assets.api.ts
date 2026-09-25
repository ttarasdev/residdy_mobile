import { request, pathSegment, multipart } from '../http'
import type { ApiRequestOptions, UploadFile } from '../http'
import type * as Types from './private-assets.types'

export const privateAssetsApi = {
    /** POST /private-assets
     * Authenticated account; subscription checked by server.
     */
    async create(
        dto: Types.PrivateAssetsCreateBody,
        options: ApiRequestOptions,
        file: UploadFile,
    ): Promise<Types.PrivateAssetsCreateResponse> {
        return request<Types.PrivateAssetsCreateResponse>(
            '/private-assets',
            options,
            {
                method: 'POST',
                body: multipart(dto, file),
            },
        )
    },

    /** GET /private-assets/:id
     * Authenticated account.
     */
    async getById(
        id: number,
        options: ApiRequestOptions,
    ): Promise<Types.PrivateAssetsGetByIdResponse> {
        return request<Types.PrivateAssetsGetByIdResponse>(
            `/private-assets/${pathSegment(id)}`,
            options,
            { method: 'GET' },
        )
    },

    /** DELETE /private-assets/:id
     * Authenticated account; subscription checked by server.
     */
    async delete(
        id: number,
        options: ApiRequestOptions,
    ): Promise<Types.PrivateAssetsDeleteResponse> {
        return request<Types.PrivateAssetsDeleteResponse>(
            `/private-assets/${pathSegment(id)}`,
            options,
            { method: 'DELETE' },
        )
    },

    /** PATCH /private-assets/:id/toggle-popular
     * Authenticated account; subscription checked by server.
     */
    async togglePopular(
        id: number,
        options: ApiRequestOptions,
    ): Promise<Types.PrivateAssetsTogglePopularResponse> {
        return request<Types.PrivateAssetsTogglePopularResponse>(
            `/private-assets/${pathSegment(id)}/toggle-popular`,
            options,
            { method: 'PATCH' },
        )
    },

    /** GET /private-assets/:id/url
     * Authenticated account.
     */
    async getSignedUrl(
        id: number,
        options: ApiRequestOptions,
    ): Promise<Types.PrivateAssetsGetSignedUrlResponse> {
        return request<Types.PrivateAssetsGetSignedUrlResponse>(
            `/private-assets/${pathSegment(id)}/url`,
            options,
            { method: 'GET' },
        )
    },

    /** GET /private-assets/:id/file
     * Authenticated account.
     */
    async download(
        id: number,
        options: ApiRequestOptions,
    ): Promise<Types.PrivateAssetsDownloadResponse> {
        return request<Types.PrivateAssetsDownloadResponse>(
            `/private-assets/${pathSegment(id)}/file`,
            options,
            {
                method: 'GET',
                response: 'blob',
            },
        )
    },
}
