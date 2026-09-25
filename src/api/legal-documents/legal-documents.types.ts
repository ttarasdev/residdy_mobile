export type LegalDocumentsListQuery = {
    page?: number
    limit?: number
    offset?: number
    placement?:
        | 'registration'
        | 'subscription_checkout'
        | 'consultation_checkout'
        | 'specialist'
        | 'partner'
}

export type LegalDocumentsListResponse = {
    rows: Array<{
        code:
            | 'registration_terms'
            | 'privacy_policy'
            | 'subscription_terms'
            | 'consultation_terms'
            | 'specialist_terms'
            | 'partner_terms'
        title: string
        versionId: number
        version: number
        publishedAt?: string
        isPlaceholder: boolean
        sha256: string
        url: string
    }>
    total: number
    page: number
    limit: number
    offset: number
}

export type LegalDocumentsFileResponse = Blob

export type LegalDocumentsCurrentResponse = {
    code:
        | 'registration_terms'
        | 'privacy_policy'
        | 'subscription_terms'
        | 'consultation_terms'
        | 'specialist_terms'
        | 'partner_terms'
    title: string
    versionId: number
    version: number
    publishedAt?: string
    isPlaceholder: boolean
    sha256: string
    url: string
}
