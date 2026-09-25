// import { useRef, useState } from 'react'
// import { Keyboard, Pressable, Text, TextInput, View } from 'react-native'
// import { useMutation, useQueryClient } from '@tanstack/react-query'
// import { useRouter } from 'expo-router'
// import AuthFormInput from '@/src/components/auth/auth-form-input'
// import AuthFormSubmit from '@/src/components/auth/auth-form-submit'
// import AuthSwitcher from '@/src/components/auth/auth-switch-header'
// import { authStyles } from '@/src/shared/styles/auth.styles'
// import { userAuthApi } from '@/src/api/user-api/user-auth/user-auth.api'
// import { setAccessToken } from '@/src/api/access-token'
// import AuthFormTop from '@/src/components/auth/auth-form-top'
// import { AUTH_PATHS, TABS_PATHS } from '@/src/shared/enums/page-paths'
// import { QUERY_KEYS_USER } from '@/src/shared/enums/query-keys.enum'
// 
// export default function LoginScreen() {
// 	const router = useRouter()
// 
// 	const [email, setEmail] = useState('')
// 	const [password, setPassword] = useState('')
// 	const [error, setError] = useState<string | null>(null)
// 
// 	const passwordRef = useRef<TextInput | null>(null)
// 
// 	const queryClient = useQueryClient()
// 
// 	const loginMutation = useMutation({
// 		mutationFn: () =>
// 			userAuthApi.login({
// 				email: email.trim(),
// 				password,
// 			}),
// 		onSuccess: async (data) => {
// 			await setAccessToken(data.token)
// 			queryClient.invalidateQueries({
// 				queryKey: [QUERY_KEYS_USER.CHANGE_MY_LANGUAGE],
// 			})
// 			queryClient.invalidateQueries({
// 				queryKey: [QUERY_KEYS_USER.ME],
// 			})
// 			router.replace(TABS_PATHS.HOME)
// 		},
// 		onError: (e) => {
// 			setError((e as Error).message || 'Login failed')
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
// 		loginMutation.mutate()
// 	}
// 
// 	return (
// 		<Pressable style={authStyles.container} onPress={Keyboard.dismiss}>
// 			<View style={authStyles.page}>
// 				<AuthFormTop
// 					title="Welcome Back"
// 					subtitle="Welcome back, Please enter Your details"
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
// 						textContentType="password"
// 						returnKeyType="done"
// 						onSubmitEditing={submit}
// 						inputRef={passwordRef}
// 					/>
// 				</View>
// 
// 				{error ? <Text style={authStyles.error}>{error}</Text> : null}
// 
// 				<AuthFormSubmit
// 					buttonTitle="Login"
// 					isLoading={loginMutation.isPending}
// 					submit={submit}
// 				/>
// 
// 				{error ? (
// 					<Pressable
// 						onPress={() => router.push(AUTH_PATHS.RESET)}
// 						style={authStyles.forgot}
// 					>
// 						<Text style={authStyles.forgotText}>
// 							Forgot password?
// 						</Text>
// 					</Pressable>
// 				) : null}
// 			</View>
// 		</Pressable>
// 	)
// }
