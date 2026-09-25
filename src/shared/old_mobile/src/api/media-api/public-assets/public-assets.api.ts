// import { getJson } from '@/src/api/http'
// import {
// 	PublicAsset,
// 	PublicAssetQuery,
// 	PublicAssetListResponse,
// } from './public-assets.types'
// import { PUBLIC_ASSETS_API_BASE } from './public-assets.constants'
// 
// export const publicAssetsApi = {
// 	list: (params: PublicAssetQuery = {}, opts?: { signal?: AbortSignal }) => {
// 		const search = new URLSearchParams()
// 
// 		Object.entries(params).forEach(([k, v]) => {
// 			if (v !== undefined && v !== null) search.set(k, String(v))
// 		})
// 
// 		return getJson<PublicAssetListResponse>(
// 			`${PUBLIC_ASSETS_API_BASE}${search.toString() ? `?${search}` : ''}`,
// 			opts,
// 		)
// 	},
// 
// 	getById: (id: number, opts?: { signal?: AbortSignal }) =>
// 		getJson<PublicAsset>(`${PUBLIC_ASSETS_API_BASE}/${id}`, opts),
// }
