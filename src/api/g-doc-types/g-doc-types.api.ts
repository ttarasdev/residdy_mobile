import { request, pathSegment } from '../http'
import type { ApiRequestOptions } from '../http'
import type * as Types from './g-doc-types.types'

export const gDocTypesApi = {
    /** GET /g-doc-types
     * Authenticated account; subscription checked by server.
     */
    async findAll(
        filters: Types.GDocTypesFindAllQuery,
        options: ApiRequestOptions,
    ): Promise<Types.GDocTypesFindAllResponse> {
        return request<Types.GDocTypesFindAllResponse>(
            '/g-doc-types',
            options,
            { method: 'GET', query: filters },
        )
    },

    /** GET /g-doc-types/:id
     * Authenticated account; subscription checked by server.
     */
    async findOne(
        id: number,
        options: ApiRequestOptions,
    ): Promise<Types.GDocTypesFindOneResponse> {
        return request<Types.GDocTypesFindOneResponse>(
            `/g-doc-types/${pathSegment(id)}`,
            options,
            { method: 'GET' },
        )
    },
}
