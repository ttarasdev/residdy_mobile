import type * as Models from '../models'

export type PartnerBannersGetBigResponse = Models.PartnerBanner | null

export type PartnerBannersGetSmallResponse = Models.PartnerBanner[]

export type PartnerBannersAddImpressionsBody = {
    ids: Array<number>
}

export type PartnerBannersAddImpressionsResponse = {
    counted: number
}

export type PartnerBannersAddClickResponse = {
    counted: number
}

export type PartnerBannersGetOneResponse = Models.PartnerBanner
