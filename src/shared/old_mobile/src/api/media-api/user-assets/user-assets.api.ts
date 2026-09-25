// import {
// 	UserAsset,
// 	UserAssetQuery,
// 	UserAssetListResponse,
// 	CreateUserAssetDto,
// 	UserAssetSignedUrlResponse,
// 	DeleteUserAssetResponse,
// } from './user-assets.types'
// import { USER_ASSETS_API_BASE } from './user-assets.constants'
// import { deleteJson, getJson, postJson } from '../../http'
// 
// export const userAssetsApi = {
// 	list: (params: UserAssetQuery = {}, opts?: { signal?: AbortSignal }) => {
// 		const search = new URLSearchParams()
// 
// 		Object.entries(params).forEach(([k, v]) => {
// 			if (v !== undefined && v !== null) search.set(k, String(v))
// 		})
// 
// 		return getJson<UserAssetListResponse>(
// 			`${USER_ASSETS_API_BASE}${search.toString() ? `?${search}` : ''}`,
// 			opts,
// 		)
// 	},
// 
// 	create: (file: File, dto: CreateUserAssetDto) => {
// 		const form = new FormData()
// 		form.append('file', file)
// 		form.append('bucket', dto.bucket)
// 		form.append('originalName', dto.originalName)
// 
// 		return postJson<UserAsset>(USER_ASSETS_API_BASE, form)
// 	},
// 
// 	getById: (id: number, opts?: { signal?: AbortSignal }) =>
// 		getJson<UserAsset>(`${USER_ASSETS_API_BASE}/${id}`, opts),
// 
// 	getSignedUrl: (id: number) =>
// 		getJson<UserAssetSignedUrlResponse>(
// 			`${USER_ASSETS_API_BASE}/${id}/url`,
// 		),
// 
// 	remove: (id: number) =>
// 		deleteJson<DeleteUserAssetResponse>(`${USER_ASSETS_API_BASE}/${id}`),
// }
