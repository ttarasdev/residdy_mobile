// import { getJson, postJson } from '@/src/api/http'
// import { UserCaseStage, UserCaseStageDetailed } from './user-case-stages.types'
// import { USER_CASE_STAGES_API_BASE } from './user-case-stages.constants'
// 
// export const userCaseStagesApi = {
// 	getByUserCase: (userCaseId: number, opts?: { signal?: AbortSignal }) =>
// 		getJson<UserCaseStage[]>(
// 			`${USER_CASE_STAGES_API_BASE}/by-case/${userCaseId}`,
// 			opts,
// 		),
// 
// 	getByUserCaseAndStageNo: (
// 		userCaseId: number,
// 		stageNo: number,
// 		opts?: { signal?: AbortSignal },
// 	) =>
// 		getJson<UserCaseStageDetailed>(
// 			`${USER_CASE_STAGES_API_BASE}/by-case/${userCaseId}/by-stage-no/${stageNo}`,
// 			opts,
// 		),
// 
// 	getById: (id: number, opts?: { signal?: AbortSignal }) =>
// 		getJson<UserCaseStageDetailed>(
// 			`${USER_CASE_STAGES_API_BASE}/${id}`,
// 			opts,
// 		),
// 
// 	goNext: (id: number) =>
// 		postJson<{ finished: boolean }>(
// 			`${USER_CASE_STAGES_API_BASE}/${id}/next`,
// 		),
// }
