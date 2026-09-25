import type * as Models from '../models'

export type GDocVarsFindAllQuery = {
    offset?: number
    page?: number
    limit?: number
    search?: string
}

export type GDocVarsFindAllResponse = {
    rows: Array<Models.GDocVar>
    total: number
    page: number
    limit: number
    offset: number
}

export type GDocVarsFindOneResponse = Models.GDocVar
