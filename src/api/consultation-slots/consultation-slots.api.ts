import { request } from '../http'
import type { ApiRequestOptions } from '../http'
import type * as Types from './consultation-slots.types'

export const consultationSlotsApi = {
    /** GET /consultation-slots
     * Authenticated account; subscription checked by server.
     */
    async findPublic(
        query: Types.ConsultationSlotsFindPublicQuery,
        options: ApiRequestOptions,
    ): Promise<Types.ConsultationSlotsFindPublicResponse> {
        return request<Types.ConsultationSlotsFindPublicResponse>(
            '/consultation-slots',
            options,
            { method: 'GET', query },
        )
    },
}
