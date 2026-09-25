// import CloseButton from '@/src/components/features-components/buttons/close-button'
// import WhitePage from '@/src/components/features-components/page-containers/white-page/white-page'
// import { TABS_PATHS } from '@/src/shared/enums/page-paths'
// import { Stack, useRouter } from 'expo-router'
// import { StyleSheet, View } from 'react-native'
// 
// export default function Layout() {
// 	const router = useRouter()
// 
// 	const handleBack = () => {
// 		if (router.canGoBack()) {
// 			router.back()
// 			return
// 		}
// 
// 		router.replace(TABS_PATHS.HOME)
// 	}
// 
// 	return (
// 		<WhitePage>
// 			<View style={s.topBar}>
// 				<CloseButton onClose={handleBack} />
// 			</View>
// 			<View style={s.content}>
// 				<Stack
// 					screenOptions={{
// 						headerShown: false,
// 					}}
// 				/>
// 			</View>
// 		</WhitePage>
// 	)
// }
// 
// const s = StyleSheet.create({
// 	topBar: {
// 		width: '100%',
// 		flexDirection: 'row',
// 		alignItems: 'center',
// 		marginBottom: 12,
// 	},
// 	content: {
// 		flex: 1,
// 	},
// })
