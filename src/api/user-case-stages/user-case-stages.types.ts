import type * as Models from '../models'

export type UserCaseStagesFindByCaseQuery = {
    page?: number
    limit?: number
    offset?: number
}

export type UserCaseStagesFindByCaseResponse = {
    rows: Array<Models.UserCaseStage>
    total: number
    page: number
    limit: number
    offset: number
}

export type UserCaseStagesFindByCaseAndStageNoResponse =
    null | Models.UserCaseStage

export type UserCaseStagesFindOneResponse = null | Models.UserCaseStage

export type UserCaseStagesGoNextResponse = Models.UserCase
