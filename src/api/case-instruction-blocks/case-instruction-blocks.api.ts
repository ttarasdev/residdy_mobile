import { request, pathSegment } from '../http'
import type { ApiRequestOptions } from '../http'
import type * as Types from './case-instruction-blocks.types'

export const caseInstructionBlocksApi = {
    /** GET /case-instruction-blocks/:instructionId
     * Authenticated account; subscription checked by server.
     */
    async findByInstruction(
        instructionId: number,
        query: Types.CaseInstructionBlocksFindByInstructionQuery,
        options: ApiRequestOptions,
    ): Promise<Types.CaseInstructionBlocksFindByInstructionResponse> {
        return request<Types.CaseInstructionBlocksFindByInstructionResponse>(
            `/case-instruction-blocks/${pathSegment(instructionId)}`,
            options,
            { method: 'GET', query },
        )
    },
}
