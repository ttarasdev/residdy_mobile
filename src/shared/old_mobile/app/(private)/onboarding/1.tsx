// import { View } from 'react-native'
// import { useRouter } from 'expo-router'
// import { ONBOARDING_PATHS } from '@/src/shared/enums/page-paths'
// import { onboardingStyles } from '@/src/shared/styles/onboarding.styles'
// import { setAppLanguage } from '@/src/i18n'
// import OnboardingTop from '@/src/components/onboarding/OnboardingTop'
// import { useOnboarding } from '@/src/shared/providers/onboarding-provider'
// import OnboardingList from '@/src/components/onboarding/OnboardingList'
// import OnboardingNextButton from '@/src/components/onboarding/OnboardingNextButton'
// 
// export default function OnboardingStep1() {
// 	const router = useRouter()
// 	const { data } = useOnboarding()
// 
// 	const canNext = data.lan !== null
// 
// 	const next = async () => {
// 		if (!data.lan) return
// 		await setAppLanguage(data.lan)
// 		router.replace(ONBOARDING_PATHS.ONBOARDING_2)
// 	}
// 
// 	return (
// 		<View style={onboardingStyles.container}>
// 			<OnboardingTop
// 				title="Choose your language:"
// 				subtitle="you can change it later in settings"
// 			/>
// 			<OnboardingList />
// 			<OnboardingNextButton next={next} disabled={!canNext} />
// 		</View>
// 	)
// }
