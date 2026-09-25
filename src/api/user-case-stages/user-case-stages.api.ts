import { request, pathSegment } from '../http'
import type { ApiRequestOptions } from '../http'
import type * as Types from './user-case-stages.types'

export const userCaseStagesApi = {
    /** GET /user-case-stages/by-case/:userCaseId
     * Authenticated account; subscription checked by server.
     */
    async findByCase(
        query: Types.UserCaseStagesFindByCaseQuery,
        userCaseId: number,
        options: ApiRequestOptions,
    ): Promise<Types.UserCaseStagesFindByCaseResponse> {
        return request<Types.UserCaseStagesFindByCaseResponse>(
            `/user-case-stages/by-case/${pathSegment(userCaseId)}`,
            options,
            { method: 'GET', query },
        )
    },

    /** GET /user-case-stages/by-case/:userCaseId/by-stage-no/:stageNo
     * Authenticated account; subscription checked by server.
     */
    async findByCaseAndStageNo(
        userCaseId: number,
        stageNo: number,
        options: ApiRequestOptions,
    ): Promise<Types.UserCaseStagesFindByCaseAndStageNoResponse> {
        return request<Types.UserCaseStagesFindByCaseAndStageNoResponse>(
            `/user-case-stages/by-case/${pathSegment(userCaseId)}/by-stage-no/${pathSegment(stageNo)}`,
            options,
            { method: 'GET' },
        )
    },

    /** GET /user-case-stages/:id
     * Authenticated account; subscription checked by server.
     */
    async findOne(
        id: number,
        options: ApiRequestOptions,
    ): Promise<Types.UserCaseStagesFindOneResponse> {
        return request<Types.UserCaseStagesFindOneResponse>(
            `/user-case-stages/${pathSegment(id)}`,
            options,
            { method: 'GET' },
        )
    },

    /** POST /user-case-stages/:id/next
     * Authenticated account; subscription checked by server.
     */
    async goNext(
        id: number,
        options: ApiRequestOptions,
    ): Promise<Types.UserCaseStagesGoNextResponse> {
        return request<Types.UserCaseStagesGoNextResponse>(
            `/user-case-stages/${pathSegment(id)}/next`,
            options,
            { method: 'POST' },
        )
    },
}
