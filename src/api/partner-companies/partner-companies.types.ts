import type * as Models from '../models'

export type PartnerCompaniesGetAllQuery = {
    page?: number
    limit?: number
    offset?: number
    partnerId?: number
    companyName?: string
    status?: 'draft' | 'active' | 'blocked' | 'archived'
}

export type PartnerCompaniesGetAllResponse = {
    rows: Array<Models.PartnerCompany>
    total: number
    page: number
    limit: number
    offset: number
}

export type PartnerCompaniesGetOneResponse = Models.PartnerCompany
