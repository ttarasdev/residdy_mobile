// import { Text, View } from 'react-native'
// import { Image } from 'expo-image'
// import { useQuery } from '@tanstack/react-query'
// import { userAssetsApi } from '@/src/api/media-api/user-assets/user-assets.api'
// import { API_URL } from '@/src/shared/config/env'
// import { QUERY_KEYS } from '@/src/shared/enums/query-keys.enum'
// import PageBlockLoadingData from '../loading-data/LoadingData'
// 
// type Props = {
// 	assetId: number
// 	width: number
// 	height: number
// 	alt?: string
// 	contentFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
// }
// 
// export function UserPhotoAsset({
// 	assetId,
// 	width,
// 	height,
// 	alt = '',
// 	contentFit = 'cover',
// }: Props) {
// 	const { data, isLoading, isError } = useQuery({
// 		queryKey: [QUERY_KEYS.SIGNED_URL, 'user', assetId],
// 		queryFn: () => userAssetsApi.getSignedUrl(assetId),
// 		staleTime: 60000,
// 	})
// 
// 	if (isLoading) {
// 		return (
// 			<View style={{ width, height }}>
// 				<PageBlockLoadingData />
// 			</View>
// 		)
// 	}
// 
// 	if (isError || !data?.url) {
// 		return <Text>⚠️</Text>
// 	}
// 
// 	return (
// 		<Image
// 			source={`${API_URL}${data.url}`}
// 			style={{ width, height }}
// 			contentFit={contentFit}
// 			accessibilityLabel={alt}
// 		/>
// 	)
// }
