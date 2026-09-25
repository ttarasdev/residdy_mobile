// import { useRef, useState } from 'react'
// import { Keyboard, Pressable, Text, TextInput, View } from 'react-native'
// import { useMutation } from '@tanstack/react-query'
// import { useLocalSearchParams, useRouter } from 'expo-router'
// import AuthFormInput from '@/src/components/auth/auth-form-input'
// import AuthFormSubmit from '@/src/components/auth/auth-form-submit'
// import { authStyles } from '@/src/shared/styles/auth.styles'
// import { userResetApi } from '@/src/api/user-api/user-reset/user-reset.api'
// import { AUTH_PATHS } from '@/src/shared/enums/page-paths'
// 
// export default function ResetConfirmScreen() {
// 	const router = useRouter()
// 	const params = useLocalSearchParams<{ email?: string }>()
// 	const email = typeof params.email === 'string' ? params.email : ''
// 
// 	const [code, setCode] = useState('')
// 	const [newPassword, setNewPassword] = useState('')
// 	const [error, setError] = useState<string | null>(null)
// 
// 	const passwordRef = useRef<TextInput | null>(null)
// 
// 	const confirmMutation = useMutation({
// 		mutationFn: () =>
// 			userResetApi.confirm({
// 				email,
// 				code,
// 				newPassword,
// 			}),
// 		onSuccess: () => {
// 			router.replace(AUTH_PATHS.LOGIN)
// 		},
// 		onError: (e) => {
// 			setError((e as Error).message || 'Reset confirm failed')
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
// 		if (!newPassword) {
// 			setError('Enter new password')
// 			return
// 		}
// 
// 		confirmMutation.mutate()
// 	}
// 
// 	return (
// 		<Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
// 			<View style={authStyles.container}>
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
// 						returnKeyType="next"
// 						onSubmitEditing={() => passwordRef.current?.focus()}
// 					/>
// 
// 					<AuthFormInput
// 						iconPath={require('../../../../assets/auth/key_black.png')}
// 						activeIconPath={require('../../../../assets/auth/key_blue.png')}
// 						labelTitle="New password"
// 						value={newPassword}
// 						onChange={(v) => {
// 							setNewPassword(v)
// 							if (error) setError(null)
// 						}}
// 						placeholder="NewPassword123."
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
// 					buttonTitle="Set new password"
// 					isLoading={confirmMutation.isPending}
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
