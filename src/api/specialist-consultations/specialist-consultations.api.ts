import { request, pathSegment } from '../http'
import type { ApiRequestOptions } from '../http'
import type * as Types from './specialist-consultations.types'

export const specialistConsultationsApi = {
    /** GET /specialist-consultations/active
     * Authenticated account; subscription checked by server.
     */
    async findPublic(
        query: Types.SpecialistConsultationsFindPublicQuery,
        options: ApiRequestOptions,
    ): Promise<Types.SpecialistConsultationsFindPublicResponse> {
        return request<Types.SpecialistConsultationsFindPublicResponse>(
            '/specialist-consultations/active',
            options,
            { method: 'GET', query },
        )
    },

    /** GET /specialist-consultations/active/:id
     * Authenticated account; subscription checked by server.
     */
    async findAvailable(
        id: number,
        options: ApiRequestOptions,
    ): Promise<Types.SpecialistConsultationsFindAvailableResponse> {
        return request<Types.SpecialistConsultationsFindAvailableResponse>(
            `/specialist-consultations/active/${pathSegment(id)}`,
            options,
            { method: 'GET' },
        )
    },
}
