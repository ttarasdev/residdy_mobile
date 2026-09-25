import { request, pathSegment } from '../http'
import type { ApiRequestOptions } from '../http'
import type * as Types from './legal-document-acceptances.types'

export const legalDocumentAcceptancesApi = {
    /** GET /legal-document-acceptances/me/requirements
     * Authenticated account.
     */
    async requirements(
        options: ApiRequestOptions,
    ): Promise<Types.LegalDocumentAcceptancesRequirementsResponse> {
        return request<Types.LegalDocumentAcceptancesRequirementsResponse>(
            '/legal-document-acceptances/me/requirements',
            options,
            { method: 'GET' },
        )
    },

    /** GET /legal-document-acceptances/me/:id
     * Authenticated account.
     */
    async get(
        id: string,
        options: ApiRequestOptions,
    ): Promise<Types.LegalDocumentAcceptancesGetResponse> {
        return request<Types.LegalDocumentAcceptancesGetResponse>(
            `/legal-document-acceptances/me/${pathSegment(id)}`,
            options,
            { method: 'GET' },
        )
    },

    /** POST /legal-document-acceptances/me
     * Authenticated account.
     */
    async accept(
        dto: Types.LegalDocumentAcceptancesAcceptBody,
        options: ApiRequestOptions,
    ): Promise<Types.LegalDocumentAcceptancesAcceptResponse> {
        return request<Types.LegalDocumentAcceptancesAcceptResponse>(
            '/legal-document-acceptances/me',
            options,
            { method: 'POST', body: dto },
        )
    },
}
