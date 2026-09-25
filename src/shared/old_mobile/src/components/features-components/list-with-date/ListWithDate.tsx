// import { ListItemWithDate } from '@/src/shared/lib/mapToListWithDate'
// import { slate } from '@/src/shared/styles/constants.styles'
// import { StyleSheet, Text, View } from 'react-native'
// import MidnightCard from '../cards/midnight-card'
// 
// interface Props {
// 	items: ListItemWithDate[]
// 	onItemPress: (id: number) => void
// }
// 
// const ListWithDate: React.FC<Props> = ({ items, onItemPress }) => {
// 	return (
// 		<View style={styles.items}>
// 			{items.map((i) => (
// 				<MidnightCard
// 					onPress={() => onItemPress(i.id)}
// 					key={i.id}
// 					style={styles.item}
// 				>
// 					<Text style={styles.itemTitle}>{i.title}</Text>
// 					<Text style={styles.itemDate}>{i.date}</Text>
// 				</MidnightCard>
// 			))}
// 		</View>
// 	)
// }
// 
// const styles = StyleSheet.create({
// 	items: {
// 		gap: 5,
// 	},
// 	item: {
// 		width: '100%',
// 		alignItems: 'flex-end',
// 		gap: 5,
// 		justifyContent: 'space-between',
// 		padding: 20,
// 	},
// 	itemTitle: {
// 		width: '100%',
// 		fontSize: 16,
// 		color: 'white',
// 		fontWeight: 700,
// 		paddingBottom: 10,
// 		borderBottomWidth: 1,
// 		borderBottomColor: slate,
// 	},
// 	itemDate: {
// 		width: '100%',
// 		fontSize: 14,
// 		color: slate,
// 	},
// })
// 
// export default ListWithDate
