import type * as Models from '../models'

export type CaseStagesFindByCaseQuery = {
    page?: number
    limit?: number
    offset?: number
}

export type CaseStagesFindByCaseResponse = {
    rows: Array<Models.CaseStage>
    total: number
    page: number
    limit: number
    offset: number
}
