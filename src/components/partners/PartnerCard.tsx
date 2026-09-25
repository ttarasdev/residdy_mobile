import { useRef } from 'react'
import { BlurTargetView } from 'expo-blur'
import { StyleSheet, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import type { PartnerCompany } from '../../api/models'
import useApi from '../../shared/hooks/useApi'
import Card from '../shared/cards/Card'
import GlassCard from '../shared/cards/GlassCard'
import PrivateImage from '../shared/media/PrivateImage'
import Text from '../shared/typography/Text'
import { contentStyles as s } from '../shared/content/content.styles'
import { partnerText } from './partner-content'

export default function PartnerCard({ company, onPress }: { company: PartnerCompany; onPress?: () => void }) {
    const target = useRef<View | null>(null)
    const { lan } = useApi()
    const { t } = useTranslation()
    const summary = partnerText(company.info, 'shortDescription', lan)
    return <Card padding={0} radius={28} onPress={onPress} accessibilityLabel={onPress ? `${company.companyName}. ${t('partnersUi.details')}` : undefined} borderWidth={1} borderColor="rgba(255,255,255,0.18)">
        <BlurTargetView ref={target} style={styles.photo}>
            <PrivateImage variantId={company.info?.mainPhotoId} size="large" resizeMode="cover" style={StyleSheet.absoluteFill} />
        </BlurTargetView>
        <GlassCard blurTarget={target} intensity={45} tint="dark" radius={0} borderWidth={0} padding={18} backgroundColor="rgba(20,39,55,0.4)" style={styles.footer}>
            <View style={s.row}>
                {!!company.logoId && <View style={styles.logo}>
                    <PrivateImage variantId={company.logoId} size="small" resizeMode="contain" style={StyleSheet.absoluteFill} />
                </View>}
                <Text accessibilityRole="header" style={[s.heading, { flex: 1 }]}>{company.companyName}</Text>
            </View>
            {!!summary && <Text numberOfLines={onPress ? 2 : undefined} style={s.body}>{summary}</Text>}
        </GlassCard>
    </Card>
}
const styles = StyleSheet.create({
    photo: { height: 400, backgroundColor: '#385B77', alignItems: 'center', justifyContent: 'center' },
    footer: { marginTop: -116, minHeight: 116, gap: 10 },
    logo: { width: 48, height: 48, borderRadius: 15, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
})
