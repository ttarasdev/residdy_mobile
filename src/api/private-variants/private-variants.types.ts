import type * as Models from '../models'

export type PrivateVariantsCreateBody = {
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

export type PrivateVariantsCreateResponse = Models.PrivateVariant

export type PrivateVariantsGetByIdResponse = Models.PrivateVariant

export type PrivateVariantsDeleteResponse = {
    success: boolean
}

export type PrivateVariantsTogglePopularResponse = {
    success: boolean
    isPopular: boolean
}
