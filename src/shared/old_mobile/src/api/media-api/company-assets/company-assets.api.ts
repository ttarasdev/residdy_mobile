// import { getJson } from '@/src/api/http'
// import {
// 	CompanyAsset,
// 	CompanyAssetQuery,
// 	CompanyAssetListResponse,
// 	CompanyAssetSignedUrlResponse,
// } from './company-assets.types'
// import { COMPANY_ASSETS_API_BASE } from './company-assets.constants'
// 
// export const companyAssetsApi = {
// 	list: (params: CompanyAssetQuery = {}, opts?: { signal?: AbortSignal }) => {
// 		const search = new URLSearchParams()
// 
// 		Object.entries(params).forEach(([k, v]) => {
// 			if (v !== undefined && v !== null) search.set(k, String(v))
// 		})
// 
// 		return getJson<CompanyAssetListResponse>(
// 			`${COMPANY_ASSETS_API_BASE}${
// 				search.toString() ? `?${search}` : ''
// 			}`,
// 			opts,
// 		)
// 	},
// 
// 	getById: (id: number, opts?: { signal?: AbortSignal }) =>
// 		getJson<CompanyAsset>(`${COMPANY_ASSETS_API_BASE}/${id}`, opts),
// 
// 	getSignedUrl: (id: number) =>
// 		getJson<CompanyAssetSignedUrlResponse>(
// 			`${COMPANY_ASSETS_API_BASE}/${id}/url`,
// 		),
// }
