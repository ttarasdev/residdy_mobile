import type * as Models from '../models'

export type SubscriptionPricesListQuery = {
    page?: number
    limit?: number
    offset?: number
}

export type SubscriptionPricesListResponse = {
    rows: Array<Models.SubscriptionPrice>
    total: number
    page: number
    limit: number
    offset: number
}

export type SubscriptionPricesGetResponse = Models.SubscriptionPrice
