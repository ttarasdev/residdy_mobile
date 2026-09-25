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
// export default function OnboardingStep5() {
// 	const router = useRouter()
// 	const { t } = useTranslation()
// 	const { data, setLocation } = useOnboarding()
// 
// 	const canNext = Boolean(data.location && data.location.trim())
// 
// 	return (
// 		<View style={onboardingStyles.container}>
// 			<OnboardingTop
// 				subtitle={t('onboarding.step5.subtitle')}
// 				title={t('onboarding.step5.title')}
// 			/>
// 			<OnboardingInput
// 				setValue={setLocation}
// 				value={data.location ?? ''}
// 				placeholder={t('onboarding.placeholders.location')}
// 			/>
// 			<View style={onboardingStyles.space} />
// 			<OnboardingNextButton
// 				disabled={!canNext}
// 				next={() => router.replace(ONBOARDING_PATHS.ONBOARDING_6)}
// 			/>
// 		</View>
// 	)
// }
