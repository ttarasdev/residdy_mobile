// import { Pressable, StyleSheet, View, Text, Dimensions } from 'react-native'
// import { TypesListItem } from '../types-list/TypesList'
// import MidnightCard from '../cards/midnight-card'
// import { PublicPhotoAsset } from '../jwt-images/PublicPhotoAsset'
// 
// interface Props {
// 	onItemPress: (id: number) => void
// 	items: TypesListItem[]
// }
// 
// const ListByType: React.FC<Props> = ({ onItemPress, items }) => {
// 	return (
// 		<View style={styles.items}>
// 			{items.map((i) => (
// 				<MidnightCard
// 					onPress={() => onItemPress(i.id)}
// 					key={i.id}
// 					style={styles.item}
// 				>
// 					<Text style={styles.itemTitle}>{i.title}</Text>
// 					<PublicPhotoAsset
// 						url={i.icon.url}
// 						width={40}
// 						height={40}
// 						alt={i.icon.originalName}
// 						contentFit="cover"
// 					/>
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
// 		gap: 10,
// 		justifyContent: 'space-between',
// 		padding: 20,
// 	},
// 	itemTitle: {
// 		width: '100%',
// 		fontSize: 16,
// 		color: 'white',
// 		fontWeight: 700,
// 	},
// })
// 
// export default ListByType
