// import { getJson } from '../../http'
// import { CASES_PATH } from './cases.constants'
// import { CaseDetailed, CasesResponse, QueryCasesDto } from './cases.types'
// 
// export const casesApi = {
// 	list: (params: QueryCasesDto = {}, opts?: { signal?: AbortSignal }) => {
// 		const search = new URLSearchParams()
// 
// 		Object.entries(params).forEach(([key, value]) => {
// 			if (value != undefined && value !== null) {
// 				search.set(key, String(value))
// 			}
// 		})
// 
// 		const qs = search.toString()
// 		const url = `${CASES_PATH}${qs ? `?${qs}` : ''}`
// 
// 		return getJson<CasesResponse>(url, opts)
// 	},
// 
// 	getById: (id: number, opts?: { signal?: AbortSignal }) => {
// 		return getJson<CaseDetailed>(`${CASES_PATH}/${id}`, opts)
// 	},
// }
