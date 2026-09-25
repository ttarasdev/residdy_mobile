// export enum PartnerStatus {
// 	PENDING = 'pending',
// 	ACTIVE = 'active',
// 	BLOCKED = 'blocked',
// }
// 
// export interface PartnerLogo {
// 	id: number
// 	bucket: string
// 	relPath: string
// 	originalName: string
// 	isPopular: boolean
// 	createdAt: string
// 	updatedAt: string
// 	url: string
// }
// 
// export interface Partner {
// 	id: number
// 	companyName: string
// 	email: string
// 	logoId: number | null
// 	phone: string | null
// 	status: PartnerStatus
// 	profileCompleted: boolean
// 	missingFields: string[]
// 	createdAt: string
// 	updatedAt: string
// 	logo: PartnerLogo | null
// }
// 
// export interface QueryPartnersDto {
// 	page?: number
// 	limit?: number
// 	companyName?: string
// 	email?: string
// 	status?: PartnerStatus
// }
// 
// export interface PartnersResponse {
// 	items: Partner[]
// 	total: number
// 	page: number
// 	limit: number
// 	totalPages: number
// }
