// import { Pressable, View } from 'react-native'
// import { usePathname, useRouter } from 'expo-router'
// import { ONBOARDING_PATHS } from '@/src/shared/enums/page-paths'
// 
// const STEP_PATHS = [
// 	ONBOARDING_PATHS.ONBOARDING_2,
// 	ONBOARDING_PATHS.ONBOARDING_1,
// 	ONBOARDING_PATHS.ONBOARDING_3,
// 	ONBOARDING_PATHS.ONBOARDING_4,
// 	ONBOARDING_PATHS.ONBOARDING_5,
// 	ONBOARDING_PATHS.ONBOARDING_6,
// ] as const
// 
// export function OnboardingProgressBar() {
// 	const router = useRouter()
// 	const pathname = usePathname()
// 
// 	const last = pathname.split('/').filter(Boolean).pop() ?? '1'
// 	const step = Number(last) || 1
// 	const currentIndex = Math.min(Math.max(step - 1, 0), 5)
// 
// 	return (
// 		<View
// 			style={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 12 }}
// 		>
// 			<View style={{ flexDirection: 'row', gap: 8 }}>
// 				{STEP_PATHS.map((path, i) => {
// 					const enabled = i <= currentIndex
// 
// 					return (
// 						<Pressable
// 							key={path}
// 							disabled={!enabled}
// 							onPress={() => router.replace(path)}
// 							style={{
// 								flex: 1,
// 								height: 7,
// 								backgroundColor:
// 									i <= currentIndex ? '#000000' : '#D1D5DB',
// 								opacity: enabled ? 1 : 0.7,
// 							}}
// 						/>
// 					)
// 				})}
// 			</View>
// 		</View>
// 	)
// }
