// import { useRef, useState } from 'react'
// import { Keyboard, Pressable, Text, TextInput, View } from 'react-native'
// import { useMutation } from '@tanstack/react-query'
// import { useRouter } from 'expo-router'
// 
// import AuthFormInput from '@/src/components/auth/auth-form-input'
// import AuthFormSubmit from '@/src/components/auth/auth-form-submit'
// import AuthSwitcher from '@/src/components/auth/auth-switch-header'
// 
// import { authStyles } from '@/src/shared/styles/auth.styles'
// import { AUTH_PATHS } from '@/src/shared/enums/page-paths'
// import { userAuthApi } from '@/src/api/user-api/user-auth/user-auth.api'
// import AuthFormTop from '@/src/components/auth/auth-form-top'
// 
// export default function RegisterScreen() {
// 	const router = useRouter()
// 
// 	const [email, setEmail] = useState('')
// 	const [password, setPassword] = useState('')
// 	const [error, setError] = useState<string | null>(null)
// 
// 	const passwordRef = useRef<TextInput | null>(null)
// 
// 	const registerMutation = useMutation({
// 		mutationFn: () =>
// 			userAuthApi.register({
// 				email: email.trim(),
// 				password,
// 			}),
// 		onSuccess: () => {
// 			const e = encodeURIComponent(email.trim())
// 			router.push(`${AUTH_PATHS.REGISTER_CONFIRM}?email=${e}`)
// 		},
// 		onError: (e) => {
// 			setError((e as Error).message || 'Register failed')
// 		},
// 	})
// 
// 	const submit = () => {
// 		Keyboard.dismiss()
// 		setError(null)
// 
// 		const e = email.trim()
// 		if (!e || !password) {
// 			setError('Enter email and password')
// 			return
// 		}
// 
// 		registerMutation.mutate()
// 	}
// 
// 	return (
// 		<Pressable style={authStyles.container} onPress={Keyboard.dismiss}>
// 			<View style={authStyles.page}>
// 				<AuthFormTop
// 					title="Create account"
// 					subtitle="Sign up to get started, please enter your details"
// 				/>
// 				<AuthSwitcher />
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
// 						returnKeyType="next"
// 						onSubmitEditing={() => passwordRef.current?.focus()}
// 					/>
// 
// 					<AuthFormInput
// 						iconPath={require('../../../assets/auth/key_black.png')}
// 						activeIconPath={require('../../../assets/auth/key_blue.png')}
// 						labelTitle="Password"
// 						value={password}
// 						onChange={(v) => {
// 							setPassword(v)
// 							if (error) setError(null)
// 						}}
// 						placeholder="Password1234."
// 						secureTextEntry
// 						textContentType="newPassword"
// 						returnKeyType="done"
// 						onSubmitEditing={submit}
// 						inputRef={passwordRef}
// 					/>
// 				</View>
// 
// 				{error ? <Text style={authStyles.error}>{error}</Text> : null}
// 
// 				<AuthFormSubmit
// 					buttonTitle="Register"
// 					isLoading={registerMutation.isPending}
// 					submit={submit}
// 				/>
// 			</View>
// 		</Pressable>
// 	)
// }
