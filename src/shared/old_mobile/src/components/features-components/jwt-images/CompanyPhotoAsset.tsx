// import { companyAssetsApi } from '@/src/api/media-api/company-assets/company-assets.api'
// import { API_URL } from '@/src/shared/config/env'
// import { QUERY_KEYS } from '@/src/shared/enums/query-keys.enum'
// import { useQuery } from '@tanstack/react-query'
// import { Image } from 'expo-image'
// import { Text, View, type DimensionValue } from 'react-native'
// 
// type Props = {
// 	assetId: number
// 	width: DimensionValue
// 	height: DimensionValue
// 	borderRadius?: number
// 	alt?: string
// 	contentFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
// }
// 
// export function CompanyPhotoAsset({
// 	assetId,
// 	width,
// 	height,
// 	borderRadius = 0,
// 	alt = '',
// 	contentFit = 'cover',
// }: Props) {
// 	const { data, isLoading, isError } = useQuery({
// 		queryKey: [QUERY_KEYS.SIGNED_URL, 'company', assetId],
// 		queryFn: () => companyAssetsApi.getSignedUrl(assetId),
// 		staleTime: 60000,
// 	})
// 
// 	const wrapperStyle = {
// 		width,
// 		height,
// 		borderRadius,
// 		overflow: 'hidden' as const,
// 	}
// 
// 	if (isLoading) {
// 		return <View style={wrapperStyle} />
// 	}
// 
// 	if (isError || !data?.url) {
// 		return <Text>⚠️</Text>
// 	}
// 
// 	return (
// 		<View style={wrapperStyle}>
// 			<Image
// 				source={`${API_URL}${data.url}`}
// 				style={{ width: '100%', height: '100%' }}
// 				contentFit={contentFit}
// 				accessibilityLabel={alt}
// 			/>
// 		</View>
// 	)
// }
