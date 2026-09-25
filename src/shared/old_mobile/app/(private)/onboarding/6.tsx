// import { useMemo } from 'react'
// import { ActivityIndicator, View } from 'react-native'
// import { useRouter } from 'expo-router'
// import { useTranslation } from '@/node_modules/react-i18next'
// import { useMutation, useQueryClient } from '@tanstack/react-query'
// import { userApi } from '@/src/api/user-api/user/user.api'
// import { UpdateUserDto } from '@/src/api/user-api/user/user.types'
// import { useOnboarding } from '@/src/shared/providers/onboarding-provider'
// import { onboardingStyles } from '@/src/shared/styles/onboarding.styles'
// import { QUERY_KEYS, QUERY_KEYS_USER } from '@/src/shared/enums/query-keys.enum'
// import OnboardingTop from '@/src/components/onboarding/OnboardingTop'
// import OnboardingInput from '@/src/components/onboarding/OnboardingInput'
// import OnboardingNextButton from '@/src/components/onboarding/OnboardingNextButton'
// import { TABS_PATHS } from '@/src/shared/enums/page-paths'
// 
// export default function OnboardingStep6() {
// 	const router = useRouter()
// 	const { t } = useTranslation()
// 	const queryClient = useQueryClient()
// 	const { data, setPhone } = useOnboarding()
// 
// 	const canFinish = useMemo(() => {
// 		return Boolean(
// 			data.lan &&
// 				data.name?.trim() &&
// 				data.surname?.trim() &&
// 				data.location?.trim() &&
// 				data.phone?.trim(),
// 		)
// 	}, [data])
// 
// 	const mutation = useMutation({
// 		mutationFn: (dto: UpdateUserDto) => userApi.updateCurrent(dto),
// 		onSuccess: async () => {
// 			await queryClient.invalidateQueries({
// 				queryKey: [QUERY_KEYS_USER.ME],
// 			})
// 			router.replace(TABS_PATHS.HOME)
// 		},
// 	})
// 
// 	const finish = () => {
// 		if (!canFinish || mutation.isPending) return
// 		mutation.mutate({
// 			lan: data.lan!,
// 			name: data.name?.trim(),
// 			surname: data.surname?.trim(),
// 			location: data.location?.trim(),
// 			phone: data.phone?.trim(),
// 		})
// 	}
// 
// 	return (
// 		<View style={onboardingStyles.container}>
// 			<OnboardingTop
// 				subtitle={t('onboarding.step6.subtitle')}
// 				title={t('onboarding.step6.title')}
// 			/>
// 			<OnboardingInput
// 				setValue={setPhone}
// 				value={data.phone ?? ''}
// 				placeholder={t('onboarding.placeholders.phone')}
// 			/>
// 			<View style={onboardingStyles.space} />
// 			{mutation.isPending ? (
// 				<ActivityIndicator />
// 			) : (
// 				<OnboardingNextButton
// 					disabled={!canFinish || mutation.isPending}
// 					next={finish}
// 				/>
// 			)}
// 		</View>
// 	)
// }
