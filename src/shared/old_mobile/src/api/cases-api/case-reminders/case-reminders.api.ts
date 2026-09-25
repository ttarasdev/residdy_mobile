// import { getJson } from '../../http'
// import { CASE_REMINDERS_PATH } from './case-reminders.constants'
// import {
// 	CaseReminder,
// 	CaseRemindersResponse,
// 	QueryCaseReminderDto,
// } from './case-reminders.types'
// 
// export const caseRemindersApi = {
// 	list: (
// 		params: QueryCaseReminderDto = {},
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
// 		const url = `${CASE_REMINDERS_PATH}${qs ? `?${qs}` : ''}`
// 
// 		return getJson<CaseRemindersResponse>(url, opts)
// 	},
// 
// 	getById: (id: number, opts?: { signal?: AbortSignal }) => {
// 		return getJson<CaseReminder>(`${CASE_REMINDERS_PATH}/${id}`, opts)
// 	},
// }
