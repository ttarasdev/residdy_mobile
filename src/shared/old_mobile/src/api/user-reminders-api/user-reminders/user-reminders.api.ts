// import { getJson, patchJson } from '../../http'
// import { USER_REMINDERS_PATH } from './user-reminders.constants'
// import {
// 	QueryUserRemindersDto,
// 	UserReminder,
// 	UserRemindersResponse,
// } from './user-reminders.types'
// 
// export const userRemindersApi = {
// 	listMy: (
// 		params: QueryUserRemindersDto = {},
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
// 		const url = `${USER_REMINDERS_PATH}/my${qs ? `?${qs}` : ''}`
// 
// 		return getJson<UserRemindersResponse>(url, opts)
// 	},
// 
// 	getMyById: (id: number, opts?: { signal?: AbortSignal }) => {
// 		return getJson<UserReminder>(`${USER_REMINDERS_PATH}/my/${id}`, opts)
// 	},
// 
// 	cancelMy: (id: number) => {
// 		return patchJson<UserReminder>(`${USER_REMINDERS_PATH}/my/${id}/cancel`)
// 	},
// }
