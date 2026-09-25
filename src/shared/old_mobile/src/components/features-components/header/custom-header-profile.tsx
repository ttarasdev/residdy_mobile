// import { Pressable, View, Text } from 'react-native'
// import { useQuery } from '@tanstack/react-query'
// import { QUERY_KEYS_USER } from '@/src/shared/enums/query-keys.enum'
// import { userApi } from '@/src/api/user-api/user/user.api'
// import { midnight } from '@/src/shared/styles/constants.styles'
// import { StyleSheet } from 'react-native'
// import PageBlockLoadingData from '../loading-data/LoadingData'
// import { useState } from 'react'
// import ProfileModal from '../../profile/profile'
// import { UserPhotoVariant, VariantSize } from '../jwt-images/UserPhotoVariant'
// 
// const CustomHeaderProfile = () => {
// 	const [isPopupVisible, setIsPopupVisible] = useState(false)
// 
// 	const { data, isLoading, error } = useQuery({
// 		queryKey: [QUERY_KEYS_USER.ME],
// 		queryFn: () => userApi.me({}),
// 		staleTime: 10_000,
// 	})
// 
// 	if (isLoading)
// 		return (
// 			<View style={styles.avatar}>
// 				<PageBlockLoadingData />
// 			</View>
// 		)
// 	if (error || !data)
// 		return (
// 			<View style={styles.avatar}>
// 				<PageBlockLoadingData />
// 			</View>
// 		)
// 
// 	return (
// 		<Pressable
// 			onPress={() => setIsPopupVisible(true)}
// 			style={styles.avatar}
// 		>
// 			{data.avatar ? (
// 				<UserPhotoVariant
// 					variantId={data.avatar}
// 					size={VariantSize.SMALL}
// 					width={50}
// 					height={50}
// 					alt="ava"
// 					contentFit="cover"
// 				/>
// 			) : (
// 				<View style={styles.noavatar}>
// 					<Text style={styles.noavatarText}>
// 						{data.name?.[0] || ''}
// 					</Text>
// 				</View>
// 			)}
// 			<ProfileModal
// 				visible={isPopupVisible}
// 				onClose={() => setIsPopupVisible(false)}
// 			/>
// 		</Pressable>
// 	)
// }
// 
// const styles = StyleSheet.create({
// 	avatar: {
// 		position: 'relative',
// 		width: 50,
// 		height: 50,
// 		overflow: 'hidden',
// 		borderRadius: 25,
// 		backgroundColor: midnight,
// 	},
// 	noavatar: {
// 		width: 50,
// 		height: 50,
// 		borderRadius: 25,
// 		backgroundColor: midnight,
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 		overflow: 'hidden',
// 	},
// 	noavatarText: {
// 		color: 'white',
// 		fontSize: 16,
// 		fontWeight: '700',
// 		textAlign: 'center',
// 	},
// })
// 
// export default CustomHeaderProfile
