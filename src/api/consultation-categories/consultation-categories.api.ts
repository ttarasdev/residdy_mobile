import { request, pathSegment } from '../http'
import type { ApiRequestOptions } from '../http'
import type * as Types from './consultation-categories.types'

export const consultationCategoriesApi = {
    /** GET /consultation-categories/active
     * Authenticated account; subscription checked by server.
     */
    async findActive(
        query: Types.ConsultationCategoriesFindActiveQuery,
        options: ApiRequestOptions,
    ): Promise<Types.ConsultationCategoriesFindActiveResponse> {
        return request<Types.ConsultationCategoriesFindActiveResponse>(
            '/consultation-categories/active',
            options,
            { method: 'GET', query },
        )
    },

    /** GET /consultation-categories/:id
     * Authenticated account; subscription checked by server.
     */
    async findOne(
        id: number,
        options: ApiRequestOptions,
    ): Promise<Types.ConsultationCategoriesFindOneResponse> {
        return request<Types.ConsultationCategoriesFindOneResponse>(
            `/consultation-categories/${pathSegment(id)}`,
            options,
            { method: 'GET' },
        )
    },
}
