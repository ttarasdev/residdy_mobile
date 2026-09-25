// import { UserCaseStage } from '@/src/api/user-cases-api/user-case-stages/user-case-stages.types'
// import {
// 	UserCaseTask,
// 	UserCaseTaskStatus,
// } from '@/src/api/user-cases-api/user-case-tasks/user-case-tasks.types'
// import { UserCase } from '@/src/api/user-cases-api/user-cases/user-cases.types'
// 
// export const getVisibleUserCaseStages = (
// 	userCase: UserCase,
// ): UserCaseStage[] => {
// 	const stages = userCase.stages ?? []
// 
// 	if (stages.length <= 3) return stages
// 
// 	const activeIndex = stages.findIndex(
// 		(stage) => stage.template.stageNo === userCase.activeStageNo,
// 	)
// 
// 	const safeActiveIndex = activeIndex >= 0 ? activeIndex : 0
// 
// 	if (safeActiveIndex <= 1) return stages.slice(0, 3)
// 
// 	if (safeActiveIndex >= stages.length - 2) return stages.slice(-3)
// 
// 	return stages.slice(safeActiveIndex - 1, safeActiveIndex + 2)
// }
