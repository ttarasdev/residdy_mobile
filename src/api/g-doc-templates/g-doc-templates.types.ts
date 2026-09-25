import type * as Models from '../models'

export type GDocTemplatesFindAllQuery = {
    offset?: number
    page?: number
    limit?: number
    gDocTypeId?: number
    status?: 'active' | 'inactive'
    search?: string
}

export type GDocTemplatesFindAllResponse = {
    rows: Array<Models.GDocTemplate>
    total: number
    page: number
    limit: number
    offset: number
}

export type GDocTemplatesFindOneResponse = Models.GDocTemplate
