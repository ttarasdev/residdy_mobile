// import { getJson } from '../../http'
// import { CONSULTATION_SLOTS_PATH } from './consultation-slots.constants'
// import {
// 	ConsultationSlotsWeekResponse,
// 	QueryConsultationSlotsDto,
// } from './consultation-slots.types'
// 
// export const consultationSlotsApi = {
// 	listWeek: (
// 		params: QueryConsultationSlotsDto,
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
// 		return getJson<ConsultationSlotsWeekResponse>(
// 			`${CONSULTATION_SLOTS_PATH}?${search.toString()}`,
// 			opts,
// 		)
// 	},
// }
