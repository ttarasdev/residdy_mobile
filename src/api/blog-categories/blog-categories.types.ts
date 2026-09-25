import type * as Models from '../models'

export type BlogCategoriesFindAllQuery = {
    page?: number
    limit?: number
    offset?: number
}

export type BlogCategoriesFindAllResponse = {
    rows: Array<Models.BlogCategory>
    total: number
    page: number
    limit: number
    offset: number
}

export type BlogCategoriesFindOneResponse = Models.BlogCategory
