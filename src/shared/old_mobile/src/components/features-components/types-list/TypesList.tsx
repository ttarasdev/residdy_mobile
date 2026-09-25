// import { PublicAsset } from '@/src/api/media-api/public-assets/public-assets.types'
// import { STACK_PATHS } from '@/src/shared/enums/page-paths'
// import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
// import MidnightCard from '../cards/midnight-card'
// import { useRouter } from 'expo-router'
// import { PublicPhotoAsset } from '../jwt-images/PublicPhotoAsset'
// 
// export interface TypesListItem {
// 	id: number
// 	title: string
// 	icon: PublicAsset
// }
// 
// interface Props {
// 	title: string
// 	path: STACK_PATHS.CASES_LIST | STACK_PATHS.GDOCS_LIST
// 	items: TypesListItem[]
// }
// 
// const TypesList: React.FC<Props> = ({ title, path, items }) => {
// 	const router = useRouter()
// 
// 	return (
// 		<View>
// 			<Text style={styles.blockTitle}>{title}</Text>
// 			<View style={styles.items}>
// 				{items.map((i) => (
// 					<MidnightCard key={i.id} style={styles.itemCard}>
// 						<Pressable
// 							style={styles.item}
// 							key={i.id}
// 							onPress={() => router.push(`${path}/${i.id}`)}
// 						>
// 							<PublicPhotoAsset
// 								url={i.icon.url}
// 								width={40}
// 								height={40}
// 								alt={i.icon.originalName}
// 								contentFit="cover"
// 							/>
// 							<Text style={styles.itemTitle}>{i.title}</Text>
// 						</Pressable>
// 					</MidnightCard>
// 				))}
// 			</View>
// 		</View>
// 	)
// }
// 
// const styles = StyleSheet.create({
// 	blockTitle: {
// 		fontWeight: 700,
// 		fontSize: 16,
// 		marginBottom: 10,
// 	},
// 	items: {
// 		flexDirection: 'row',
// 		flexWrap: 'wrap',
// 		gap: 5,
// 	},
// 	itemCard: {
// 		width: (Dimensions.get('window').width - 25) / 2,
// 		height: 120,
// 	},
// 	item: {
// 		flex: 1,
// 		padding: 10,
// 		justifyContent: 'space-between',
// 		alignItems: 'center',
// 	},
// 	itemTitle: {
// 		color: 'white',
// 		fontWeight: 700,
// 		textAlign: 'center',
// 	},
// })
// 
// export default TypesList
