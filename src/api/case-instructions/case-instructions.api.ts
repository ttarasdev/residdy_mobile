import { request, pathSegment } from '../http'
import type { ApiRequestOptions } from '../http'
import type * as Types from './case-instructions.types'

export const caseInstructionsApi = {
    /** GET /case-instructions
     * Authenticated account; subscription checked by server.
     */
    async getAll(
        query: Types.CaseInstructionsGetAllQuery,
        options: ApiRequestOptions,
    ): Promise<Types.CaseInstructionsGetAllResponse> {
        return request<Types.CaseInstructionsGetAllResponse>(
            '/case-instructions',
            options,
            { method: 'GET', query },
        )
    },

    /** GET /case-instructions/:id
     * Authenticated account; subscription checked by server.
     */
    async findOne(
        id: number,
        options: ApiRequestOptions,
    ): Promise<Types.CaseInstructionsFindOneResponse> {
        return request<Types.CaseInstructionsFindOneResponse>(
            `/case-instructions/${pathSegment(id)}`,
            options,
            { method: 'GET' },
        )
    },
}
