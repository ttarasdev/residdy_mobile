import type * as Models from '../models'

export type CaseRemindersFindAllQuery = {
    lan?: 'UA' | 'PL' | 'EN' | 'RU'
    page?: number
    limit?: number
    offset?: number
}

export type CaseRemindersFindAllResponse = {
    rows: Array<Models.CaseReminder>
    total: number
    page: number
    limit: number
    offset: number
}

export type CaseRemindersFindOneResponse = Models.CaseReminder
