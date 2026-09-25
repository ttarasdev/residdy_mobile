// import { View } from 'react-native'
// import { useRouter } from 'expo-router'
// import { useTranslation } from '@/node_modules/react-i18next'
// import { ONBOARDING_PATHS } from '@/src/shared/enums/page-paths'
// import { onboardingStyles } from '@/src/shared/styles/onboarding.styles'
// import { useOnboarding } from '@/src/shared/providers/onboarding-provider'
// import OnboardingTop from '@/src/components/onboarding/OnboardingTop'
// import OnboardingInput from '@/src/components/onboarding/OnboardingInput'
// import OnboardingNextButton from '@/src/components/onboarding/OnboardingNextButton'
// 
// export default function OnboardingStep4() {
// 	const router = useRouter()
// 	const { t } = useTranslation()
// 	const { data, setSurname } = useOnboarding()
// 
// 	const canNext = Boolean(data.surname && data.surname.trim())
// 
// 	return (
// 		<View style={onboardingStyles.container}>
// 			<OnboardingTop
// 				subtitle={t('onboarding.step4.subtitle')}
// 				title={t('onboarding.step4.title')}
// 			/>
// 			<OnboardingInput
// 				setValue={setSurname}
// 				value={data.surname ?? ''}
// 				placeholder={t('onboarding.placeholders.surname')}
// 			/>
// 			<View style={onboardingStyles.space} />
// 			<OnboardingNextButton
// 				disabled={!canNext}
// 				next={() => router.replace(ONBOARDING_PATHS.ONBOARDING_5)}
// 			/>
// 		</View>
// 	)
// }
