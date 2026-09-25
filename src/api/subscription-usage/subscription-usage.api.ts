import { request } from '../http'
import type { ApiRequestOptions } from '../http'
import type * as Types from './subscription-usage.types'

export const subscriptionUsageApi = {
    /** GET /subscription-usage/me
     * Authenticated account.
     */
    async current(
        options: ApiRequestOptions,
    ): Promise<Types.SubscriptionUsageCurrentResponse> {
        return request<Types.SubscriptionUsageCurrentResponse>(
            '/subscription-usage/me',
            options,
            { method: 'GET' },
        )
    },

    /** GET /subscription-usage/me/history
     * Authenticated account.
     */
    async history(
        query: Types.SubscriptionUsageHistoryQuery,
        options: ApiRequestOptions,
    ): Promise<Types.SubscriptionUsageHistoryResponse> {
        return request<Types.SubscriptionUsageHistoryResponse>(
            '/subscription-usage/me/history',
            options,
            { method: 'GET', query },
        )
    },
}
