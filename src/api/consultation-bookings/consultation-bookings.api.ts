import { request, pathSegment, multipart } from '../http'
import type { ApiRequestOptions, UploadFile } from '../http'
import type * as Types from './consultation-bookings.types'

export const consultationBookingsApi = {
    /** POST /consultation-bookings
     * Authenticated account; subscription checked by server.
     */
    async create(
        dto: Types.ConsultationBookingsCreateBody,
        options: ApiRequestOptions,
        file?: UploadFile,
    ): Promise<Types.ConsultationBookingsCreateResponse> {
        return request<Types.ConsultationBookingsCreateResponse>(
            '/consultation-bookings',
            options,
            {
                method: 'POST',
                body: multipart(dto, file),
            },
        )
    },

    /** GET /consultation-bookings/my
     * Authenticated account.
     */
    async findMy(
        query: Types.ConsultationBookingsFindMyQuery,
        options: ApiRequestOptions,
    ): Promise<Types.ConsultationBookingsFindMyResponse> {
        return request<Types.ConsultationBookingsFindMyResponse>(
            '/consultation-bookings/my',
            options,
            { method: 'GET', query },
        )
    },

    /** GET /consultation-bookings/my/:id
     * Authenticated account.
     */
    async findMyOne(
        id: number,
        options: ApiRequestOptions,
    ): Promise<Types.ConsultationBookingsFindMyOneResponse> {
        return request<Types.ConsultationBookingsFindMyOneResponse>(
            `/consultation-bookings/my/${pathSegment(id)}`,
            options,
            { method: 'GET' },
        )
    },

    /** GET /consultation-bookings/my/:id/actions
     * Authenticated account.
     */
    async actions(
        id: number,
        options: ApiRequestOptions,
    ): Promise<Types.ConsultationBookingsActionsResponse> {
        return request<Types.ConsultationBookingsActionsResponse>(
            `/consultation-bookings/my/${pathSegment(id)}/actions`,
            options,
            { method: 'GET' },
        )
    },

    /** GET /consultation-bookings/my/:id/reschedule-slots
     * Authenticated account.
     */
    async rescheduleSlots(
        id: number,
        query: Types.ConsultationBookingsRescheduleSlotsQuery,
        options: ApiRequestOptions,
    ): Promise<Types.ConsultationBookingsRescheduleSlotsResponse> {
        return request<Types.ConsultationBookingsRescheduleSlotsResponse>(
            `/consultation-bookings/my/${pathSegment(id)}/reschedule-slots`,
            options,
            { method: 'GET', query },
        )
    },

    /** PATCH /consultation-bookings/:id/reschedule
     * Authenticated account.
     */
    async reschedule(
        id: number,
        dto: Types.ConsultationBookingsRescheduleBody,
        options: ApiRequestOptions,
    ): Promise<Types.ConsultationBookingsRescheduleResponse> {
        return request<Types.ConsultationBookingsRescheduleResponse>(
            `/consultation-bookings/${pathSegment(id)}/reschedule`,
            options,
            { method: 'PATCH', body: dto },
        )
    },

    /** POST /consultation-bookings/:id/process-dev
     * Authenticated account.
     * Development-only backend payment simulation; not a real purchase.
     */
    async processDev(
        id: number,
        options: ApiRequestOptions,
    ): Promise<Types.ConsultationBookingsProcessDevResponse> {
        return request<Types.ConsultationBookingsProcessDevResponse>(
            `/consultation-bookings/${pathSegment(id)}/process-dev`,
            options,
            { method: 'POST' },
        )
    },

    /** PATCH /consultation-bookings/:id/cancel
     * Authenticated account.
     */
    async cancel(
        id: number,
        options: ApiRequestOptions,
    ): Promise<Types.ConsultationBookingsCancelResponse> {
        return request<Types.ConsultationBookingsCancelResponse>(
            `/consultation-bookings/${pathSegment(id)}/cancel`,
            options,
            { method: 'PATCH' },
        )
    },

    /** PATCH /consultation-bookings/:id/confirm-dev
     * Authenticated account.
     * Development-only backend payment simulation; not a real purchase.
     */
    async confirmDev(
        id: number,
        options: ApiRequestOptions,
    ): Promise<Types.ConsultationBookingsConfirmDevResponse> {
        return request<Types.ConsultationBookingsConfirmDevResponse>(
            `/consultation-bookings/${pathSegment(id)}/confirm-dev`,
            options,
            { method: 'PATCH' },
        )
    },

    /** GET /consultation-bookings/my/:id/file
     * Authenticated account.
     */
    async downloadUserRequest(
        id: number,
        options: ApiRequestOptions,
    ): Promise<Types.ConsultationBookingsDownloadUserRequestResponse> {
        return request<Types.ConsultationBookingsDownloadUserRequestResponse>(
            `/consultation-bookings/my/${pathSegment(id)}/file`,
            options,
            {
                method: 'GET',
                response: 'blob',
            },
        )
    },
}
