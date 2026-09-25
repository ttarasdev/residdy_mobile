// import { clearAccessToken } from '@/src/api/access-token'
// import { useRouter } from 'expo-router'
// import { Pressable, Text } from 'react-native'
// 
// const LOGIN = '/(public)/login/login'
// 
// export function LogoutButton() {
// 	const router = useRouter()
// 
// 	const logout = async () => {
// 		await clearAccessToken()
// 		router.replace(LOGIN)
// 	}
// 
// 	return (
// 		<Pressable
// 			onPress={logout}
// 			style={{
// 				marginTop: 12,
// 				paddingHorizontal: 16,
// 				paddingVertical: 12,
// 				borderRadius: 12,
// 				backgroundColor: '#b00020',
// 			}}
// 		>
// 			<Text style={{ color: '#fff', fontSize: 16, fontWeight: '700' }}>
// 				Logout
// 			</Text>
// 		</Pressable>
// 	)
// }
