// import { API_URL } from '@/src/shared/config/env'
// import { Image } from 'expo-image'
// 
// type SizeValue = number | `${number}%`
// 
// type Props = {
// 	url: string
// 	width?: SizeValue
// 	height?: SizeValue
// 	alt?: string
// 	contentFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
// }
// 
// export function PublicPhotoAsset({
// 	url,
// 	width = 40,
// 	height = 40,
// 	alt = '',
// 	contentFit = 'cover',
// }: Props) {
// 	return (
// 		<Image
// 			source={`${API_URL}${url}`}
// 			style={{ width, height }}
// 			contentFit={contentFit}
// 			accessibilityLabel={alt}
// 		/>
// 	)
// }
