import { request, pathSegment } from '../http'
import type { ApiRequestOptions } from '../http'
import type * as Types from './consultation-reviews.types'

export const consultationReviewsApi = {
    /** POST /consultation-reviews
     * Authenticated account.
     */
    async create(
        dto: Types.ConsultationReviewsCreateBody,
        options: ApiRequestOptions,
    ): Promise<Types.ConsultationReviewsCreateResponse> {
        return request<Types.ConsultationReviewsCreateResponse>(
            '/consultation-reviews',
            options,
            { method: 'POST', body: dto },
        )
    },

    /** GET /consultation-reviews/my
     * Authenticated account.
     */
    async findMy(
        query: Types.ConsultationReviewsFindMyQuery,
        options: ApiRequestOptions,
    ): Promise<Types.ConsultationReviewsFindMyResponse> {
        return request<Types.ConsultationReviewsFindMyResponse>(
            '/consultation-reviews/my',
            options,
            { method: 'GET', query },
        )
    },

    /** PATCH /consultation-reviews/my/:id
     * Authenticated account.
     */
    async updateMy(
        id: number,
        dto: Types.ConsultationReviewsUpdateMyBody,
        options: ApiRequestOptions,
    ): Promise<Types.ConsultationReviewsUpdateMyResponse> {
        return request<Types.ConsultationReviewsUpdateMyResponse>(
            `/consultation-reviews/my/${pathSegment(id)}`,
            options,
            { method: 'PATCH', body: dto },
        )
    },

    /** GET /consultation-reviews/specialist/:specialistId
     * Authenticated account.
     */
    async findPublished(
        specialistId: number,
        query: Types.ConsultationReviewsFindPublishedQuery,
        options: ApiRequestOptions,
    ): Promise<Types.ConsultationReviewsFindPublishedResponse> {
        return request<Types.ConsultationReviewsFindPublishedResponse>(
            `/consultation-reviews/specialist/${pathSegment(specialistId)}`,
            options,
            { method: 'GET', query },
        )
    },
}
