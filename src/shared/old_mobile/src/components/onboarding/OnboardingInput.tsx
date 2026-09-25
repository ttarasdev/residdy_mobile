// import { useOnboarding } from '@/src/shared/providers/onboarding-provider'
// import { midnight } from '@/src/shared/styles/constants.styles'
// import { StyleSheet, TextInput, View } from 'react-native'
// 
// interface Props {
// 	placeholder: string
// 	value: string
// 	setValue: (v: string | null) => void
// }
// 
// const OnboardingInput: React.FC<Props> = ({ setValue, value, placeholder }) => {
// 	return (
// 		<View style={styles.inputWrap}>
// 			<TextInput
// 				value={value}
// 				onChangeText={(v) => setValue(v.trim() ? v : null)}
// 				placeholder={placeholder}
// 				placeholderTextColor="rgba(71, 70, 70, 0.6)"
// 				autoCapitalize="words"
// 				style={styles.input}
// 			/>
// 		</View>
// 	)
// }
// 
// const styles = StyleSheet.create({
// 	inputWrap: {
// 		width: '100%',
// 	},
// 	input: {
// 		width: '100%',
// 		paddingVertical: 18,
// 		paddingHorizontal: 16,
// 		borderRadius: 20,
// 		borderWidth: 1,
// 		borderColor: midnight,
// 		fontSize: 16,
// 	},
// })
// 
// export default OnboardingInput
