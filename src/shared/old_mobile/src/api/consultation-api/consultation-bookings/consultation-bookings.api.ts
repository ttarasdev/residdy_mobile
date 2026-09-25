// import { getJson, patchJson, postJson } from '../../http'
// import { CONSULTATION_BOOKINGS_PATH } from './consultation-bookings.constants'
// import {
// 	ConsultationBooking,
// 	CreateConsultationBookingDto,
// } from './consultation-bookings.types'
// 
// export const consultationBookingsApi = {
// 	create: (dto: CreateConsultationBookingDto, file?: File) => {
// 		if (!file) {
// 			return postJson<ConsultationBooking>(CONSULTATION_BOOKINGS_PATH, dto)
// 		}
// 
// 		const formData = new FormData()
// 		formData.append('consultationSlotId', String(dto.consultationSlotId))
// 		formData.append('userText', dto.userText)
// 		formData.append('file', file)
// 
// 		return postJson<ConsultationBooking>(CONSULTATION_BOOKINGS_PATH, formData)
// 	},
// 
// 	listMy: (opts?: { signal?: AbortSignal }) => {
// 		return getJson<ConsultationBooking[]>(
// 			`${CONSULTATION_BOOKINGS_PATH}/my`,
// 			opts,
// 		)
// 	},
// 
// 	getMyById: (id: number, opts?: { signal?: AbortSignal }) => {
// 		return getJson<ConsultationBooking>(
// 			`${CONSULTATION_BOOKINGS_PATH}/my/${id}`,
// 			opts,
// 		)
// 	},
// 
// 	cancelMy: (id: number) => {
// 		return patchJson<ConsultationBooking>(
// 			`${CONSULTATION_BOOKINGS_PATH}/${id}/cancel`,
// 		)
// 	},
// 
// 	confirmPaidDev: (id: number) => {
// 		return patchJson<ConsultationBooking>(
// 			`${CONSULTATION_BOOKINGS_PATH}/${id}/confirm-dev`,
// 		)
// 	},
// }
