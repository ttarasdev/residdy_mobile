import { request, pathSegment } from '../http'
import type { ApiRequestOptions } from '../http'
import type * as Types from './case-stages.types'

export const caseStagesApi = {
    /** GET /case-stages/:caseId
     * Authenticated account; subscription checked by server.
     */
    async findByCase(
        caseId: number,
        query: Types.CaseStagesFindByCaseQuery,
        options: ApiRequestOptions,
    ): Promise<Types.CaseStagesFindByCaseResponse> {
        return request<Types.CaseStagesFindByCaseResponse>(
            `/case-stages/${pathSegment(caseId)}`,
            options,
            { method: 'GET', query },
        )
    },
}
