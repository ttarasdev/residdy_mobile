import { request, pathSegment } from '../http'
import type { ApiRequestOptions } from '../http'
import type * as Types from './user-reminders.types'

export const userRemindersApi = {
    /** GET /user-reminders/my
     * Authenticated account; subscription checked by server.
     */
    async getMy(
        query: Types.UserRemindersGetMyQuery,
        options: ApiRequestOptions,
    ): Promise<Types.UserRemindersGetMyResponse> {
        return request<Types.UserRemindersGetMyResponse>(
            '/user-reminders/my',
            options,
            { method: 'GET', query },
        )
    },

    /** GET /user-reminders/my/:id
     * Authenticated account; subscription checked by server.
     */
    async getOneMy(
        id: number,
        options: ApiRequestOptions,
    ): Promise<Types.UserRemindersGetOneMyResponse> {
        return request<Types.UserRemindersGetOneMyResponse>(
            `/user-reminders/my/${pathSegment(id)}`,
            options,
            { method: 'GET' },
        )
    },

    /** PATCH /user-reminders/my/:id/cancel
     * Authenticated account; subscription checked by server.
     */
    async cancelMy(
        id: number,
        options: ApiRequestOptions,
    ): Promise<Types.UserRemindersCancelMyResponse> {
        return request<Types.UserRemindersCancelMyResponse>(
            `/user-reminders/my/${pathSegment(id)}/cancel`,
            options,
            { method: 'PATCH' },
        )
    },
}
