import { request, pathSegment } from '../http'
import type { ApiRequestOptions } from '../http'
import type * as Types from './case-reminders.types'

export const caseRemindersApi = {
    /** GET /case-reminders
     * Authenticated account; subscription checked by server.
     */
    async findAll(
        query: Types.CaseRemindersFindAllQuery,
        options: ApiRequestOptions,
    ): Promise<Types.CaseRemindersFindAllResponse> {
        return request<Types.CaseRemindersFindAllResponse>(
            '/case-reminders',
            options,
            { method: 'GET', query },
        )
    },

    /** GET /case-reminders/:id
     * Authenticated account; subscription checked by server.
     */
    async findOne(
        id: number,
        options: ApiRequestOptions,
    ): Promise<Types.CaseRemindersFindOneResponse> {
        return request<Types.CaseRemindersFindOneResponse>(
            `/case-reminders/${pathSegment(id)}`,
            options,
            { method: 'GET' },
        )
    },
}
