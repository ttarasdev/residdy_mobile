import { request, pathSegment } from '../http'
import type { ApiRequestOptions } from '../http'
import type * as Types from './blog-categories.types'

export const blogCategoriesApi = {
    /** GET /blog-categories
     * Authenticated account; subscription checked by server.
     */
    async findAll(
        query: Types.BlogCategoriesFindAllQuery,
        options: ApiRequestOptions,
    ): Promise<Types.BlogCategoriesFindAllResponse> {
        return request<Types.BlogCategoriesFindAllResponse>(
            '/blog-categories',
            options,
            { method: 'GET', query },
        )
    },

    /** GET /blog-categories/:id
     * Authenticated account; subscription checked by server.
     */
    async findOne(
        id: number,
        options: ApiRequestOptions,
    ): Promise<Types.BlogCategoriesFindOneResponse> {
        return request<Types.BlogCategoriesFindOneResponse>(
            `/blog-categories/${pathSegment(id)}`,
            options,
            { method: 'GET' },
        )
    },
}
