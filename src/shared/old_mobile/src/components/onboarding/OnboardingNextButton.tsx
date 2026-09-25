// 'use client'
// 
// import { midnight } from '@/src/shared/styles/constants.styles'
// import { useTranslation } from '@/node_modules/react-i18next'
// import { Pressable, StyleSheet, Text } from 'react-native'
// 
// interface Props {
// 	next: () => void
// 	disabled: boolean
// }
// 
// const OnboardingNextButton: React.FC<Props> = ({ next, disabled }) => {
// 	const { t } = useTranslation()
// 
// 	return (
// 		<Pressable
// 			onPress={next}
// 			disabled={disabled}
// 			style={[
// 				styles.nextButton,
// 				disabled ? styles.nextButtonDisabled : null,
// 			]}
// 		>
// 			<Text style={styles.nextButtonText}>{t('onboarding.next')}</Text>
// 		</Pressable>
// 	)
// }
// 
// const styles = StyleSheet.create({
// 	nextButton: {
// 		paddingVertical: 14,
// 		borderRadius: 25,
// 		backgroundColor: midnight,
// 		borderWidth: 1,
// 		borderColor: midnight,
// 		width: 200,
// 	},
// 	nextButtonDisabled: {
// 		opacity: 0,
// 	},
// 	nextButtonText: {
// 		color: 'white',
// 		fontSize: 16,
// 		textAlign: 'center',
// 	},
// })
// 
// export default OnboardingNextButton
