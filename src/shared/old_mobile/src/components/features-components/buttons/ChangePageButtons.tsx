// import { midnight } from '@/src/shared/styles/constants.styles'
// import { Image } from 'expo-image'
// import { Pressable, StyleSheet, Text, View } from 'react-native'
// 
// interface Props {
// 	page: number
// 	setPage: (page: number) => void
// 	maxPage: number
// }
// 
// const ChangePageButtons: React.FC<Props> = ({ page, setPage, maxPage }) => {
// 	return (
// 		<View style={styles.buttons}>
// 			<Pressable
// 				style={[styles.button, { opacity: page <= 1 ? 0.5 : 1 }]}
// 				onPress={() => setPage(Math.max(1, page - 1))}
// 				disabled={page < 1}
// 			>
// 				<Image
// 					style={styles.buttonIcon}
// 					source={require('../../../../assets/system_icons/arrow_white.png')}
// 					alt="<"
// 				/>
// 			</Pressable>
// 			<Text style={styles.pageNumber}>{page}</Text>
// 			<Pressable
// 				style={[
// 					styles.button,
// 					styles.right,
// 					{ opacity: page >= maxPage ? 0.5 : 1 },
// 				]}
// 				onPress={() => setPage(Math.min(maxPage, page + 1))}
// 				disabled={page >= maxPage}
// 			>
// 				<Image
// 					style={styles.buttonIcon}
// 					source={require('../../../../assets/system_icons/arrow_white.png')}
// 					alt="<"
// 				/>
// 			</Pressable>
// 		</View>
// 	)
// }
// 
// const styles = StyleSheet.create({
// 	buttons: {
// 		flexDirection: 'row',
// 		gap: 10,
// 		alignItems: 'center',
// 	},
// 	button: {
// 		width: 50,
// 		height: 50,
// 		borderRadius: 25,
// 		backgroundColor: midnight,
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 		transform: 'rotate(180deg)',
// 	},
// 	right: {
// 		transform: 'rotate(0deg)',
// 	},
// 	pageNumber: {
// 		fontSize: 18,
// 	},
// 	buttonIcon: {
// 		width: 20,
// 		height: 20,
// 	},
// })
// 
// export default ChangePageButtons
