// import { getJson } from '../../http'
// import { G_DOC_TEMPLATES_PATH } from './g-doc-templates.constants'
// import {
// 	GDocTemplate,
// 	GDocTemplatesResponse,
// 	QueryGDocTemplatesDto,
// } from './g-doc-templates.types'
// 
// export const gDocTemplatesApi = {
// 	list: (
// 		params: QueryGDocTemplatesDto = {},
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
// 		const url = `${G_DOC_TEMPLATES_PATH}${qs ? `?${qs}` : ''}`
// 
// 		return getJson<GDocTemplatesResponse>(url, opts)
// 	},
// 
// 	getById: (id: number, opts?: { signal?: AbortSignal }) => {
// 		return getJson<GDocTemplate>(`${G_DOC_TEMPLATES_PATH}/${id}`, opts)
// 	},
// }
