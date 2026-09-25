// import { getJson } from '../../http'
// import { CASE_TYPES_BASE } from './case-types.constants'
// import type {
// 	CaseType,
// 	CaseTypeListResponse,
// 	QueryCaseTypes,
// } from './case-types.types'
// 
// export const caseTypesApi = {
// 	list: (params: QueryCaseTypes = {}, opts?: { signal?: AbortSignal }) => {
// 		const search = new URLSearchParams()
// 
// 		Object.entries(params).forEach(([key, value]) => {
// 			if (value !== undefined && value !== null) {
// 				search.set(key, String(value))
// 			}
// 		})
// 
// 		const qs = search.toString()
// 		const url = `${CASE_TYPES_BASE}${qs ? `?${qs}` : ''}`
// 
// 		return getJson<CaseTypeListResponse>(url, opts)
// 	},
// 
// 	getById: (id: number, opts?: { signal?: AbortSignal }) => {
// 		return getJson<CaseType>(`${CASE_TYPES_BASE}/${id}`, opts)
// 	},
// }
