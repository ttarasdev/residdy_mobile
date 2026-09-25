// import { getJson } from '../../http'
// import { PARTNERS_PATH } from './partners.constants'
// import { Partner, PartnersResponse, QueryPartnersDto } from './partners.types'
// 
// export const partnersApi = {
// 	list: (params: QueryPartnersDto = {}, opts?: { signal?: AbortSignal }) => {
// 		const search = new URLSearchParams()
// 
// 		Object.entries(params).forEach(([key, value]) => {
// 			if (value !== undefined && value !== null) {
// 				search.set(key, String(value))
// 			}
// 		})
// 
// 		const qs = search.toString()
// 		const url = `${PARTNERS_PATH}${qs ? `?${qs}` : ''}`
// 
// 		return getJson<PartnersResponse>(url, opts)
// 	},
// 
// 	getById: (id: number, opts?: { signal?: AbortSignal }) => {
// 		return getJson<Partner>(`${PARTNERS_PATH}/${id}`, opts)
// 	},
// }
