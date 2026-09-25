// import { getJson } from '@/src/api/http'
// import {
// 	CompanyVariantJoined,
// 	CompanyVariantQuery,
// 	CompanyVariantListResponse,
// } from './company-variants.types'
// import { COMPANY_VARIANTS_API_BASE } from './company-variants.constants'
// 
// export const companyVariantsApi = {
// 	list: (
// 		params: CompanyVariantQuery = {},
// 		opts?: { signal?: AbortSignal },
// 	) => {
// 		const search = new URLSearchParams()
// 
// 		Object.entries(params).forEach(([k, v]) => {
// 			if (v !== undefined && v !== null) search.set(k, String(v))
// 		})
// 
// 		return getJson<CompanyVariantListResponse>(
// 			`${COMPANY_VARIANTS_API_BASE}${
// 				search.toString() ? `?${search}` : ''
// 			}`,
// 			opts,
// 		)
// 	},
// 
// 	getById: (id: number, opts?: { signal?: AbortSignal }) =>
// 		getJson<CompanyVariantJoined>(
// 			`${COMPANY_VARIANTS_API_BASE}/${id}`,
// 			opts,
// 		),
// }
