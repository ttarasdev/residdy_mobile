import type * as Models from '../models'

export type CaseTypesFindAllQuery = {
    page?: number
    status?: 'active' | 'draft' | 'archived'
    limit?: number
    offset?: number
    isPopular?: boolean
    lan?: 'UA' | 'PL' | 'EN' | 'RU'
}

export type CaseTypesFindAllResponse = {
    rows: Array<Models.CaseType>
    total: number
    page: number
    limit: number
    offset: number
}

export type CaseTypesFindOneResponse = Models.CaseType
