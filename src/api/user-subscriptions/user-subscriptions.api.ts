import { request } from '../http'
import type { ApiRequestOptions } from '../http'
import type * as Types from './user-subscriptions.types'

export const userSubscriptionsApi = {
    /** Development server only; activates a DEV offer for the authenticated user. */
    async devPurchase(
        dto: { priceId: number },
        options: ApiRequestOptions,
    ): Promise<Types.UserSubscriptionsCurrentResponse> {
        return request('/user-subscriptions/me/dev-purchase', options, {
            method: 'POST',
            body: dto,
        })
    },
    /** GET /user-subscriptions/me
     * Authenticated account.
     */
    async current(
        options: ApiRequestOptions,
    ): Promise<Types.UserSubscriptionsCurrentResponse> {
        return request<Types.UserSubscriptionsCurrentResponse>(
            '/user-subscriptions/me',
            options,
            { method: 'GET' },
        )
    },

    /** GET /user-subscriptions/me/history
     * Authenticated account.
     */
    async history(
        query: Types.UserSubscriptionsHistoryQuery,
        options: ApiRequestOptions,
    ): Promise<Types.UserSubscriptionsHistoryResponse> {
        return request<Types.UserSubscriptionsHistoryResponse>(
            '/user-subscriptions/me/history',
            options,
            { method: 'GET', query },
        )
    },

    /** POST /user-subscriptions/me/checkout
     * Authenticated account.
     */
    async checkout(
        dto: Types.UserSubscriptionsCheckoutBody,
        options: ApiRequestOptions,
    ): Promise<Types.UserSubscriptionsCheckoutResponse> {
        return request<Types.UserSubscriptionsCheckoutResponse>(
            '/user-subscriptions/me/checkout',
            options,
            { method: 'POST', body: dto },
        )
    },

    /** POST /user-subscriptions/verify-purchase
     * Authenticated account.
     * Backend currently returns 503: store verification is not configured.
     */
    async verify(
        options: ApiRequestOptions,
    ): Promise<Types.UserSubscriptionsVerifyResponse> {
        return request<Types.UserSubscriptionsVerifyResponse>(
            '/user-subscriptions/verify-purchase',
            options,
            { method: 'POST' },
        )
    },
}
