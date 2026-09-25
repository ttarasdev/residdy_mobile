// import { midnight } from '@/src/shared/styles/constants.styles'
// import { Pressable, StyleSheet, Text, View } from 'react-native'
// 
// interface Props {
// 	title: string
// 	subtitle?: string
// 	buttonTitle?: string
// 	onPress?: () => void
// }
// 
// const PagesTop: React.FC<Props> = ({
// 	title,
// 	subtitle,
// 	buttonTitle,
// 	onPress,
// }) => {
// 	return (
// 		<View style={styles.top}>
// 			<Text style={styles.title}>{title}</Text>
// 			{subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
// 			{onPress && buttonTitle && (
// 				<Pressable onPress={onPress} style={styles.button}>
// 					<Text style={styles.buttonTitle}>{buttonTitle}</Text>
// 				</Pressable>
// 			)}
// 		</View>
// 	)
// }
// 
// const styles = StyleSheet.create({
// 	top: {
// 		paddingVertical: 10,
// 		gap: 10,
// 		alignItems: 'flex-start',
// 	},
// 	title: {
// 		fontSize: 32,
// 		fontWeight: 500,
// 		width: 250,
// 	},
// 	subtitle: {
// 		fontSize: 18,
// 		width: 300,
// 	},
// 	button: {
// 		borderWidth: 1,
// 		borderColor: midnight,
// 		paddingHorizontal: 16,
// 		paddingVertical: 8,
// 		borderRadius: 30,
// 	},
// 	buttonTitle: { fontSize: 18 },
// })
// 
// export default PagesTop
