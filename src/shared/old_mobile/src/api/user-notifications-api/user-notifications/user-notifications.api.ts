// import { getJson, patchJson } from '../../http'
// import { USER_NOTIFICATIONS_PATH } from './user-notifications.constants'
// import {
// 	ChangeUserNotificationStatusDto,
// 	QueryUserNotificationsDto,
// 	UserNotification,
// 	UserNotificationsResponse,
// 	UserNotificationsUnreadCountResponse,
// } from './user-notifications.types'
// 
// export const userNotificationsApi = {
// 	listMy: (
// 		params: QueryUserNotificationsDto = {},
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
// 		const url = `${USER_NOTIFICATIONS_PATH}/my${qs ? `?${qs}` : ''}`
// 
// 		return getJson<UserNotificationsResponse>(url, opts)
// 	},
// 
// 	getMyUnreadCount: (opts?: { signal?: AbortSignal }) => {
// 		return getJson<UserNotificationsUnreadCountResponse>(
// 			`${USER_NOTIFICATIONS_PATH}/my/unread-count`,
// 			opts,
// 		)
// 	},
// 
// 	getMyById: (id: number, opts?: { signal?: AbortSignal }) => {
// 		return getJson<UserNotification>(
// 			`${USER_NOTIFICATIONS_PATH}/my/${id}`,
// 			opts,
// 		)
// 	},
// 
// 	changeMyStatus: (
// 		id: number,
// 		dto: ChangeUserNotificationStatusDto,
// 	) => {
// 		return patchJson<UserNotification>(
// 			`${USER_NOTIFICATIONS_PATH}/my/${id}/status`,
// 			dto,
// 		)
// 	},
// }
