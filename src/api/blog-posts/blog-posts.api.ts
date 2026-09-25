import { request, pathSegment } from '../http'
import type { ApiRequestOptions } from '../http'
import type * as Types from './blog-posts.types'

export const blogPostsApi = {
    /** GET /blog-posts
     * Authenticated account; subscription checked by server.
     */
    async findAll(
        filters: Types.BlogPostsFindAllQuery,
        options: ApiRequestOptions,
    ): Promise<Types.BlogPostsFindAllResponse> {
        return request<Types.BlogPostsFindAllResponse>('/blog-posts', options, {
            method: 'GET',
            query: filters,
        })
    },

    /** GET /blog-posts/:id
     * Authenticated account; subscription checked by server.
     */
    async findOne(
        id: number,
        options: ApiRequestOptions,
    ): Promise<Types.BlogPostsFindOneResponse> {
        return request<Types.BlogPostsFindOneResponse>(
            `/blog-posts/${pathSegment(id)}`,
            options,
            { method: 'GET' },
        )
    },
}
