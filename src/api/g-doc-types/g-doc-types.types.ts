import type * as Models from '../models'

export type GDocTypesFindAllQuery = {
    offset?: number
    page?: number
    limit?: number
    status?: 'active' | 'inactive'
    isPopular?: boolean
    search?: string
}

export type GDocTypesFindAllResponse = {
    rows: Array<Models.GDocType>
    total: number
    page: number
    limit: number
    offset: number
}

export type GDocTypesFindOneResponse = Models.GDocType
