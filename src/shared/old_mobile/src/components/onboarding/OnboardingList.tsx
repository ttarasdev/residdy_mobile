// import { Languages } from '@/src/shared/enums/languages.enum'
// import { useOnboarding } from '@/src/shared/providers/onboarding-provider'
// import { midnight, silver } from '@/src/shared/styles/constants.styles'
// import { Pressable, StyleSheet, View, Text } from 'react-native'
// 
// const items = [
// 	{ key: Languages.PL, label: 'Polski' },
// 	{ key: Languages.UA, label: 'Українська' },
// 	{ key: Languages.EN, label: 'English' },
// 	{ key: Languages.RU, label: 'Russian' },
// ] as const
// 
// const OnboardingList = () => {
// 	const { data, setLan } = useOnboarding()
// 
// 	return (
// 		<View style={styles.list}>
// 			{items.map((x) => {
// 				const selected = data.lan === x.key
// 				return (
// 					<Pressable
// 						key={x.key}
// 						onPress={() => setLan(x.key)}
// 						style={[
// 							styles.option,
// 							selected ? styles.optionSelected : null,
// 						]}
// 					>
// 						<Text style={styles.optionText}>{x.label}</Text>
// 					</Pressable>
// 				)
// 			})}
// 		</View>
// 	)
// }
// 
// const styles = StyleSheet.create({
// 	list: {
// 		width: '100%',
// 		gap: 10,
// 	},
// 	option: {
// 		paddingVertical: 24,
// 		paddingHorizontal: 14,
// 		borderRadius: 20,
// 		backgroundColor: midnight,
// 	},
// 	optionSelected: {
// 		borderColor: '#FFFFFF',
// 		backgroundColor: silver,
// 	},
// 	optionText: {
// 		textAlign: 'center',
// 		fontSize: 16,
// 		color: '#FFFFFF',
// 	},
// })
// 
// export default OnboardingList
