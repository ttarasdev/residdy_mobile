// import { getJson, postJson } from '@/src/api/http'
// import {
// 	CreateUserCaseDto,
// 	UserCase,
// 	UserCaseDetailed,
// 	UserCasesQuery,
// 	UserCasesResponse,
// } from './user-cases.types'
// import { USER_CASES_API_BASE } from './user-cases.constants'
// 
// export const userCasesApi = {
// 	list: (params: UserCasesQuery = {}, opts?: { signal?: AbortSignal }) => {
// 		const search = new URLSearchParams()
// 
// 		Object.entries(params).forEach(([k, v]) => {
// 			if (v !== undefined && v !== null) search.set(k, String(v))
// 		})
// 
// 		return getJson<UserCasesResponse>(
// 			`${USER_CASES_API_BASE}${search.toString() ? `?${search}` : ''}`,
// 			opts,
// 		)
// 	},
// 
// 	create: (dto: CreateUserCaseDto) =>
// 		postJson<UserCase>(USER_CASES_API_BASE, dto),
// 
// 	getById: (id: number, opts?: { signal?: AbortSignal }) =>
// 		getJson<UserCase>(`${USER_CASES_API_BASE}/${id}`, opts),
// 
// 	getFullById: (id: number, opts?: { signal?: AbortSignal }) =>
// 		getJson<UserCaseDetailed>(`${USER_CASES_API_BASE}/${id}/full`, opts),
// }
