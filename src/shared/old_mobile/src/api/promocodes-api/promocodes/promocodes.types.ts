// export enum ProductType {
// 	CONSULTATION = 'consultation',
// 	SUBSCRIPTION = 'subscription',
// 	COURSE = 'course',
// 	ADVERTISING = 'advertising',
// }
// 
// export enum PromocodeType {
// 	PERCENT = 'percent',
// 	AMOUNT = 'amount',
// }
// 
// export enum PromocodeStatus {
// 	ACTIVE = 'active',
// 	INACTIVE = 'inactive',
// 	EXPIRED = 'expired',
// }
// 
// export interface Promocode {
// 	id: number
// 	code: string
// 	type: PromocodeType
// 	value: number
// 	status: PromocodeStatus
// 	productType: ProductType | null
// 	startsAt: string | null
// 	expiresAt: string | null
// 	maxRedemptions: number | null
// 	perUserLimit: number | null
// 	specialistId: number | null
// 	notes: string | null
// 	createdAt?: string
// 	updatedAt?: string
// 	deletedAt?: string | null
// }
// 
// export interface EvaluatePromocodeDto {
// 	code: string
// 	amount: number
// 	productType: ProductType
// 	specialistId?: number
// }
// 
// export interface RedeemPromocodeDto {
// 	code: string
// 	amount: number
// 	productType: ProductType
// 	bookingId?: number
// 	specialistId?: number
// }
// 
// export type EvaluatePromocodeResponse =
// 	| {
// 			ok: true
// 			discount: number
// 			finalAmount: number
// 			promo: Promocode
// 	  }
// 	| {
// 			ok: false
// 			reason:
// 				| 'invalid_code'
// 				| 'inactive'
// 				| 'not_started'
// 				| 'expired'
// 				| 'specialist_mismatch'
// 				| 'product_type_mismatch'
// 				| 'not_allowed_user'
// 				| 'max_redemptions'
// 				| 'per_user_limit'
// 				| 'invalid_amount'
// 	  }
// 
// export interface RedeemPromocodeResponse {
// 	code: string
// 	discount: number
// 	finalAmount: number
// 	usageId: number
// }
