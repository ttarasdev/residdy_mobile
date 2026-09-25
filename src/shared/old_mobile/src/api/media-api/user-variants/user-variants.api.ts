// import { getJson, postJson, deleteJson } from '@/src/api/http'
// import {
// 	UserVariantJoined,
// 	UserVariantQuery,
// 	UserVariantListResponse,
// 	CreateUserVariantDto,
// 	DeleteUserVariantResponse,
// } from './user-variants.types'
// import { USER_VARIANTS_API_BASE } from './user-variants.constants'
// 
// export const userVariantsApi = {
// 	list: (params: UserVariantQuery = {}, opts?: { signal?: AbortSignal }) => {
// 		const search = new URLSearchParams()
// 
// 		Object.entries(params).forEach(([k, v]) => {
// 			if (v !== undefined && v !== null) search.set(k, String(v))
// 		})
// 
// 		return getJson<UserVariantListResponse>(
// 			`${USER_VARIANTS_API_BASE}${search.toString() ? `?${search}` : ''}`,
// 			opts,
// 		)
// 	},
// 
// 	create: (file: File, dto: CreateUserVariantDto) => {
// 		const form = new FormData()
// 		form.append('file', file)
// 		form.append('bucket', dto.bucket)
// 		form.append('originalName', dto.originalName)
// 
// 		return postJson<UserVariantJoined>(USER_VARIANTS_API_BASE, form)
// 	},
// 
// 	getById: (id: number, opts?: { signal?: AbortSignal }) =>
// 		getJson<UserVariantJoined>(`${USER_VARIANTS_API_BASE}/${id}`, opts),
// 
// 	remove: (id: number) =>
// 		deleteJson<DeleteUserVariantResponse>(
// 			`${USER_VARIANTS_API_BASE}/${id}`,
// 		),
// }
