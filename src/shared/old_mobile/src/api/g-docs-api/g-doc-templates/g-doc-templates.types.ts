// import { PublicAsset } from '../../media-api/public-assets/public-assets.types'
// import type { GDocType } from '../g-doc-types/g-doc-types.types'
// import type { GDocVar } from '../g-doc-vars/g-doc-vars.types'
// 
// export enum GDocTemplateStatus {
// 	ACTIVE = 'active',
// 	INACTIVE = 'inactive',
// }
// 
// export interface GDocTemplate {
// 	id: number
// 	gDocTypeId: number
// 	iconId: number
// 	titleUA: string
// 	titlePL: string
// 	titleEN: string
// 	titleRU: string
// 	filePath: string
// 	originalFileName: string
// 	status: GDocTemplateStatus
// 	type?: GDocType
// 	icon: PublicAsset
// 	variables: GDocVar[]
// 	createdAt: string
// 	updatedAt: string
// }
// 
// export interface QueryGDocTemplatesDto {
// 	page?: number
// 	limit?: number
// 	gDocTypeId?: number
// 	status?: GDocTemplateStatus
// 	search?: string
// }
// 
// export interface GDocTemplatesResponse {
// 	items: GDocTemplate[]
// 	total: number
// }
