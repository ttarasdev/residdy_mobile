// import { useTranslation } from '@/node_modules/react-i18next'
// import { StyleSheet, Text, View } from 'react-native'
// import UserCaseTaskComponent from '../user-case-task/UserCaseTask'
// import {
// 	UserCaseStageDetailed,
// 	UserCaseStageStatus,
// } from '@/src/api/user-cases-api/user-case-stages/user-case-stages.types'
// 
// interface Props {
// 	stageData: UserCaseStageDetailed
// 	setStage: React.Dispatch<React.SetStateAction<UserCaseStageDetailed>>
// }
// 
// const UserCaseStage: React.FC<Props> = ({ stageData, setStage }) => {
// 	const { t } = useTranslation()
// 
// 	return (
// 		<View style={styles.stage}>
// 			<Text style={styles.stageNo}>
// 				{t('cases.case.stageNo')} {stageData.template.stageNo}
// 			</Text>
// 			<Text style={styles.title}>{stageData.template.title}</Text>
// 			<View
// 				style={[
// 					styles.tasks,
// 					stageData.status === UserCaseStageStatus.DONE
// 						? styles.tasksDisabled
// 						: null,
// 				]}
// 			>
// 				{stageData.tasks.map((i, index, array) => {
// 					const lastIndex = array.length - 1
// 
// 					return (
// 						<UserCaseTaskComponent
// 							key={i.id}
// 							isLast={index === lastIndex}
// 							taskData={i}
// 							setStage={setStage}
// 						/>
// 					)
// 				})}
// 			</View>
// 		</View>
// 	)
// }
// 
// const styles = StyleSheet.create({
// 	stage: {
// 		gap: 10,
// 	},
// 	stageNo: {
// 		color: 'gray',
// 	},
// 	title: {
// 		color: 'white',
// 		fontSize: 18,
// 	},
// 	tasks: {
// 		gap: 20,
// 	},
// 	tasksDisabled: {
// 		opacity: 0.5,
// 		pointerEvents: 'none',
// 	},
// })
// 
// export default UserCaseStage
