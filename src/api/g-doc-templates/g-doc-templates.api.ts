import { request, pathSegment } from '../http'
import type { ApiRequestOptions } from '../http'
import type * as Types from './g-doc-templates.types'

export const gDocTemplatesApi = {
    /** GET /g-doc-templates
     * Authenticated account; subscription checked by server.
     */
    async findAll(
        filters: Types.GDocTemplatesFindAllQuery,
        options: ApiRequestOptions,
    ): Promise<Types.GDocTemplatesFindAllResponse> {
        return request<Types.GDocTemplatesFindAllResponse>(
            '/g-doc-templates',
            options,
            { method: 'GET', query: filters },
        )
    },

    /** GET /g-doc-templates/:id
     * Authenticated account; subscription checked by server.
     */
    async findOne(
        id: number,
        options: ApiRequestOptions,
    ): Promise<Types.GDocTemplatesFindOneResponse> {
        return request<Types.GDocTemplatesFindOneResponse>(
            `/g-doc-templates/${pathSegment(id)}`,
            options,
            { method: 'GET' },
        )
    },
}
