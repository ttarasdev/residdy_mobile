import { request, pathSegment } from '../http'
import type { ApiRequestOptions } from '../http'
import type * as Types from './cases.types'

export const casesApi = {
    /** GET /cases
     * Authenticated account; subscription checked by server.
     */
    async findAll(
        query: Types.CasesFindAllQuery,
        options: ApiRequestOptions,
    ): Promise<Types.CasesFindAllResponse> {
        return request<Types.CasesFindAllResponse>('/cases', options, {
            method: 'GET',
            query,
        })
    },

    /** GET /cases/:id
     * Authenticated account; subscription checked by server.
     */
    async getOne(
        id: number,
        options: ApiRequestOptions,
    ): Promise<Types.CasesGetOneResponse> {
        return request<Types.CasesGetOneResponse>(
            `/cases/${pathSegment(id)}`,
            options,
            { method: 'GET' },
        )
    },
}
