import type * as Models from '../models'

export type BlogPostsFindAllQuery = {
    categoryId?: number
    q?: string
    isPinned?: boolean
    isPopular?: boolean
    status?: 'draft' | 'scheduled' | 'published' | 'archived'
    lan?: 'UA' | 'PL' | 'EN' | 'RU'
    page?: number
    limit?: number
    offset?: number
}

export type BlogPostsFindAllResponse = {
    rows: Array<Models.BlogPost>
    total: number
    page: number
    limit: number
    offset: number
}

export type BlogPostsFindOneResponse = Models.BlogPost
