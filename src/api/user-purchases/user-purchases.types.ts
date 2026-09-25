export type UserPurchasesFindMyQuery = {
    page?: number
    limit?: number
    offset?: number
    type?: 'consultation' | 'subscription'
}

export type UserPurchasesFindMyResponse = {
    rows: Array<{
        paymentVerified: boolean
        planId?: number
        id: string
        type: 'consultation' | 'subscription'
        resourceId: number
        occurredAt: string
        status: string
        amount?: string | null
        currency?: string | null
        provider: string
        refundStatus?: string | null
        refundedAt?: string | null
        periodStart?: string | null
        periodEnd?: string | null
    }>
    total: number
    page: number
    limit: number
    offset: number
}
