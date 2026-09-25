import type * as Models from '../models'

export type UserNotificationsGetMyQuery = {
    folder?: 'inbox' | 'archived'
    page?: number
    limit?: number
    offset?: number
}

export type UserNotificationsGetMyResponse = {
    rows: Array<Models.UserNotification>
    total: number
    unread: number
    page: number
    limit: number
    offset: number
}

export type UserNotificationsGetMyUnreadCountResponse = {
    unread: number
}

export type UserNotificationsGetOneMyResponse = Models.UserNotification

export type UserNotificationsChangeStatusBody = {
    status: 'unread' | 'read' | 'archived'
}

export type UserNotificationsChangeStatusResponse = Models.UserNotification
