import type * as Models from '../models'

export type SubscriptionPlansListQuery = {
    page?: number
    limit?: number
    offset?: number
}

export type SubscriptionPlansListResponse = {
    rows: Array<Models.SubscriptionPlan>
    total: number
    page: number
    limit: number
    offset: number
}

export type SubscriptionPlansGetResponse = Models.SubscriptionPlan
