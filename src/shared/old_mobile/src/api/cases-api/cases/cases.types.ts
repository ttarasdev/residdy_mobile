// import { Languages } from '@/src/shared/enums/languages.enum'
// import { PublicAsset } from '../../media-api/public-assets/public-assets.types'
// 
// export enum CaseStatus {
// 	DRAFT = 'draft',
// 	ACTIVE = 'active',
// 	ARCHIVED = 'archived',
// }
// 
// export interface Case {
// 	id: number
// 	typeId: number
// 	status: CaseStatus
// 	title: string
// 	subtitle: string
// 	version: number
// 	lan: Languages
// 	iconId: number
// 	icon: PublicAsset
// 	isPopular: boolean
// 	createdAt: string
// 	updatedAt: string
// }
// 
// export interface CasesResponse {
// 	rows: Case[]
// 	count: number
// }
// 
// export interface QueryCasesDto {
// 	status?: CaseStatus
// 	lan?: Languages
// 	isPopular?: boolean
// 	typeId?: number
// 	limit?: number
// 	offset?: number
// }
// 
// export interface CaseStage {
// 	id: number
// 	caseId: number
// 	lan: Languages
// 	stageNo: number
// 	title: string
// 	iconId: number
// 	icon: PublicAsset
// 	createdAt?: string
// 	updatedAt?: string
// }
// 
// export enum StageTaskTypes {
// 	WITH_DATE = 'with_date',
// 	INFO = 'info',
// 	TEXT = 'text',
// }
// 
// export interface CaseStageTask {
// 	id: number
// 	stageId: number
// 	lan: Languages
// 	title: string
// 	subtitle: string
// 	type: StageTaskTypes
// 	iconId: number
// 	instructionId?: number | null
// 	reminderId?: number | null
// 	icon: PublicAsset
// 	sortKey: number
// 	createdAt: string
// 	updatedAt: string
// }
// 
// export interface CaseStageDetailed extends CaseStage {
// 	tasks: CaseStageTask[]
// }
// 
// export interface CaseDetailed extends Case {
// 	stages: CaseStageDetailed[]
// }
