import { request, pathSegment } from '../http'
import type { ApiRequestOptions } from '../http'
import type * as Types from './user-cases.types'

export const userCasesApi = {
    /** POST /user-cases
     * Authenticated account; subscription checked by server.
     */
    async create(
        dto: Types.UserCasesCreateBody,
        options: ApiRequestOptions,
    ): Promise<Types.UserCasesCreateResponse> {
        return request<Types.UserCasesCreateResponse>('/user-cases', options, {
            method: 'POST',
            body: dto,
        })
    },

    /** GET /user-cases
     * Authenticated account; subscription checked by server.
     */
    async getAll(
        query: Types.UserCasesGetAllQuery,
        options: ApiRequestOptions,
    ): Promise<Types.UserCasesGetAllResponse> {
        return request<Types.UserCasesGetAllResponse>('/user-cases', options, {
            method: 'GET',
            query,
        })
    },

    /** GET /user-cases/:id/full
     * Authenticated account; subscription checked by server.
     */
    async getOneFull(
        id: number,
        options: ApiRequestOptions,
    ): Promise<Types.UserCasesGetOneFullResponse> {
        return request<Types.UserCasesGetOneFullResponse>(
            `/user-cases/${pathSegment(id)}/full`,
            options,
            { method: 'GET' },
        )
    },

    /** GET /user-cases/:id
     * Authenticated account; subscription checked by server.
     */
    async getOne(
        id: number,
        options: ApiRequestOptions,
    ): Promise<Types.UserCasesGetOneResponse> {
        return request<Types.UserCasesGetOneResponse>(
            `/user-cases/${pathSegment(id)}`,
            options,
            { method: 'GET' },
        )
    },
}
