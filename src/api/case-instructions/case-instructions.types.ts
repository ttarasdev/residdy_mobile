import type * as Models from '../models'

export type CaseInstructionsGetAllQuery = {
    page?: number
    status?: 'draft' | 'active' | 'archived'
    lan?: 'UA' | 'PL' | 'EN' | 'RU'
    isPopular?: boolean
    limit?: number
    offset?: number
}

export type CaseInstructionsGetAllResponse = {
    rows: Array<Models.CasesInstruction>
    total: number
    page: number
    limit: number
    offset: number
}

export type CaseInstructionsFindOneResponse = Models.CasesInstruction
