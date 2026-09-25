// import { getJson, patchJson, postJson } from '../../http'
// import { USER_PATH } from './user.constants'
// import { UpdateUserDto, User } from './user.types'
// 
// export const userApi = {
// 	me: ({ signal }: { signal?: AbortSignal } = {}) =>
// 		getJson<User>(`${USER_PATH}/me`, { signal }),
// 	updateCurrent: (dto: UpdateUserDto) => {
// 		return patchJson<User>(USER_PATH + '/me', dto)
// 	},
// 	uploadMyAvatar: (file: File) => {
// 		const formData = new FormData()
// 		formData.append('file', file)
// 
// 		return postJson<User>(USER_PATH + '/me/avatar', formData)
// 	},
// }
