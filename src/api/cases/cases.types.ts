import type * as Models from '../models'

export type CasesFindAllQuery = {
    page?: number
    status?: 'draft' | 'active' | 'archived'
    lan?: 'UA' | 'PL' | 'EN' | 'RU'
    isPopular?: boolean
    typeId?: number
    limit?: number
    offset?: number
}

export type CasesFindAllResponse = {
    rows: Array<Models.Cases>
    total: number
    page: number
    limit: number
    offset: number
}

export type CasesGetOneResponse = Models.Cases & { stages: Models.CaseStage[] }
