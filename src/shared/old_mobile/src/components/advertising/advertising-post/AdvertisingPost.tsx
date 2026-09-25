// import { partnersBannersApi } from '@/src/api/partners-api/partners-banners/partners-banners.api'
// import {
// 	PartnerBanner,
// 	PartnerBannerType,
// } from '@/src/api/partners-api/partners-banners/partners-banners.types'
// import { ADVERTISING_QUERY_KEYS } from '@/src/shared/enums/query-keys.enum'
// import { keepPreviousData, useQuery } from '@tanstack/react-query'
// import { Pressable, StyleSheet, View, Text, Linking } from 'react-native'
// import PageBlockLoadingData from '../../features-components/loading-data/LoadingData'
// import { getCurrentLanguage } from '@/src/i18n'
// import { Languages } from '@/src/shared/enums/languages.enum'
// import { PublicPhotoAsset } from '../../features-components/jwt-images/PublicPhotoAsset'
// import PartnerHeader from '../../partners/partner-header/PartnerHeader'
// import { BlurView } from 'expo-blur'
// import { useTranslation } from '@/node_modules/react-i18next'
// import { Image } from 'expo-image'
// 
// const AdvertisingPost = () => {
// 	const lan = getCurrentLanguage()
// 	const { t } = useTranslation()
// 
// 	const getSubtitle = (slide: PartnerBanner) => {
// 		if (lan === Languages.EN) return slide.subtitleEn
// 		if (lan === Languages.PL) return slide.subtitlePl
// 		if (lan === Languages.RU) return slide.subtitleRu
// 		return slide.subtitleUa
// 	}
// 
// 	const { data, isLoading, error } = useQuery({
// 		queryKey: [ADVERTISING_QUERY_KEYS.POST, PartnerBannerType.BIG, 1],
// 		queryFn: partnersBannersApi.getRandomBig,
// 		placeholderData: keepPreviousData,
// 		staleTime: 0,
// 		refetchOnMount: 'always',
// 	})
// 
// 	if (isLoading) return <PageBlockLoadingData height={100} />
// 	if (error || !data) {
// 		return <PageBlockLoadingData height={100} />
// 	}
// 
// 	return (
// 		<Pressable
// 			onPress={() => {
// 				if (data.linkUrl) {
// 					Linking.openURL(data.linkUrl).catch(() => undefined)
// 				}
// 			}}
// 			style={styles.post}
// 		>
// 			<View style={styles.postHeader}>
// 				<PartnerHeader partnerId={data.partnerId} />
// 			</View>
// 			<PublicPhotoAsset
// 				url={data.photo.url}
// 				alt={data.photo.originalName}
// 				width={'100%'}
// 				height={'100%'}
// 				contentFit="cover"
// 			/>
// 			<BlurView intensity={20} tint="light" style={styles.info}>
// 				<View style={styles.infoHeader}>
// 					<Text style={styles.infoTitle}>{getSubtitle(data)}</Text>
// 					<Text style={styles.infoAdv}>{t('advertising.adv')}</Text>
// 				</View>
// 				<View style={styles.infoFooter}>
// 					<Text style={styles.infoFooterText}>
// 						{t('advertising.follow')}
// 					</Text>
// 					<Image
// 						style={styles.infoFooterIcon}
// 						source={require('@/assets/system_icons/next.png')}
// 					/>
// 				</View>
// 			</BlurView>
// 		</Pressable>
// 	)
// }
// 
// const styles = StyleSheet.create({
// 	post: {
// 		width: '100%',
// 		height: 500,
// 		borderRadius: 25,
// 		overflow: 'hidden',
// 		position: 'relative',
// 	},
// 	postHeader: {
// 		position: 'absolute',
// 		left: 10,
// 		top: 10,
// 		zIndex: 1,
// 	},
// 	info: {
// 		position: 'absolute',
// 		bottom: 0,
// 		justifyContent: 'space-between',
// 		height: 130,
// 		width: '100%',
// 		padding: 10,
// 		backgroundColor: 'rgba(0,0,0,0.06)',
// 	},
// 	infoHeader: {
// 		flexDirection: 'row',
// 		justifyContent: 'space-between',
// 		alignItems: 'flex-start',
// 		gap: 10,
// 	},
// 	infoTitle: {
// 		flex: 1,
// 		flexShrink: 1,
// 		color: 'white',
// 		fontSize: 18,
// 		fontWeight: '600',
// 	},
// 	infoAdv: {
// 		flexShrink: 0,
// 		paddingVertical: 7,
// 		paddingHorizontal: 16,
// 		borderRadius: 20,
// 		color: 'white',
// 		fontSize: 16,
// 		backgroundColor: 'rgba(200, 200, 200, 0.21)',
// 	},
// 	infoFooter: {
// 		flexDirection: 'row',
// 		justifyContent: 'space-between',
// 		alignItems: 'center',
// 	},
// 	infoFooterText: {
// 		color: 'white',
// 	},
// 	infoFooterIcon: {
// 		width: 14,
// 		height: 14,
// 	},
// })
// 
// export default AdvertisingPost
