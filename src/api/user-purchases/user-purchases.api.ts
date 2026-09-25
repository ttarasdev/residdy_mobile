import { request } from '../http'
import type { ApiRequestOptions } from '../http'
import type * as Types from './user-purchases.types'

export const userPurchasesApi = {
    /** GET /user-purchases/my
     * Authenticated account.
     */
    async findMy(
        query: Types.UserPurchasesFindMyQuery,
        options: ApiRequestOptions,
    ): Promise<Types.UserPurchasesFindMyResponse> {
        return request<Types.UserPurchasesFindMyResponse>(
            '/user-purchases/my',
            options,
            { method: 'GET', query },
        )
    },
}
