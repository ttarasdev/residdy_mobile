import type * as Models from '../models'

export type ConsultationCategoriesFindActiveQuery = {
    page?: number
    limit?: number
    offset?: number
    isActive?: boolean
    isPopular?: boolean
}

export type ConsultationCategoriesFindActiveResponse = {
    rows: Array<Models.ConsultationCategory>
    total: number
    page: number
    limit: number
    offset: number
}

export type ConsultationCategoriesFindOneResponse = Models.ConsultationCategory
