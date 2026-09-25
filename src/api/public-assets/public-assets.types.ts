import type * as Models from '../models'

export type PublicAssetsListQuery = {
    bucket?: 'icons' | 'system_files' | 'legal_documents'
    page?: number
    limit?: number
    offset?: number
    isPopular?: boolean
}

export type PublicAssetsListResponse = {
    rows: Array<Models.PublicAsset>
    total: number
    page: number
    limit: number
    offset: number
}

export type PublicAssetsGetByIdResponse = Models.PublicAsset
