// import { midnight } from '@/src/shared/styles/constants.styles'
// import { Pressable, StyleSheet, Text } from 'react-native'
// 
// type Props = {
// 	submit: () => void
// 	isLoading: boolean
// 	buttonTitle: string
// }
// 
// export default function AuthFormSubmit({
// 	submit,
// 	isLoading,
// 	buttonTitle,
// }: Props) {
// 	return (
// 		<Pressable
// 			onPress={submit}
// 			disabled={isLoading}
// 			style={({ pressed }) => [
// 				s.button,
// 				pressed && !isLoading ? s.pressed : null,
// 				isLoading ? s.disabled : null,
// 			]}
// 		>
// 			{isLoading ? (
// 				<Text style={s.text}>Logowanie...</Text>
// 			) : (
// 				<Text style={s.text}>{buttonTitle}</Text>
// 			)}
// 		</Pressable>
// 	)
// }
// 
// const s = StyleSheet.create({
// 	button: {
// 		height: 70,
// 		borderRadius: 15,
// 		backgroundColor: midnight,
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 		width: '100%',
// 	},
// 	pressed: {
// 		opacity: 0.85,
// 	},
// 	disabled: {
// 		opacity: 0.6,
// 	},
// 	text: {
// 		color: '#fff',
// 		fontSize: 18,
// 		fontWeight: '700',
// 	},
// })
