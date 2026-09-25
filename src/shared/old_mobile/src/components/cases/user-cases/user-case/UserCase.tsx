// import MidnightCard from '@/src/components/features-components/cards/midnight-card'
// import { getVisibleUserCaseStages } from '@/src/shared/lib/user-cases'
// import StagesLine from '../stages-line/StagesLine'
// import UserCaseStage from '../user-case-stage/UserCaseStage'
// import {
// 	UserCaseDetailed,
// 	UserCaseStatus,
// } from '@/src/api/user-cases-api/user-cases/user-cases.types'
// import { useEffect, useState } from 'react'
// import UserCaseFooter from '../user-case-footer/UserCaseFooter'
// import { UserCaseTaskStatus } from '@/src/api/user-cases-api/user-case-tasks/user-case-tasks.types'
// import { useMutation, useQueryClient } from '@tanstack/react-query'
// import { userCaseStagesApi } from '@/src/api/user-cases-api/user-case-stages/user-case-stages.api'
// import { STACK_PATHS } from '@/src/shared/enums/page-paths'
// 
// interface Props {
// 	caseData: UserCaseDetailed
// }
// 
// const UserCaseComponent: React.FC<Props> = ({ caseData }) => {
// 	const qc = useQueryClient()
// 	const [currentStage, setCurrentStage] = useState(
// 		caseData.stages.find(
// 			(s) => s.template.stageNo === caseData.activeStageNo,
// 		)!,
// 	)
// 
// 	useEffect(() => {
// 		const activeStage = caseData.stages.find(
// 			(s) => s.template.stageNo === caseData.activeStageNo,
// 		)
// 
// 		if (activeStage) {
// 			setCurrentStage(activeStage)
// 		}
// 	}, [caseData.activeStageNo, caseData.stages])
// 
// 	const currentStageNo = currentStage.template.stageNo
// 
// 	const visibleStages = getVisibleUserCaseStages(caseData)
// 
// 	const isNextVisible = () => {
// 		if (currentStageNo < caseData.activeStageNo) return true
// 		if (currentStageNo === caseData.activeStageNo) {
// 			if (caseData.status === UserCaseStatus.COMPLETED) return false
// 			return currentStage.tasks.every(
// 				(t) => t.status === UserCaseTaskStatus.DONE,
// 			)
// 		}
// 
// 		return false
// 	}
// 
// 	const isBackVisible = currentStageNo !== 1
// 
// 	const nextStageMutation = useMutation({
// 		mutationFn: () => userCaseStagesApi.goNext(caseData.id),
// 		onSuccess: () => {
// 			qc.invalidateQueries({
// 				queryKey: [STACK_PATHS.USER_CASES, caseData.id],
// 			})
// 		},
// 	})
// 
// 	const goNext = () => {
// 		if (currentStageNo < caseData.activeStageNo) {
// 			setCurrentStage(
// 				caseData.stages.filter(
// 					(s) => s.template.stageNo === currentStageNo + 1,
// 				)[0],
// 			)
// 		} else if (currentStageNo === caseData.activeStageNo) {
// 			nextStageMutation.mutate()
// 		}
// 	}
// 
// 	const goBack = () => {
// 		if (isBackVisible)
// 			setCurrentStage(
// 				caseData.stages.filter(
// 					(s) => s.template.stageNo === currentStageNo - 1,
// 				)[0],
// 			)
// 	}
// 
// 	return (
// 		<MidnightCard>
// 			<StagesLine items={visibleStages} activeNo={currentStageNo} />
// 			<UserCaseStage
// 				stageData={currentStage}
// 				setStage={setCurrentStage}
// 			/>
// 			<UserCaseFooter
// 				isBackVisible={isBackVisible}
// 				isNextVisible={isNextVisible()}
// 				goNext={goNext}
// 				goBack={goBack}
// 			/>
// 		</MidnightCard>
// 	)
// }
// 
// export default UserCaseComponent
