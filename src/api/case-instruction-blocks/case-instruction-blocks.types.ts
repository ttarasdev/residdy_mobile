import type * as Models from '../models'

export type CaseInstructionBlocksFindByInstructionQuery = {
    page?: number
    limit?: number
    offset?: number
}

export type CaseInstructionBlocksFindByInstructionResponse = {
    rows: Array<Models.CaseInstructionBlock>
    total: number
    page: number
    limit: number
    offset: number
}
