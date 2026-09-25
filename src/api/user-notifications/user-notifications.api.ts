import { request, pathSegment } from '../http'
import type { ApiRequestOptions } from '../http'
import type * as Types from './user-notifications.types'

export const userNotificationsApi = {
    /** GET /user-notifications/my
     * Authenticated account.
     */
    async getMy(
        query: Types.UserNotificationsGetMyQuery,
        options: ApiRequestOptions,
    ): Promise<Types.UserNotificationsGetMyResponse> {
        return request<Types.UserNotificationsGetMyResponse>(
            '/user-notifications/my',
            options,
            { method: 'GET', query },
        )
    },

    /** GET /user-notifications/my/unread-count
     * Authenticated account.
     */
    async getMyUnreadCount(
        options: ApiRequestOptions,
    ): Promise<Types.UserNotificationsGetMyUnreadCountResponse> {
        return request<Types.UserNotificationsGetMyUnreadCountResponse>(
            '/user-notifications/my/unread-count',
            options,
            { method: 'GET' },
        )
    },

    /** GET /user-notifications/my/:id
     * Authenticated account.
     */
    async getOneMy(
        id: number,
        options: ApiRequestOptions,
    ): Promise<Types.UserNotificationsGetOneMyResponse> {
        return request<Types.UserNotificationsGetOneMyResponse>(
            `/user-notifications/my/${pathSegment(id)}`,
            options,
            { method: 'GET' },
        )
    },

    /** PATCH /user-notifications/my/:id/status
     * Authenticated account.
     */
    async changeStatus(
        id: number,
        dto: Types.UserNotificationsChangeStatusBody,
        options: ApiRequestOptions,
    ): Promise<Types.UserNotificationsChangeStatusResponse> {
        return request<Types.UserNotificationsChangeStatusResponse>(
            `/user-notifications/my/${pathSegment(id)}/status`,
            options,
            { method: 'PATCH', body: dto },
        )
    },
}
