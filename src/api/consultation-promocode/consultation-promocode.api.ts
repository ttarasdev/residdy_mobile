import { request } from '../http'
import type { ApiRequestOptions } from '../http'
import type * as Types from './consultation-promocode.types'

export const consultationPromocodeApi = {
    /** POST /consultation-promocode/evaluate
     * Authenticated account.
     */
    async evaluate(
        dto: Types.ConsultationPromocodeEvaluateBody,
        options: ApiRequestOptions,
    ): Promise<Types.ConsultationPromocodeEvaluateResponse> {
        return request<Types.ConsultationPromocodeEvaluateResponse>(
            '/consultation-promocode/evaluate',
            options,
            { method: 'POST', body: dto },
        )
    },
}
