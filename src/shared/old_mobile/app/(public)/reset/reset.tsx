// import { useState } from 'react'
// import { Keyboard, Pressable, Text, View } from 'react-native'
// import { useMutation } from '@tanstack/react-query'
// import { useRouter } from 'expo-router'
// import AuthFormInput from '@/src/components/auth/auth-form-input'
// import AuthFormSubmit from '@/src/components/auth/auth-form-submit'
// import { authStyles } from '@/src/shared/styles/auth.styles'
// import { userResetApi } from '@/src/api/user-api/user-reset/user-reset.api'
// import { AUTH_PATHS } from '@/src/shared/enums/page-paths'
// 
// export default function ResetScreen() {
// 	const router = useRouter()
// 
// 	const [email, setEmail] = useState('')
// 	const [error, setError] = useState<string | null>(null)
// 
// 	const requestMutation = useMutation({
// 		mutationFn: () =>
// 			userResetApi.request({
// 				email: email.trim(),
// 			}),
// 		onSuccess: () => {
// 			const e = encodeURIComponent(email.trim())
// 			router.push(`${AUTH_PATHS.RESET_CONFIRM}?email=${e}`)
// 		},
// 		onError: (e) => {
// 			setError((e as Error).message || 'Reset request failed')
// 		},
// 	})
// 
// 	const submit = () => {
// 		Keyboard.dismiss()
// 		setError(null)
// 
// 		const e = email.trim()
// 		if (!e) {
// 			setError('Enter email')
// 			return
// 		}
// 
// 		requestMutation.mutate()
// 	}
// 
// 	return (
// 		<Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
// 			<View style={authStyles.container}>
// 				<View style={authStyles.inputs}>
// 					<AuthFormInput
// 						iconPath={require('../../../assets/auth/email_black.png')}
// 						activeIconPath={require('../../../assets/auth/email_blue.png')}
// 						labelTitle="Email"
// 						value={email}
// 						onChange={(v) => {
// 							setEmail(v)
// 							if (error) setError(null)
// 						}}
// 						placeholder="email@example.com"
// 						keyboardType="email-address"
// 						textContentType="emailAddress"
// 						returnKeyType="done"
// 						onSubmitEditing={submit}
// 					/>
// 				</View>
// 
// 				{error ? <Text style={authStyles.error}>{error}</Text> : null}
// 
// 				<AuthFormSubmit
// 					buttonTitle="Send code"
// 					isLoading={requestMutation.isPending}
// 					submit={submit}
// 				/>
// 
// 				<Pressable
// 					onPress={() => router.replace(AUTH_PATHS.LOGIN)}
// 					style={authStyles.forgot}
// 				>
// 					<Text style={authStyles.forgotText}>Back to login</Text>
// 				</Pressable>
// 			</View>
// 		</Pressable>
// 	)
// }
