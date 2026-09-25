import { request, pathSegment } from '../http'
import type { ApiRequestOptions } from '../http'
import type * as Types from './partner-banners.types'

export const partnerBannersApi = {
    /** GET /partner-banners/random/big
     * Authenticated account; no subscription required.
     */
    async getBig(
        options: ApiRequestOptions,
    ): Promise<Types.PartnerBannersGetBigResponse> {
        return request<Types.PartnerBannersGetBigResponse>(
            '/partner-banners/random/big',
            options,
            { method: 'GET' },
        )
    },

    /** GET /partner-banners/random/small
     * Authenticated account; no subscription required.
     */
    async getSmall(
        options: ApiRequestOptions,
    ): Promise<Types.PartnerBannersGetSmallResponse> {
        return request<Types.PartnerBannersGetSmallResponse>(
            '/partner-banners/random/small',
            options,
            { method: 'GET' },
        )
    },

    /** POST /partner-banners/impressions
     * Authenticated account; no subscription required.
     */
    async addImpressions(
        dto: Types.PartnerBannersAddImpressionsBody,
        options: ApiRequestOptions,
    ): Promise<Types.PartnerBannersAddImpressionsResponse> {
        return request<Types.PartnerBannersAddImpressionsResponse>(
            '/partner-banners/impressions',
            options,
            { method: 'POST', body: dto },
        )
    },

    /** POST /partner-banners/:id/click
     * Authenticated account; no subscription required.
     */
    async addClick(
        id: number,
        options: ApiRequestOptions,
    ): Promise<Types.PartnerBannersAddClickResponse> {
        return request<Types.PartnerBannersAddClickResponse>(
            `/partner-banners/${pathSegment(id)}/click`,
            options,
            { method: 'POST' },
        )
    },

    /** GET /partner-banners/:id
     * Authenticated account; no subscription required.
     */
    async getOne(
        id: number,
        options: ApiRequestOptions,
    ): Promise<Types.PartnerBannersGetOneResponse> {
        return request<Types.PartnerBannersGetOneResponse>(
            `/partner-banners/${pathSegment(id)}`,
            options,
            { method: 'GET' },
        )
    },
}
