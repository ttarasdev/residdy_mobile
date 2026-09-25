// import type {
// 	ConsultationSlot,
// 	SpecialistConsultationInSlot,
// } from '../consultation-slots/consultation-slots.types'
// 
// export enum ConsultationBookingStatus {
// 	AWAITING_PAYMENT = 'awaiting_payment',
// 	PAID = 'paid',
// 	CANCELED = 'canceled',
// 	COMPLETED = 'completed',
// 	NO_SHOW = 'no_show',
// 	REFUNDED = 'refunded',
// }
// 
// export interface CreateConsultationBookingDto {
// 	consultationSlotId: number
// 	userText: string
// }
// 
// export interface ConsultationBookingSpecialist {
// 	id: number
// 	name?: string | null
// 	surname?: string | null
// 	email?: string
// }
// 
// export interface ConsultationBookingUser {
// 	id: number
// 	name?: string | null
// 	surname?: string | null
// 	email?: string
// }
// 
// export interface ConsultationBooking {
// 	id: number
// 	userId: number
// 	specialistId: number
// 	consultationSlotId: number
// 	specialistConsultationId: number
// 	price: number
// 	durationMinutes: number
// 	startsAt: string
// 	endsAt: string
// 	currency: string
// 	status: ConsultationBookingStatus
// 	expiresAt: string | null
// 	userText: string
// 	userFileName: string | null
// 	consultationSlot?: ConsultationSlot
// 	specialistConsultation?: SpecialistConsultationInSlot
// 	specialist?: ConsultationBookingSpecialist
// 	user?: ConsultationBookingUser
// 	createdAt: string
// 	updatedAt: string
// }
