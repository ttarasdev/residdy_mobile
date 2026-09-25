// import { userNotificationsApi } from '@/src/api/user-api/user-notifications/user-notifications.api'
// import { QUERY_KEYS } from '@/src/shared/enums/query-keys.enum'
// import { midnight } from '@/src/shared/styles/constants.styles'
// import { keepPreviousData, useQuery } from '@tanstack/react-query'
// import { Pressable, Image, StyleSheet, View } from 'react-native'
// import PageBlockLoadingData from '../loading-data/LoadingData'
// import { useRouter } from 'expo-router'
// import { INBOX_PATHS } from '@/src/shared/enums/page-paths'
// 
// const CustomHeaderInbox = () => {
// 	const router = useRouter()
// 
// 	const { data, isLoading, error } = useQuery({
// 		queryKey: [QUERY_KEYS.USER_NOTI_UNREAD],
// 		queryFn: userNotificationsApi.unreadCount,
// 		placeholderData: keepPreviousData,
// 	})
// 
// 	if (isLoading)
// 		return (
// 			<View style={styles.inbox}>
// 				<PageBlockLoadingData borderRadius={25} />
// 			</View>
// 		)
// 	if (error || !data)
// 		return (
// 			<View style={styles.inbox}>
// 				<PageBlockLoadingData />
// 			</View>
// 		)
// 
// 	return (
// 		<Pressable
// 			onPress={() => router.replace(INBOX_PATHS.INBOX)}
// 			style={styles.inbox}
// 		>
// 			<Image
// 				source={require('../../../../assets/header_icons/notifications.png')}
// 				style={styles.inboxIcon}
// 			/>
// 			{data.unread > 0 && <View style={styles.unread}></View>}
// 		</Pressable>
// 	)
// }
// 
// const styles = StyleSheet.create({
// 	inbox: {
// 		width: 50,
// 		height: 50,
// 		borderRadius: 25,
// 		backgroundColor: midnight,
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 		position: 'relative',
// 	},
// 	inboxIcon: {
// 		width: 30,
// 		height: 30,
// 	},
// 	unread: {
// 		position: 'absolute',
// 		width: 14,
// 		height: 14,
// 		borderRadius: 7,
// 		backgroundColor: '#B42D2A',
// 		right: 0,
// 		top: 0,
// 	},
// })
// 
// export default CustomHeaderInbox
