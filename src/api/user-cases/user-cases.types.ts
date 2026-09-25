import type * as Models from '../models'

export type UserCasesCreateBody = {
    templateCaseId: number
}

export type UserCasesCreateResponse = Models.UserCase

export type UserCasesGetAllQuery = {
    status?: 'active' | 'completed' | 'archived'
    page?: number
    limit?: number
    offset?: number
}

export type UserCasesGetAllResponse = {
    rows: Array<Models.UserCase>
    total: number
    page: number
    limit: number
    offset: number
}

export type UserCasesGetOneFullResponse = Models.UserCase

export type UserCasesGetOneResponse = Models.UserCase
