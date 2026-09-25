// import { PartnerBanner } from '@/src/api/partners-api/partners-banners/partners-banners.types'
// import { getCurrentLanguage } from '@/src/i18n'
// import { Languages } from '@/src/shared/enums/languages.enum'
// import { midnight } from '@/src/shared/styles/constants.styles'
// import { Linking, Pressable, StyleSheet, Text } from 'react-native'
// import { PublicPhotoAsset } from '../../features-components/jwt-images/PublicPhotoAsset'
// 
// interface Props {
// 	slide: PartnerBanner
// 	width: number
// 	onClick: (id: number) => void
// }
// 
// const AdvertisingSliderItem = ({ slide, width, onClick }: Props) => {
// 	const lan = getCurrentLanguage()
// 
// 	const getSubtitle = () => {
// 		if (lan === Languages.EN) return slide.subtitleEn
// 		if (lan === Languages.PL) return slide.subtitlePl
// 		if (lan === Languages.RU) return slide.subtitleRu
// 
// 		return slide.subtitleUa
// 	}
// 
// 	const handlePress = () => {
// 		onClick(slide.id)
// 
// 		if (slide.linkUrl) {
// 			Linking.openURL(slide.linkUrl).catch(() => undefined)
// 		}
// 	}
// 
// 	return (
// 		<Pressable style={[styles.item, { width }]} onPress={handlePress}>
// 			<Text style={styles.title} numberOfLines={3}>
// 				{getSubtitle()}
// 			</Text>
// 			<PublicPhotoAsset
// 				url={slide.photo.url}
// 				width={110}
// 				height={92}
// 				alt={slide.photo.originalName}
// 				contentFit="cover"
// 			/>
// 		</Pressable>
// 	)
// }
// 
// const styles = StyleSheet.create({
// 	item: {
// 		height: 120,
// 		paddingLeft: 15,
// 		paddingRight: 10,
// 		flexDirection: 'row',
// 		gap: 20,
// 		justifyContent: 'space-between',
// 		alignItems: 'flex-end',
// 		backgroundColor: midnight,
// 	},
// 	title: {
// 		flex: 1,
// 		paddingVertical: 15,
// 		fontWeight: '500',
// 		color: 'white',
// 		fontSize: 16,
// 		lineHeight: 21,
// 		height: '100%',
// 	},
// })
// 
// export default AdvertisingSliderItem
