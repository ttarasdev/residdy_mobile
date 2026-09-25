// import { useMemo } from 'react'
// import { Pressable, StyleSheet, Text, View } from 'react-native'
// import { usePathname, useRouter } from 'expo-router'
// import { midnight } from '@/src/shared/styles/constants.styles'
// import { AUTH_PATHS } from '@/src/shared/enums/page-paths'
// 
// export default function AuthSwitcher() {
// 	const router = useRouter()
// 	const pathname = usePathname()
// 
// 	const active = useMemo(() => {
// 		if (pathname.includes('/register')) return 'register'
// 		return 'login'
// 	}, [pathname])
// 
// 	return (
// 		<View style={s.container}>
// 			<Pressable
// 				onPress={() => router.replace(AUTH_PATHS.LOGIN)}
// 				style={[s.button, active === 'login' && s.buttonActive]}
// 			>
// 				<Text style={[s.text, active === 'login' && s.textActive]}>
// 					Sign In
// 				</Text>
// 			</Pressable>
// 			<Pressable
// 				onPress={() => router.replace(AUTH_PATHS.REGISTER)}
// 				style={[s.button, active === 'register' && s.buttonActive]}
// 			>
// 				<Text style={[s.text, active === 'register' && s.textActive]}>
// 					Signup
// 				</Text>
// 			</Pressable>
// 		</View>
// 	)
// }
// 
// const s = StyleSheet.create({
// 	container: {
// 		flexDirection: 'row',
// 		width: '100%',
// 		height: 70,
// 		borderRadius: 18,
// 		padding: 5,
// 		backgroundColor: midnight,
// 	},
// 	button: {
// 		flex: 1,
// 		borderRadius: 15,
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 	},
// 	buttonActive: {
// 		backgroundColor: '#fff',
// 	},
// 	text: {
// 		fontSize: 18,
// 		fontWeight: '500',
// 		color: 'white',
// 	},
// 	textActive: {
// 		color: 'black',
// 	},
// })
