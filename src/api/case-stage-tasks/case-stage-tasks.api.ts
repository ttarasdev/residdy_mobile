import { request, pathSegment } from '../http'
import type { ApiRequestOptions } from '../http'
import type * as Types from './case-stage-tasks.types'

export const caseStageTasksApi = {
    /** GET /case-stage-tasks/by-stage/:stageId
     * Authenticated account; subscription checked by server.
     */
    async findByStage(
        stageId: number,
        query: Types.CaseStageTasksFindByStageQuery,
        options: ApiRequestOptions,
    ): Promise<Types.CaseStageTasksFindByStageResponse> {
        return request<Types.CaseStageTasksFindByStageResponse>(
            `/case-stage-tasks/by-stage/${pathSegment(stageId)}`,
            options,
            { method: 'GET', query },
        )
    },
}
