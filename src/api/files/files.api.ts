import { request, pathSegment, pathSegments } from '../http'
import type { ApiRequestOptions } from '../http'
import type * as Types from './files.types'

export const filesApi = {
    /** GET /files/private/:bucket/*relPath
     * Authenticated account.
     */
    async streamPrivateFile(
        bucket:
            | 'instruction_headers'
            | 'instruction_images'
            | 'blog_images'
            | 'manager_files'
            | 'account_ava'
            | 'legal_document_drafts'
            | 'gdoc_templates'
            | 'user_docs'
            | 'consultation_files'
            | 'partner_logos'
            | 'partner_main'
            | 'partner_adv',
        relPath: Array<string>,
        query: Types.FilesStreamPrivateFileQuery,
        options: ApiRequestOptions,
    ): Promise<Types.FilesStreamPrivateFileResponse> {
        return request<Types.FilesStreamPrivateFileResponse>(
            `/files/private/${pathSegment(bucket)}/${pathSegments(relPath)}`,
            options,
            {
                method: 'GET',
                query,
                response: 'blob',
            },
        )
    },
}
