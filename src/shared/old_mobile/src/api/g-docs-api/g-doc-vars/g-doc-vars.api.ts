// import { getJson } from '../../http'
// import { G_DOC_VARS_PATH } from './g-doc-vars.constants'
// import { GDocVar, QueryGDocVarsDto } from './g-doc-vars.types'
// 
// export const gDocVarsApi = {
// 	list: (
// 		params: QueryGDocVarsDto = {},
// 		opts?: { signal?: AbortSignal },
// 	) => {
// 		const search = new URLSearchParams()
// 
// 		if (params.search !== undefined && params.search !== null) {
// 			search.set('search', String(params.search))
// 		}
// 
// 		const qs = search.toString()
// 		const url = `${G_DOC_VARS_PATH}${qs ? `?${qs}` : ''}`
// 
// 		return getJson<GDocVar[]>(url, opts)
// 	},
// 
// 	getById: (id: number, opts?: { signal?: AbortSignal }) => {
// 		return getJson<GDocVar>(`${G_DOC_VARS_PATH}/${id}`, opts)
// 	},
// }
