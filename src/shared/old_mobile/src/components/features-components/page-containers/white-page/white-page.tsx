// import React from 'react'
// import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
// import { StatusBar } from 'expo-status-bar'
// import { SafeAreaView } from 'react-native-safe-area-context'
// 
// interface Props {
// 	children: React.ReactNode
// 	padding?: ViewStyle['padding']
// 	style?: StyleProp<ViewStyle>
// }
// 
// const WhitePage: React.FC<Props> = ({ children, padding, style }) => {
// 	return (
// 		<View style={styles.screen}>
// 			<StatusBar style="dark" />
// 			<SafeAreaView style={styles.safeArea} edges={['top']}>
// 				<View
// 					style={[
// 						styles.content,
// 						{
// 							paddingHorizontal: padding ?? 10,
// 						},
// 						style,
// 					]}
// 				>
// 					{children}
// 				</View>
// 			</SafeAreaView>
// 		</View>
// 	)
// }
// 
// const styles = StyleSheet.create({
// 	screen: {
// 		flex: 1,
// 		backgroundColor: 'white',
// 	},
// 	safeArea: {
// 		flex: 1,
// 		backgroundColor: 'white',
// 	},
// 	content: {
// 		flex: 1,
// 	},
// })
// 
// export default WhitePage
