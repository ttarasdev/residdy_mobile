import { request, pathSegment } from '../http'
import type { ApiRequestOptions } from '../http'
import type * as Types from './user-case-tasks.types'

export const userCaseTasksApi = {
    /** POST /user-case-tasks/:id/toggle
     * Authenticated account; subscription checked by server.
     */
    async toggle(
        id: number,
        options: ApiRequestOptions,
    ): Promise<Types.UserCaseTasksToggleResponse> {
        return request<Types.UserCaseTasksToggleResponse>(
            `/user-case-tasks/${pathSegment(id)}/toggle`,
            options,
            { method: 'POST' },
        )
    },

    /** POST /user-case-tasks/:id/set-date
     * Authenticated account; subscription checked by server.
     */
    async setDate(
        id: number,
        dto: Types.UserCaseTasksSetDateBody,
        options: ApiRequestOptions,
    ): Promise<Types.UserCaseTasksSetDateResponse> {
        return request<Types.UserCaseTasksSetDateResponse>(
            `/user-case-tasks/${pathSegment(id)}/set-date`,
            options,
            { method: 'POST', body: dto },
        )
    },
}
