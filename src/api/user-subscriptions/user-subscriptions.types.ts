import type * as Models from '../models'

export type UserSubscriptionsCurrentResponse = {
    subscription: Models.UserSubscription
    active: boolean
    plan: Models.SubscriptionPlan
    nextPrice?: Models.SubscriptionPrice
    storePaymentsEnabled: boolean
}

export type UserSubscriptionsHistoryQuery = {
    page?: number
    limit?: number
    offset?: number
}

export type UserSubscriptionsHistoryResponse = {
    rows: Array<Models.SubscriptionEvent>
    total: number
    page: number
    limit: number
    offset: number
}

export type UserSubscriptionsCheckoutBody = {
    priceId: number
    legalVersionIds: Array<number>
}

export type UserSubscriptionsCheckoutResponse = {
    legalAcceptanceId: string
    versionIds: Array<number>
    price: Models.SubscriptionPrice
    expiresAt: string
}

export type UserSubscriptionsVerifyResponse = never
