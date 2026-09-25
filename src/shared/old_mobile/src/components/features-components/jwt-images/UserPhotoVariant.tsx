// import { Text, View } from 'react-native'
// import { useQuery } from '@tanstack/react-query'
// import { userVariantsApi } from '@/src/api/media-api/user-variants/user-variants.api'
// import { UserPhotoAsset } from './UserPhotoAsset'
// import { QUERY_KEYS } from '@/src/shared/enums/query-keys.enum'
// 
// export enum VariantSize {
// 	SMALL = 'small',
// 	MEDIUM = 'medium',
// 	LARGE = 'large',
// }
// 
// type Props = {
// 	variantId: number
// 	size?: VariantSize
// 	width: number
// 	height: number
// 	alt?: string
// 	contentFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
// }
// 
// export function UserPhotoVariant({
// 	variantId,
// 	size = VariantSize.SMALL,
// 	width,
// 	height,
// 	alt = '',
// 	contentFit = 'cover',
// }: Props) {
// 	const { data, isLoading, isError } = useQuery({
// 		queryKey: [QUERY_KEYS.MEDIA_VARIANTS, 'user', variantId],
// 		queryFn: () => userVariantsApi.getById(variantId),
// 		staleTime: 60000,
// 	})
// 
// 	if (isLoading) {
// 		return <View style={{ width, height }} />
// 	}
// 
// 	if (isError || !data) {
// 		return <Text>⚠️</Text>
// 	}
// 
// 	const assetId =
// 		size === VariantSize.SMALL
// 			? data.smallAsset?.id
// 			: size === VariantSize.LARGE
// 			? data.largeAsset?.id
// 			: data.mediumAsset?.id
// 
// 	if (!assetId) {
// 		return <Text>⚠️</Text>
// 	}
// 
// 	return (
// 		<UserPhotoAsset
// 			assetId={assetId}
// 			width={width}
// 			height={height}
// 			alt={alt}
// 			contentFit={contentFit}
// 		/>
// 	)
// }
