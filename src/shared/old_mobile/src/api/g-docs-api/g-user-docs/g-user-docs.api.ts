// import { deleteJson, getJson, postJson } from '../../http'
// import { G_USER_DOCS_PATH } from './g-user-docs.constants'
// import {
// 	CreateGUserDocDto,
// 	GUserDoc,
// 	GUserDocActionResponse,
// 	GUserDocFileUrlResponse,
// } from './g-user-docs.types'
// 
// export const gUserDocsApi = {
// 	list: (opts?: { signal?: AbortSignal }) => {
// 		return getJson<GUserDoc[]>(G_USER_DOCS_PATH, opts)
// 	},
// 
// 	getById: (id: number, opts?: { signal?: AbortSignal }) => {
// 		return getJson<GUserDoc>(`${G_USER_DOCS_PATH}/${id}`, opts)
// 	},
// 
// 	create: (dto: CreateGUserDocDto) => {
// 		return postJson<GUserDoc>(G_USER_DOCS_PATH, dto)
// 	},
// 
// 	getFileUrl: (id: number, opts?: { signal?: AbortSignal }) => {
// 		return getJson<GUserDocFileUrlResponse>(
// 			`${G_USER_DOCS_PATH}/${id}/file-url`,
// 			opts,
// 		)
// 	},
// 
// 	remove: (id: number) => {
// 		return deleteJson<GUserDocActionResponse>(`${G_USER_DOCS_PATH}/${id}`)
// 	},
// }
