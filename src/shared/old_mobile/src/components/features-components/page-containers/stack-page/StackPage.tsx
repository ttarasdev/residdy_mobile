// import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
// import { ScrollView } from 'react-native'
// import BackButton from '../../buttons/back-button'
// 
// interface Props {
// 	children: React.ReactNode
// 	style?: StyleProp<ViewStyle>
// }
// 
// const StackPage: React.FC<Props> = ({ children, style }) => {
// 	return (
// 		<View style={styles.container}>
// 			<BackButton />
// 			<ScrollView
// 				showsVerticalScrollIndicator={false}
// 				style={styles.scrollContainer}
// 				contentContainerStyle={[styles.page, style]}
// 			>
// 				{children}
// 			</ScrollView>
// 		</View>
// 	)
// }
// 
// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: 'white',
// 	},
// 	scrollContainer: {
// 		flex: 1,
// 		backgroundColor: 'white',
// 		marginTop: 10,
// 	},
// 	page: {
// 		flexDirection: 'column',
// 		gap: 10,
// 		backgroundColor: 'white',
// 		paddingBottom: 20,
// 	},
// })
// 
// export default StackPage
