import type * as Models from '../models'

export type SubscriptionUsageCurrentResponse = {
    active: boolean
    periodStart: string
    periodEnd: string
    documents: {
        used: number
        limit: number
        remaining: number
    }
    openCases: {
        used: number
        limit: number
        remaining: number
    }
}

export type SubscriptionUsageHistoryQuery = {
    page?: number
    limit?: number
    offset?: number
}

export type SubscriptionUsageHistoryResponse = {
    rows: Array<Models.SubscriptionUsage>
    total: number
    page: number
    limit: number
    offset: number
}
