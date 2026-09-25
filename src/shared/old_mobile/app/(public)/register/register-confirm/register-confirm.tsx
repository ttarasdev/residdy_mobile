// import { useState } from 'react'
// import { Keyboard, Pressable, Text, View } from 'react-native'
// import { useMutation } from '@tanstack/react-query'
// import { useLocalSearchParams, useRouter } from 'expo-router'
// import AuthFormInput from '@/src/components/auth/auth-form-input'
// import AuthFormSubmit from '@/src/components/auth/auth-form-submit'
// import { authStyles } from '@/src/shared/styles/auth.styles'
// import { userAuthApi } from '@/src/api/user-api/user-auth/user-auth.api'
// import { setAccessToken } from '@/src/api/access-token'
// import { TABS_PATHS } from '@/src/shared/enums/page-paths'
// 
// export default function RegisterConfirmScreen() {
// 	const router = useRouter()
// 	const params = useLocalSearchParams<{ email?: string }>()
// 	const email = typeof params.email === 'string' ? params.email : ''
// 
// 	const [code, setCode] = useState('')
// 	const [error, setError] = useState<string | null>(null)
// 
// 	const confirmMutation = useMutation({
// 		mutationFn: () =>
// 			userAuthApi.confirm({
// 				email,
// 				code,
// 			}),
// 		onSuccess: async (data) => {
// 			await setAccessToken(data.token)
// 			router.replace(TABS_PATHS.HOME)
// 		},
// 		onError: (e) => {
// 			setError((e as Error).message || 'Confirm failed')
// 		},
// 	})
// 
// 	const resendMutation = useMutation({
// 		mutationFn: () => userAuthApi.resend({ email }),
// 		onError: (e) => {
// 			setError((e as Error).message || 'Resend failed')
// 		},
// 	})
// 
// 	const submit = () => {
// 		Keyboard.dismiss()
// 		setError(null)
// 
// 		if (!email) {
// 			setError('Missing email')
// 			return
// 		}
// 		if (!code.trim()) {
// 			setError('Enter code')
// 			return
// 		}
// 
// 		confirmMutation.mutate()
// 	}
// 
// 	return (
// 		<Pressable style={authStyles.container} onPress={Keyboard.dismiss}>
// 			<View style={authStyles.page}>
// 				<View style={authStyles.inputs}>
// 					<AuthFormInput
// 						iconPath={require('../../../../assets/auth/key_black.png')}
// 						activeIconPath={require('../../../../assets/auth/key_blue.png')}
// 						labelTitle="Code"
// 						value={code}
// 						onChange={(v) => {
// 							setCode(v)
// 							if (error) setError(null)
// 						}}
// 						placeholder="123456"
// 						keyboardType="number-pad"
// 						returnKeyType="done"
// 						onSubmitEditing={submit}
// 					/>
// 				</View>
// 
// 				{error ? <Text style={authStyles.error}>{error}</Text> : null}
// 
// 				<AuthFormSubmit
// 					buttonTitle="Confirm"
// 					isLoading={confirmMutation.isPending}
// 					submit={submit}
// 				/>
// 
// 				<Pressable
// 					onPress={() => {
// 						setError(null)
// 						resendMutation.mutate()
// 					}}
// 					style={authStyles.forgot}
// 					disabled={resendMutation.isPending || !email}
// 				>
// 					<Text style={authStyles.forgotText}>Resend code</Text>
// 				</Pressable>
// 			</View>
// 		</Pressable>
// 	)
// }
