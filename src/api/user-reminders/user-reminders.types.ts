import type * as Models from '../models'

export type UserRemindersGetMyQuery = {
    page?: number
    status?: 'active' | 'cancelled'
    limit?: number
    offset?: number
}

export type UserRemindersGetMyResponse = {
    rows: Array<Models.UserReminder>
    total: number
    page: number
    limit: number
    offset: number
}

export type UserRemindersGetOneMyResponse = Models.UserReminder

export type UserRemindersCancelMyResponse = Models.UserReminder
