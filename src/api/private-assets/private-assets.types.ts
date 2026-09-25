import type * as Models from '../models'

export type PrivateAssetsCreateBody = {
    bucket:
        | 'instruction_headers'
        | 'instruction_images'
        | 'blog_images'
        | 'manager_files'
        | 'account_ava'
        | 'legal_document_drafts'
        | 'gdoc_templates'
        | 'user_docs'
        | 'consultation_files'
        | 'partner_logos'
        | 'partner_main'
        | 'partner_adv'
    originalName: string
    ownerAccountId?: number
    visibility?:
        | 'private'
        | 'owner_and_managers'
        | 'managers'
        | 'admins'
        | 'all_accounts'
}

export type PrivateAssetsCreateResponse = Models.PrivateAsset

export type PrivateAssetsGetByIdResponse = Models.PrivateAsset

export type PrivateAssetsDeleteResponse = {
    success: boolean
}

export type PrivateAssetsTogglePopularResponse = {
    success: boolean
    isPopular: boolean
}

export type PrivateAssetsGetSignedUrlResponse = {
    url: string
}

export type PrivateAssetsDownloadResponse = Blob
