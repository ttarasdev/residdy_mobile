import { request, pathSegment } from '../http'
import type { PublicRequestOptions } from '../http'
import type * as Types from './public-assets.types'

export const publicAssetsApi = {
    /** GET /public-assets
     * Public endpoint.
     */
    async list(
        query: Types.PublicAssetsListQuery,
        options: PublicRequestOptions,
    ): Promise<Types.PublicAssetsListResponse> {
        return request<Types.PublicAssetsListResponse>(
            '/public-assets',
            options,
            { method: 'GET', auth: false, query },
        )
    },

    /** GET /public-assets/:id
     * Public endpoint.
     */
    async getById(
        id: number,
        options: PublicRequestOptions,
    ): Promise<Types.PublicAssetsGetByIdResponse> {
        return request<Types.PublicAssetsGetByIdResponse>(
            `/public-assets/${pathSegment(id)}`,
            options,
            { method: 'GET', auth: false },
        )
    },
}
