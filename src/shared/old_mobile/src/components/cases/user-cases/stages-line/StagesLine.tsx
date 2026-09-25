// import { UserCaseStage } from '@/src/api/user-cases-api/user-case-stages/user-case-stages.types'
// import { PublicPhotoAsset } from '@/src/components/features-components/jwt-images/PublicPhotoAsset'
// import { slate } from '@/src/shared/styles/constants.styles'
// import { StyleSheet, View, Text } from 'react-native'
// 
// interface Props {
// 	items: UserCaseStage[]
// 	activeNo: number
// }
// 
// const StagesLine: React.FC<Props> = ({ items, activeNo }) => {
// 	return (
// 		<View style={styles.items}>
// 			{items.map((i, index) => (
// 				<View key={i.id} style={styles.item}>
// 					<View
// 						style={[
// 							styles.itemIcon,
// 							i.template.stageNo === activeNo
// 								? styles.itemIconActive
// 								: null,
// 						]}
// 					>
// 						<PublicPhotoAsset
// 							width={30}
// 							height={30}
// 							url={i.template.icon.url}
// 							alt={i.template.icon.originalName}
// 						/>
// 					</View>
// 					<Text style={styles.itemText}>{i.template.title}</Text>
//                     <View style={[styles.line, styles.leftLine]} />
// 					<View style={[styles.line, styles.rightLine]} />
// 				</View>
// 			))}
// 		</View>
// 	)
// }
// 
// const styles = StyleSheet.create({
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
// 		borderWidth: 1,
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
// })
// 
// export default StagesLine
