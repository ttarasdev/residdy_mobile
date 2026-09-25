import { request, pathSegment } from '../http'
import type { ApiRequestOptions } from '../http'
import type * as Types from './subscription-prices.types'

export const subscriptionPricesApi = {
    /** GET /subscription-prices
     * Authenticated account.
     */
    async list(
        query: Types.SubscriptionPricesListQuery,
        options: ApiRequestOptions,
    ): Promise<Types.SubscriptionPricesListResponse> {
        return request<Types.SubscriptionPricesListResponse>(
            '/subscription-prices',
            options,
            { method: 'GET', query },
        )
    },

    /** GET /subscription-prices/:id
     * Authenticated account.
     */
    async get(
        id: number,
        options: ApiRequestOptions,
    ): Promise<Types.SubscriptionPricesGetResponse> {
        return request<Types.SubscriptionPricesGetResponse>(
            `/subscription-prices/${pathSegment(id)}`,
            options,
            { method: 'GET' },
        )
    },
}
