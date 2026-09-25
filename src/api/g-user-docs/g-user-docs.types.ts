import type * as Models from '../models'

export type GUserDocsFindAllQuery = {
    offset?: number
    page?: number
    limit?: number
}

export type GUserDocsFindAllResponse = {
    rows: Array<Models.GUserDoc>
    total: number
    page: number
    limit: number
    offset: number
}

export type GUserDocsFindOneResponse = Models.GUserDoc

export type GUserDocsCreateBody = {
    gDocTemplateId: number
    inputs?: Record<string, string>
}

export type GUserDocsCreateResponse = Models.GUserDoc

export type GUserDocsGetFileUrlResponse = {
    fileName: string
    url: string
}

export type GUserDocsRemoveResponse = {
    success: boolean
}
