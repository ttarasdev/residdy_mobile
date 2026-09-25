import { request, pathSegment } from '../http'
import type { ApiRequestOptions } from '../http'
import type * as Types from './g-doc-vars.types'

export const gDocVarsApi = {
    /** GET /g-doc-vars
     * Authenticated account; subscription checked by server.
     */
    async findAll(
        query: Types.GDocVarsFindAllQuery,
        options: ApiRequestOptions,
    ): Promise<Types.GDocVarsFindAllResponse> {
        return request<Types.GDocVarsFindAllResponse>('/g-doc-vars', options, {
            method: 'GET',
            query,
        })
    },

    /** GET /g-doc-vars/:id
     * Authenticated account; subscription checked by server.
     */
    async findOne(
        id: number,
        options: ApiRequestOptions,
    ): Promise<Types.GDocVarsFindOneResponse> {
        return request<Types.GDocVarsFindOneResponse>(
            `/g-doc-vars/${pathSegment(id)}`,
            options,
            { method: 'GET' },
        )
    },
}
