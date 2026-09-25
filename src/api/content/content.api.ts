import { ApiError, pathSegment, request } from '../http'
import type {
    CaseInstruction,
    ContentRequestOptions,
    ContentVariant,
} from './content.types'

export class ContentApiError extends ApiError {
    constructor(
        status: number,
        message = `Content request failed (${status})`,
        details?: unknown,
    ) {
        super(status, message, details)
        this.name = 'ContentApiError'
    }
}

/** Compatibility helpers; the complete instruction API lives in case-instructions/. */
export const contentApi = {
    async getInstruction(
        id: number,
        options: ContentRequestOptions,
    ): Promise<CaseInstruction> {
        return request(`/case-instructions/${pathSegment(id)}`, options, {
            errorType: ContentApiError,
        })
    },

    async getVariant(
        id: number,
        options: ContentRequestOptions,
    ): Promise<ContentVariant> {
        return request(`/private-variants/${pathSegment(id)}`, options, {
            errorType: ContentApiError,
        })
    },

    async downloadImage(
        assetId: number,
        options: ContentRequestOptions,
    ): Promise<Blob> {
        return request(
            `/private-assets/${pathSegment(assetId)}/file`,
            options,
            {
                response: 'blob',
                errorType: ContentApiError,
            },
        )
    },
}
