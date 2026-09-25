// import type { Consultation } from '../consultations/consultations.types'
// 
// export enum ConsultationSlotStatus {
// 	OPEN = 'open',
// 	HELD = 'held',
// 	BOOKED = 'booked',
// 	CANCELED = 'canceled',
// }
// 
// export interface SpecialistConsultationInSlot {
// 	id: number
// 	specialistId: number
// 	consultationId: number
// 	titleUa: string
// 	titlePl: string
// 	titleEn: string
// 	titleRu: string
// 	descriptionUa: string | null
// 	descriptionPl: string | null
// 	descriptionEn: string | null
// 	descriptionRu: string | null
// 	assetId: number | null
// 	durationMinutes: number
// 	price: number
// 	consultation?: Consultation
// 	createdAt: string
// 	updatedAt: string
// }
// 
// export interface ConsultationSlot {
// 	id: number
// 	specialistId: number
// 	specialistConsultationId: number
// 	startsAt: string
// 	endsAt: string
// 	status: ConsultationSlotStatus
// 	specialistConsultation?: SpecialistConsultationInSlot
// 	createdAt: string
// 	updatedAt: string
// }
// 
// export interface QueryConsultationSlotsDto {
// 	weekStart: string
// 	specialistId?: number
// 	consultationId?: number
// }
// 
// export interface ConsultationSlotsWeekDay {
// 	date: string
// 	dayKey: string
// 	slots: ConsultationSlot[]
// }
// 
// export interface ConsultationSlotsWeekResponse {
// 	weekStart: string
// 	weekEnd: string
// 	days: ConsultationSlotsWeekDay[]
// }
