// import { StageTaskTypes } from '@/src/api/cases-api/cases/cases.types'
// import { UserCaseStageDetailed } from '@/src/api/user-cases-api/user-case-stages/user-case-stages.types'
// import { userCaseTasksApi } from '@/src/api/user-cases-api/user-case-tasks/user-case-tasks.api'
// import {
// 	UserCaseTask,
// 	UserCaseTaskStatus,
// } from '@/src/api/user-cases-api/user-case-tasks/user-case-tasks.types'
// import { PublicPhotoAsset } from '@/src/components/features-components/jwt-images/PublicPhotoAsset'
// import { slate } from '@/src/shared/styles/constants.styles'
// import { useMutation } from '@tanstack/react-query'
// import { useState } from 'react'
// import { useTranslation } from '@/node_modules/react-i18next'
// import { Pressable, StyleSheet, Text, View } from 'react-native'
// import Instruction from '../instruction/instruction'
// 
// interface Props {
// 	taskData: UserCaseTask
// 	isLast: boolean
// 	setStage: React.Dispatch<React.SetStateAction<UserCaseStageDetailed>>
// }
// 
// const UserCaseTaskComponent: React.FC<Props> = ({
// 	taskData,
// 	isLast,
// 	setStage,
// }) => {
// 	const { t } = useTranslation()
// 	const [isInstructionOpened, setIsInstructionOpened] = useState(false)
// 	const [isSetDateOpened, setIsSetDateOpened] = useState(false)
// 
// 	const getToggledStage = (sourceStage: UserCaseStageDetailed) => ({
// 		...sourceStage,
// 		tasks: sourceStage.tasks.map((task) => {
// 			if (task.id !== taskData.id) return task
// 
// 			return {
// 				...task,
// 				status:
// 					task.status === UserCaseTaskStatus.DONE
// 						? UserCaseTaskStatus.OPEN
// 						: UserCaseTaskStatus.DONE,
// 			}
// 		}),
// 	})
// 
// 	const toggleTaskMutation = useMutation({
// 		mutationFn: (taskId: number) => {
// 			return userCaseTasksApi.toggle(taskId)
// 		},
// 		onError: () => {
// 			setStage((prev) => getToggledStage(prev))
// 		},
// 	})
// 
// 	const toggle = () => {
// 		setStage((prev) => getToggledStage(prev))
// 		toggleTaskMutation.mutate(taskData.id)
// 	}
// 
// 	return (
// 		<View style={styles.task}>
// 			<View style={styles.icon}>
// 				<PublicPhotoAsset
// 					width={30}
// 					height={30}
// 					url={taskData.template.icon.url}
// 					alt={taskData.template.icon.originalName}
// 				/>
// 			</View>
// 			<View style={styles.info}>
// 				<Text style={styles.title}>{taskData.template.title}</Text>
// 				<Text style={styles.text}>{taskData.template.subtitle}</Text>
// 
// 				{taskData.template.type === StageTaskTypes.INFO && (
// 					<Pressable
// 						onPress={() => setIsInstructionOpened(true)}
// 						style={styles.button}
// 					>
// 						<Text style={styles.buttonText}>
// 							{t('cases.case.taskButtonIns')}
// 						</Text>
// 					</Pressable>
// 				)}
// 
// 				{taskData.template.type === StageTaskTypes.WITH_DATE && (
// 					<Pressable onPress={() => {}} style={styles.button}>
// 						<Text style={styles.buttonText}>
// 							{t('cases.case.taskButtonDate')}
// 						</Text>
// 					</Pressable>
// 				)}
// 			</View>
// 
// 			<Pressable
// 				style={[
// 					styles.toggle,
// 					taskData.status === UserCaseTaskStatus.DONE
// 						? styles.toggleDone
// 						: null,
// 				]}
// 				onPress={toggle}
// 			/>
// 
// 			{!isLast && <View style={styles.line} />}
// 			{isInstructionOpened &&
// 				taskData.template.type === StageTaskTypes.INFO && (
// 					<Instruction
// 						visible={isInstructionOpened}
// 						onClose={() => setIsInstructionOpened(false)}
// 						instructionId={
// 							taskData.template.instructionId
// 								? taskData.template.instructionId
// 								: 0
// 						}
// 					/>
// 				)}
// 		</View>
// 	)
// }
// 
// const styles = StyleSheet.create({
// 	task: {
// 		flexDirection: 'row',
// 		gap: 10,
// 		position: 'relative',
// 	},
// 	icon: {
// 		width: 50,
// 		height: 50,
// 		borderRadius: 25,
// 		backgroundColor: slate,
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 	},
// 	info: {
// 		flex: 1,
// 		gap: 20,
// 		minHeight: 100,
// 		alignItems: 'flex-start',
// 	},
// 	title: {
// 		color: 'white',
// 		fontSize: 18,
// 	},
// 	text: {
// 		color: 'gray',
// 	},
// 	button: {
// 		paddingVertical: 8,
// 		paddingHorizontal: 26,
// 		borderRadius: 20,
// 		backgroundColor: slate,
// 	},
// 	buttonText: {
// 		fontSize: 16,
// 		color: 'white',
// 	},
// 	toggle: {
// 		marginTop: 8,
// 		width: 30,
// 		height: 30,
// 		borderRadius: 20,
// 		borderWidth: 1,
// 		borderColor: 'white',
// 	},
// 	toggleDone: {
// 		backgroundColor: slate,
// 	},
// 	line: {
// 		position: 'absolute',
// 		width: 2,
// 		height: 40,
// 		backgroundColor: slate,
// 		left: 24,
// 		top: '50%',
// 		transform: [{ translateY: 15 }],
// 	},
// })
// 
// export default UserCaseTaskComponent
