import type * as Models from '../models'

export type ConsultationReviewsCreateBody = {
    consultationBookingId: number
    rating: number
    comment: string
}

export type ConsultationReviewsCreateResponse = Models.ConsultationReview

export type ConsultationReviewsFindMyQuery = {
    page?: number
    limit?: number
    offset?: number
    userId?: number
    specialistId?: number
    consultationBookingId?: number
    status?: 'pending_moderation' | 'published' | 'rejected'
}

export type ConsultationReviewsFindMyResponse = {
    rows: Array<Models.ConsultationReview>
    total: number
    page: number
    limit: number
    offset: number
}

export type ConsultationReviewsUpdateMyBody = {
    rating?: number
    comment?: string
}

export type ConsultationReviewsUpdateMyResponse = Models.ConsultationReview

export type ConsultationReviewsFindPublishedQuery = {
    page?: number
    limit?: number
    offset?: number
    userId?: number
    specialistId?: number
    consultationBookingId?: number
    status?: 'pending_moderation' | 'published' | 'rejected'
}

export type ConsultationReviewsFindPublishedResponse = {
    rows: Array<
        Pick<
            Models.ConsultationReview,
            | 'id'
            | 'rating'
            | 'comment'
            | 'createdAt'
            | 'specialistId'
            | 'user'
            | 'specialist'
        >
    >
    total: number
    page: number
    limit: number
    offset: number
}
