import { request } from '../http'
import type { ApiRequestOptions } from '../http'
import type * as Types from './search.types'

export const searchApi = {
    /** GET /search
     * Authenticated account; subscription checked by server.
     */
    async search(
        query: Types.SearchSearchQuery,
        options: ApiRequestOptions,
    ): Promise<Types.SearchSearchResponse> {
        return request<Types.SearchSearchResponse>('/search', options, {
            method: 'GET',
            query,
        })
    },
}
