import type * as Models from '../models'

export type LegalDocumentAcceptancesRequirementsResponse = {
    placement:
        | 'registration'
        | 'subscription_checkout'
        | 'consultation_checkout'
        | 'specialist'
        | 'partner'
    documents: Array<{
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
    acceptanceRequired: boolean
}

export type LegalDocumentAcceptancesGetResponse = Models.LegalDocumentAcceptance

export type LegalDocumentAcceptancesAcceptBody = {
    legalVersionIds: Array<number>
}

export type LegalDocumentAcceptancesAcceptResponse =
    Models.LegalDocumentAcceptance
