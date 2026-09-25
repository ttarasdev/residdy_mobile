// import { companyVariantsApi } from '@/src/api/media-api/company-variants/company-variants.api'
// import { QUERY_KEYS } from '@/src/shared/enums/query-keys.enum'
// import { useQuery } from '@tanstack/react-query'
// import { DimensionValue, Text, View } from 'react-native'
// import { CompanyPhotoAsset } from './CompanyPhotoAsset'
// 
// export enum CompanyVariantSize {
// 	SMALL = 'small',
// 	MEDIUM = 'medium',
// 	LARGE = 'large',
// }
// 
// type Props = {
// 	variantId: number
// 	size?: CompanyVariantSize
// 	width: DimensionValue
// 	height: DimensionValue
// 	borderRadius?: number
// 	alt?: string
// 	contentFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
// }
// 
// export function CompanyPhotoVariant({
// 	variantId,
// 	size = CompanyVariantSize.SMALL,
// 	width,
// 	height,
// 	alt = '',
// 	borderRadius,
// 	contentFit = 'cover',
// }: Props) {
// 	const { data, isLoading, isError } = useQuery({
// 		queryKey: [QUERY_KEYS.MEDIA_VARIANTS, 'company', variantId],
// 		queryFn: () => companyVariantsApi.getById(variantId),
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
// 		size === CompanyVariantSize.SMALL
// 			? data.smallAsset?.id
// 			: size === CompanyVariantSize.LARGE
// 			? data.largeAsset?.id
// 			: data.mediumAsset?.id
// 
// 	if (!assetId) {
// 		return <Text>⚠️</Text>
// 	}
// 
// 	return (
// 		<CompanyPhotoAsset
// 			assetId={assetId}
// 			width={width}
// 			height={height}
// 			borderRadius={borderRadius}
// 			alt={alt}
// 			contentFit={contentFit}
// 		/>
// 	)
// }
