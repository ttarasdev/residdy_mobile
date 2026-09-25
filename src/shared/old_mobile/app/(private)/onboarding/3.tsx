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
// export default function OnboardingStep3() {
// 	const router = useRouter()
// 	const { t } = useTranslation()
// 	const { data, setName } = useOnboarding()
// 
// 	const canNext = Boolean(data.name && data.name.trim())
// 
// 	return (
// 		<View style={onboardingStyles.container}>
// 			<OnboardingTop
// 				subtitle={t('onboarding.step3.title')}
// 				title={t('onboarding.step3.subtitle')}
// 			/>
// 			<OnboardingInput
// 				setValue={setName}
// 				value={data.name ?? ''}
// 				placeholder={t('onboarding.placeholders.name')}
// 			/>
// 			<View style={onboardingStyles.space} />
// 			<OnboardingNextButton
// 				disabled={!canNext}
// 				next={() => router.replace(ONBOARDING_PATHS.ONBOARDING_4)}
// 			/>
// 		</View>
// 	)
// }
