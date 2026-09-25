import { request, pathSegment } from '../http'
import type { ApiRequestOptions } from '../http'
import type * as Types from './partner-companies.types'

export const partnerCompaniesApi = {
    /** GET /partner-companies
     * Authenticated account; subscription checked by server.
     */
    async getAll(
        query: Types.PartnerCompaniesGetAllQuery,
        options: ApiRequestOptions,
    ): Promise<Types.PartnerCompaniesGetAllResponse> {
        return request<Types.PartnerCompaniesGetAllResponse>(
            '/partner-companies',
            options,
            { method: 'GET', query },
        )
    },

    /** GET /partner-companies/:id
     * Authenticated account; subscription checked by server.
     */
    async getOne(
        id: number,
        options: ApiRequestOptions,
    ): Promise<Types.PartnerCompaniesGetOneResponse> {
        return request<Types.PartnerCompaniesGetOneResponse>(
            `/partner-companies/${pathSegment(id)}`,
            options,
            { method: 'GET' },
        )
    },
}
