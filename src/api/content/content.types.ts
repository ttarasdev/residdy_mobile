export type ContentLanguage = 'PL' | 'UA' | 'EN' | 'RU'

export type PrivateBucket =
    | 'account_ava'
    | 'legal_document_drafts'
    | 'gdoc_templates'
    | 'user_docs'
    | 'consultation_files'
    | 'partner_logos'
    | 'partner_main'
    | 'partner_adv'
    | 'instruction_headers'
    | 'instruction_images'
    | 'blog_images'
    | 'manager_files'

export interface ContentVariant {
    id: number
    bucket: PrivateBucket
    originalName: string
    smallAssetId: number
    mediumAssetId: number
    largeAssetId: number
    visibility:
        | 'private'
        | 'owner_and_managers'
        | 'managers'
        | 'admins'
        | 'all_accounts'
    ownerAccountId: number
    createdByAccountId: number
}

export interface CaseInstructionBlock {
    id: number
    instructionId: number
    type: 'text' | 'photo'
    sortKey: number
    contentJson: Record<string, unknown> | null
    variantId: number | null
    variant?: ContentVariant | null
}

export interface CaseInstruction {
    id: number
    title: string
    description: string
    lan: ContentLanguage
    status: 'draft' | 'active' | 'archived'
    headerVariantId: number | null
    headerVariant?: ContentVariant | null
    /** Legacy records only. This is a public asset, not a private variant. */
    headerIconId?: number | null
    blocks?: CaseInstructionBlock[]
    isPopular: boolean
    createdAt: string
    updatedAt: string
}

export interface ContentRequestOptions {
    baseUrl: string
    token: string
    signal?: AbortSignal
}
