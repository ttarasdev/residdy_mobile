// import type { Case, CaseStage } from '@/src/api/cases-api/cases/cases.types'
// import {
// 	UserCaseStage,
// 	UserCaseStageDetailed,
// } from '../user-case-stages/user-case-stages.types'
// 
// export enum UserCaseStatus {
// 	ACTIVE = 'active',
// 	COMPLETED = 'completed',
// 	ARCHIVED = 'archived',
// }
// 
// export interface UserCase {
// 	id: number
// 	userId: number
// 	templateCaseId: number
// 	activeStageNo: number
// 	status: UserCaseStatus
// 	createdAt: string
// 	updatedAt: string
// 	template: Case
// 	stages: UserCaseStage[]
// }
// 
// export interface UserCaseDetailed extends UserCase {
// 	stages: UserCaseStageDetailed[]
// }
// 
// export interface CreateUserCaseDto {
// 	templateCaseId: number
// }
// 
// export interface UserCasesQuery {
// 	limit?: number
// 	offset?: number
// 	status?: UserCaseStatus
// }
// 
// export interface UserCasesResponse {
// 	rows: UserCase[]
// 	count: number
// }
