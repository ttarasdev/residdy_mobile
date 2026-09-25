import type * as Models from '../models'

export type CaseStageTasksFindByStageQuery = {
    page?: number
    limit?: number
    offset?: number
}

export type CaseStageTasksFindByStageResponse = {
    rows: Array<Models.CaseStageTask>
    total: number
    page: number
    limit: number
    offset: number
}
