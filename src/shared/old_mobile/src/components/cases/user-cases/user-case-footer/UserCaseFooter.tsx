// import { userCaseStagesApi } from '@/src/api/user-cases-api/user-case-stages/user-case-stages.api'
// import { useMutation } from '@tanstack/react-query'
// import { useTranslation } from '@/node_modules/react-i18next'
// import { Pressable, StyleSheet, View, Image, Text } from 'react-native'
// 
// interface Props {
// 	isNextVisible: boolean
// 	isBackVisible: boolean
// 	goNext: () => void
// 	goBack: () => void
// }
// 
// const UserCaseFooter: React.FC<Props> = ({
// 	isBackVisible,
// 	isNextVisible,
// 	goBack,
// 	goNext,
// }) => {
// 	const { t } = useTranslation()
// 
// 	return (
// 		<View style={styles.footer}>
// 			<Pressable
// 				style={[
// 					styles.prev,
// 					!isBackVisible ? styles.prevDisabled : null,
// 				]}
// 				onPress={goBack}
// 			>
// 				<Image
// 					source={require('../../../../../assets/system_icons/arrow_white.png')}
// 					style={styles.arrowWhite}
// 					accessibilityLabel="arrow"
// 				/>
// 				<Text style={styles.prevText}>
// 					{t('cases.case.previousStage')}
// 				</Text>
// 			</Pressable>
// 			<Pressable
// 				style={[
// 					styles.next,
// 					!isNextVisible ? styles.nextDisabled : null,
// 				]}
// 				onPress={goNext}
// 			>
// 				<Text style={styles.nextText}>{t('cases.case.nextStage')}</Text>
// 				<Image
// 					source={require('../../../../../assets/system_icons/arrow_black.png')}
// 					style={styles.arrowBlack}
// 					accessibilityLabel="arrow"
// 				/>
// 			</Pressable>
// 		</View>
// 	)
// }
// 
// const styles = StyleSheet.create({
// 	footer: {
// 		marginTop: 40,
// 		gap: 10,
// 		flexDirection: 'row',
// 	},
// 	prev: {
// 		width: '50%',
// 		borderColor: 'white',
// 		borderWidth: 1,
// 		borderRadius: 25,
// 		alignItems: 'center',
// 		flexDirection: 'row',
// 		justifyContent: 'space-around',
// 		padding: 12,
// 	},
// 	prevDisabled: {
// 		pointerEvents: 'none',
// 		opacity: 0.3,
// 	},
// 	prevText: {
// 		color: 'white',
// 		fontSize: 16,
// 	},
// 	next: {
// 		width: '50%',
// 		backgroundColor: 'white',
// 		borderRadius: 25,
// 		flexDirection: 'row',
// 		justifyContent: 'space-around',
// 		padding: 12,
// 		alignItems: 'center',
// 	},
// 	nextDisabled: {
// 		pointerEvents: 'none',
// 		opacity: 0.3,
// 	},
// 	nextText: {
// 		fontSize: 16,
// 	},
// 	arrowBlack: {
// 		width: 15,
// 		height: 15,
// 	},
// 	arrowWhite: {
// 		transform: 'rotate(180deg)',
// 		width: 15,
// 		height: 15,
// 	},
// })
// 
// export default UserCaseFooter
