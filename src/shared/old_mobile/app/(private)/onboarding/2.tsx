// import { View } from 'react-native'
// import { useRouter } from 'expo-router'
// import { useTranslation } from '@/node_modules/react-i18next'
// import { ONBOARDING_PATHS } from '@/src/shared/enums/page-paths'
// import { onboardingStyles } from '@/src/shared/styles/onboarding.styles'
// import OnboardingTop from '@/src/components/onboarding/OnboardingTop'
// import OnboardingNextButton from '@/src/components/onboarding/OnboardingNextButton'
// 
// export default function OnboardingStep2() {
// 	const router = useRouter()
// 	const { t } = useTranslation()
// 
// 	return (
// 		<View style={onboardingStyles.container}>
// 			<OnboardingTop
// 				subtitle={t('onboarding.step2.subtitle')}
// 				title={t('onboarding.step2.title')}
// 			/>
// 			<View style={onboardingStyles.space} />
// 			<OnboardingNextButton
// 				disabled={false}
// 				next={() => router.replace(ONBOARDING_PATHS.ONBOARDING_3)}
// 			/>
// 		</View>
// 	)
// }
