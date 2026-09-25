import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import type { PartnerBanner } from '../../api/models'
import Card from '../shared/cards/Card'
import Text from '../shared/typography/Text'
import PrivateImage from '../shared/media/PrivateImage'
import { bannerContent } from './banner-content'

export default function SmallBannerCard({ banner, onPress }: { banner: PartnerBanner; onPress: () => void }) {
    const { t, i18n } = useTranslation()
    const [ratio, setRatio] = useState(1)
    const { title, subtitle } = bannerContent(banner, i18n.language)
    return <Card padding={0} radius={25} backgroundColor="#344B5D" onPress={onPress}
        accessibilityLabel={`${t('advertising.label')}. ${title}. ${subtitle}`} style={styles.card}>
        <View style={styles.copy}>
            <Text style={styles.title} numberOfLines={2}>{title}</Text>
            <Text style={styles.subtitle} numberOfLines={3}>{subtitle}</Text>
        </View>
        <View style={styles.art}>
            <PrivateImage variantId={banner.photoId} resizeMode="contain" onLoad={event => { const { width, height } = event.nativeEvent.source; if (width && height) setRatio(width / height) }}
                style={[styles.image, { aspectRatio: ratio }]} />
        </View>
    </Card>
}

const styles = StyleSheet.create({
    card: { minHeight: 120, flexDirection: 'row' },
    copy: { width: '65%', padding: 16, paddingRight: 4, gap: 6, justifyContent: 'center' },
    title: { color: '#FFFFFF', fontFamily: 'Manrope_600SemiBold', fontSize: 16, lineHeight: 22 },
    subtitle: { color: '#E6E6E6', fontFamily: 'Manrope_400Regular', fontSize: 14, lineHeight: 20 },
    art: { width: '35%', overflow: 'hidden', justifyContent: 'flex-end' },
    image: { width: '100%', maxHeight: 110, alignSelf: 'flex-end' },
})
