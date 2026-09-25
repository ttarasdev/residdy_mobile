import { request, pathSegment } from '../http'
import type { PublicRequestOptions } from '../http'
import type * as Types from './legal-documents.types'

export const legalDocumentsApi = {
    /** GET /legal-documents
     * Public endpoint.
     */
    async list(
        query: Types.LegalDocumentsListQuery,
        options: PublicRequestOptions,
    ): Promise<Types.LegalDocumentsListResponse> {
        return request<Types.LegalDocumentsListResponse>(
            '/legal-documents',
            options,
            { method: 'GET', auth: false, query },
        )
    },

    /** GET /legal-documents/versions/:id/file
     * Public endpoint.
     */
    async file(
        id: number,
        options: PublicRequestOptions,
    ): Promise<Types.LegalDocumentsFileResponse> {
        return request<Types.LegalDocumentsFileResponse>(
            `/legal-documents/versions/${pathSegment(id)}/file`,
            options,
            {
                method: 'GET',
                auth: false,
                response: 'blob',
            },
        )
    },

    /** GET /legal-documents/:code
     * Public endpoint.
     */
    async current(
        code:
            | 'registration_terms'
            | 'privacy_policy'
            | 'subscription_terms'
            | 'consultation_terms'
            | 'specialist_terms'
            | 'partner_terms',
        options: PublicRequestOptions,
    ): Promise<Types.LegalDocumentsCurrentResponse> {
        return request<Types.LegalDocumentsCurrentResponse>(
            `/legal-documents/${pathSegment(code)}`,
            options,
            { method: 'GET', auth: false },
        )
    },
}
