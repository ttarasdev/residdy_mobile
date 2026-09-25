import { request, pathSegment } from '../http'
import type { ApiRequestOptions } from '../http'
import type * as Types from './g-user-docs.types'

export const gUserDocsApi = {
    /** GET /g-user-docs
     * Authenticated owner; available without an active subscription.
     */
    async findAll(
        query: Types.GUserDocsFindAllQuery,
        options: ApiRequestOptions,
    ): Promise<Types.GUserDocsFindAllResponse> {
        return request<Types.GUserDocsFindAllResponse>(
            '/g-user-docs',
            options,
            { method: 'GET', query },
        )
    },

    /** GET /g-user-docs/:id
     * Authenticated owner; available without an active subscription.
     */
    async findOne(
        id: number,
        options: ApiRequestOptions,
    ): Promise<Types.GUserDocsFindOneResponse> {
        return request<Types.GUserDocsFindOneResponse>(
            `/g-user-docs/${pathSegment(id)}`,
            options,
            { method: 'GET' },
        )
    },

    /** POST /g-user-docs
     * Authenticated account; active subscription required.
     */
    async create(
        dto: Types.GUserDocsCreateBody,
        options: ApiRequestOptions,
    ): Promise<Types.GUserDocsCreateResponse> {
        return request<Types.GUserDocsCreateResponse>('/g-user-docs', options, {
            method: 'POST',
            body: dto,
        })
    },

    /** GET /g-user-docs/:id/file-url
     * Authenticated owner; available without an active subscription.
     */
    async getFileUrl(
        id: number,
        options: ApiRequestOptions,
    ): Promise<Types.GUserDocsGetFileUrlResponse> {
        return request<Types.GUserDocsGetFileUrlResponse>(
            `/g-user-docs/${pathSegment(id)}/file-url`,
            options,
            { method: 'GET' },
        )
    },

    /** DELETE /g-user-docs/:id
     * Authenticated owner; available without an active subscription.
     */
    async remove(
        id: number,
        options: ApiRequestOptions,
    ): Promise<Types.GUserDocsRemoveResponse> {
        return request<Types.GUserDocsRemoveResponse>(
            `/g-user-docs/${pathSegment(id)}`,
            options,
            { method: 'DELETE' },
        )
    },
}
