// import { UserCase } from '@/src/api/user-cases-api/user-cases/user-cases.types'
// import RightButton from '@/src/components/features-components/buttons/right-button'
// import MidnightCard from '@/src/components/features-components/cards/midnight-card'
// import { PublicPhotoAsset } from '@/src/components/features-components/jwt-images/PublicPhotoAsset'
// import { STACK_PATHS } from '@/src/shared/enums/page-paths'
// import { getVisibleUserCaseStages } from '@/src/shared/lib/user-cases'
// import { slate } from '@/src/shared/styles/constants.styles'
// import { useRouter } from 'expo-router'
// import { StyleSheet, Text, View } from 'react-native'
// import StagesLine from '../stages-line/StagesLine'
// 
// interface Props {
// 	item: UserCase
// }
// 
// const UserCaseCard: React.FC<Props> = ({ item }) => {
// 	const visibleStages = getVisibleUserCaseStages(item)
// 	const router = useRouter()
// 
// 	return (
// 		<MidnightCard
// 			style={styles.card}
// 			onPress={() =>
// 				router.push({
// 					pathname: `${STACK_PATHS.USER_CASES}/[id]`,
// 					params: { id: item.id },
// 				})
// 			}
// 		>
// 			<Text style={styles.title}>{item.template.title}</Text>
// 			<StagesLine items={visibleStages} activeNo={item.activeStageNo} />
// 			<View style={styles.footer}>
// 				<RightButton />
// 			</View>
// 		</MidnightCard>
// 	)
// }
// 
// const styles = StyleSheet.create({
// 	card: {
// 		alignItems: 'center',
// 	},
// 	title: {
// 		color: 'white',
// 		textAlign: 'center',
// 		fontSize: 18,
// 		fontWeight: 700,
// 		width: 250,
// 	},
// 	items: {
// 		width: '100%',
// 		flexDirection: 'row',
// 		justifyContent: 'center',
// 		marginVertical: 20,
// 	},
// 	item: {
// 		width: '33.3%',
// 		alignItems: 'center',
// 		gap: 10,
// 		position: 'relative',
// 	},
// 	itemIcon: {
// 		width: 50,
// 		height: 50,
// 		borderRadius: 25,
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		borderWidth: 2,
// 		borderColor: slate,
// 	},
// 	itemIconActive: {
// 		backgroundColor: slate,
// 	},
// 	itemText: {
// 		color: 'white',
// 		textAlign: 'center',
// 		fontSize: 16,
// 	},
// 	line: {
// 		position: 'absolute',
// 		height: 2,
// 		width: 20,
// 		backgroundColor: slate,
// 		top: 25,
// 	},
// 	leftLine: {
// 		left: 0,
// 	},
// 	rightLine: {
// 		right: 0,
// 	},
// 	footer: {
// 		width: '100%',
// 		alignItems: 'flex-end',
// 	},
// })
// 
// export default UserCaseCard
