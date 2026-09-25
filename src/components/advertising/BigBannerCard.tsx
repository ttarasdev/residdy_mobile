import { useRef } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { BlurTargetView, BlurView } from 'expo-blur'
import { useTranslation } from 'react-i18next'
import type { PartnerBanner } from '../../api/models'
import Card from '../shared/cards/Card'
import Text from '../shared/typography/Text'
import PrivateImage from '../shared/media/PrivateImage'
import useAccessibilityPreferences from '../../shared/hooks/useAccessibilityPreferences'
import { bannerContent } from './banner-content'

export default function BigBannerCard({ banner, onPress }: { banner: PartnerBanner; onPress: () => void }) {
    const { t, i18n } = useTranslation()
    const { title, subtitle } = bannerContent(banner, i18n.language)
    const target = useRef<View>(null)
    const { reduceTransparency } = useAccessibilityPreferences()
    return <Card padding={0} radius={28} backgroundColor="#243B4B" onPress={onPress}
        accessibilityLabel={`${t('advertising.label')}. ${title}. ${subtitle}`} style={styles.card}>
        <BlurTargetView ref={target} style={StyleSheet.absoluteFill}>
            <PrivateImage variantId={banner.photoId} size="large" resizeMode="cover" style={StyleSheet.absoluteFill} />
        </BlurTargetView>
        {banner.company?.companyName && <View style={styles.company}>
            {banner.company.logoId && <PrivateImage variantId={banner.company.logoId} size="small" style={styles.logo} />}
            <Text style={styles.companyName} numberOfLines={1}>{banner.company.companyName}</Text>
        </View>}
        <View style={[styles.footer, reduceTransparency && { backgroundColor: '#243B4B' }]}>
            {!reduceTransparency && <BlurView style={StyleSheet.absoluteFill} blurTarget={target}
                blurMethod="dimezisBlurViewSdk31Plus" tint="dark" intensity={35} />}
            <View style={styles.heading}>
                <Text style={styles.title} numberOfLines={2}>{title}</Text>
                <View style={styles.badge}><Text style={styles.badgeText}>{t('advertising.label')}</Text></View>
            </View>
            <View style={styles.bottom}>
                <Text style={styles.subtitle} numberOfLines={4}>{subtitle}</Text>
                <Image source={require('../../../assets/system_icons/nav_icons/chevron-right-white.png')} style={styles.arrow} />
            </View>
        </View>
    </Card>
}

const styles = StyleSheet.create({
    card: { aspectRatio: 37 / 50, justifyContent: 'space-between' },
    company: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 16 },
    logo: { width: 28, height: 28, borderRadius: 14 },
    companyName: { flex: 1, color: '#FFFFFF', fontFamily: 'Manrope_400Regular', fontSize: 14, textShadowColor: '#111D25', textShadowRadius: 5 },
    footer: { marginTop: 'auto', minHeight: 130, padding: 16, gap: 24, backgroundColor: 'rgba(17,29,37,0.28)', overflow: 'hidden' },
    heading: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
    title: { flex: 1, color: '#FFFFFF', fontFamily: 'Manrope_600SemiBold', fontSize: 20, lineHeight: 27 },
    badge: { borderRadius: 14, paddingHorizontal: 10, paddingVertical: 5, backgroundColor: 'rgba(255,255,255,0.12)' },
    badgeText: { color: '#FFFFFF', fontFamily: 'Manrope_400Regular', fontSize: 11 },
    bottom: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    subtitle: { flex: 1, color: '#FFFFFF', fontFamily: 'Manrope_400Regular', fontSize: 14, lineHeight: 20 },
    arrow: { width: 26, height: 26 },
})
