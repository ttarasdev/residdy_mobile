// import { getJson } from '../../http'
// import { G_DOC_TYPES_PATH } from './g-doc-types.constants'
// import {
// 	GDocType,
// 	GDocTypesResponse,
// 	QueryGDocTypesDto,
// } from './g-doc-types.types'
// 
// export const gDocTypesApi = {
// 	list: (
// 		params: QueryGDocTypesDto = {},
// 		opts?: { signal?: AbortSignal },
// 	) => {
// 		const search = new URLSearchParams()
// 
// 		Object.entries(params).forEach(([key, value]) => {
// 			if (value !== undefined && value !== null) {
// 				search.set(key, String(value))
// 			}
// 		})
// 
// 		const qs = search.toString()
// 		const url = `${G_DOC_TYPES_PATH}${qs ? `?${qs}` : ''}`
// 
// 		return getJson<GDocTypesResponse>(url, opts)
// 	},
// 
// 	getById: (id: number, opts?: { signal?: AbortSignal }) => {
// 		return getJson<GDocType>(`${G_DOC_TYPES_PATH}/${id}`, opts)
// 	},
// }
