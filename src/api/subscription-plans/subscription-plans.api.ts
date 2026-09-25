import { request, pathSegment } from '../http'
import type { ApiRequestOptions } from '../http'
import type * as Types from './subscription-plans.types'

export const subscriptionPlansApi = {
    /** GET /subscription-plans
     * Authenticated account.
     */
    async list(
        query: Types.SubscriptionPlansListQuery,
        options: ApiRequestOptions,
    ): Promise<Types.SubscriptionPlansListResponse> {
        return request<Types.SubscriptionPlansListResponse>(
            '/subscription-plans',
            options,
            { method: 'GET', query },
        )
    },

    /** GET /subscription-plans/:id
     * Authenticated account.
     */
    async get(
        id: number,
        options: ApiRequestOptions,
    ): Promise<Types.SubscriptionPlansGetResponse> {
        return request<Types.SubscriptionPlansGetResponse>(
            `/subscription-plans/${pathSegment(id)}`,
            options,
            { method: 'GET' },
        )
    },
}
