import { request, pathSegment } from '../http'
import type { ApiRequestOptions } from '../http'
import type * as Types from './specialists.types'

export const specialistsApi = {
    /** GET /specialists/:id
     * Authenticated account; subscription checked by server.
     */
    async getById(
        id: number,
        options: ApiRequestOptions,
    ): Promise<Types.SpecialistsGetByIdResponse> {
        return request<Types.SpecialistsGetByIdResponse>(
            `/specialists/${pathSegment(id)}`,
            options,
            { method: 'GET' },
        )
    },
}
