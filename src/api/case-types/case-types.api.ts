import { request, pathSegment } from '../http'
import type { ApiRequestOptions } from '../http'
import type * as Types from './case-types.types'

export const caseTypesApi = {
    /** GET /case-types
     * Authenticated account; subscription checked by server.
     */
    async findAll(
        query: Types.CaseTypesFindAllQuery,
        options: ApiRequestOptions,
    ): Promise<Types.CaseTypesFindAllResponse> {
        return request<Types.CaseTypesFindAllResponse>('/case-types', options, {
            method: 'GET',
            query,
        })
    },

    /** GET /case-types/:id
     * Authenticated account; subscription checked by server.
     */
    async findOne(
        id: number,
        options: ApiRequestOptions,
    ): Promise<Types.CaseTypesFindOneResponse> {
        return request<Types.CaseTypesFindOneResponse>(
            `/case-types/${pathSegment(id)}`,
            options,
            { method: 'GET' },
        )
    },
}
