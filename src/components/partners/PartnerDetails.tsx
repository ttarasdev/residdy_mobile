import { useState } from 'react'
import { Image, Linking, Pressable, StyleSheet, View, type ImageSourcePropType } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { partnerCompaniesApi } from '../../api/partner-companies/partner-companies.api'
import useApi from '../../shared/hooks/useApi'
import DetailScreen from '../shared/layout/DetailScreen'
import PrivateImage from '../shared/media/PrivateImage'
import Text from '../shared/typography/Text'
import QueryState from '../shared/content/QueryState'
import Popup from '../shared/feedback/Popup'
import MessageCard from '../shared/feedback/MessageCard'
import { contentStyles as s } from '../shared/content/content.styles'
import { partnerText, partnerWebUrl } from './partner-content'

const globe = require('../../../assets/system_icons/multi/onboarding-globe-white.png')
const socialFields = [
    ['instagramUrl', 'Instagram', require('../../../assets/socials/instagram.png')],
    ['facebookUrl', 'Facebook', require('../../../assets/socials/facebook.png')],
    ['tiktokUrl', 'TikTok', require('../../../assets/socials/tiktok-white.png')],
    ['linkedinUrl', 'LinkedIn', require('../../../assets/socials/linkedin-white.png')],
    ['youtubeUrl', 'YouTube', globe],
    ['telegramUrl', 'Telegram', globe],
] as const

function Contact({ title, value, icon, onPress }: { title: string; value?: string; icon: ImageSourcePropType; onPress: () => void }) {
    return <Pressable accessibilityRole="link" onPress={onPress} accessibilityLabel={`${title}${value ? `: ${value}` : ''}`} style={[s.row, { paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.12)' }]} >
        <View style={{ width: 40, height: 40, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' }}>
            <Image source={icon} style={{ width: 23, height: 23, resizeMode: 'contain' }} />
        </View>
        <View style={{ flex: 1, gap: 3 }}><Text style={s.title}>{title}</Text>{!!value && <Text style={s.body}>{value}</Text>}</View>
        <Image source={require('../../../assets/system_icons/multi/onboarding-arrow-right-white.png')} style={{ width: 18, height: 18, opacity: 0.65 }} />
    </Pressable>
}

export default function PartnerDetails() {
    const { id } = useLocalSearchParams<{ id: string }>()
    const companyId = Number(id)
    const { account, options, lan } = useApi()
    const { t } = useTranslation()
    const [linkError, setLinkError] = useState(false)
    const validId = Number.isSafeInteger(companyId) && companyId > 0
    const query = useQuery({
        queryKey: ['partners', account?.account.id, companyId],
        enabled: validId,
        queryFn: ({ signal }) => partnerCompaniesApi.getOne(companyId, { ...options, signal }),
    })
    const company = query.data
    const summary = partnerText(company?.info, 'shortDescription', lan)
    const description = partnerText(company?.info, 'description', lan)
    const website = partnerWebUrl(company?.info?.websiteUrl)
    async function open(url: string) {
        try { await Linking.openURL(url) } catch { setLinkError(true) }
    }
    return <DetailScreen title={company?.companyName ?? t('partnersUi.partner')}>
        <QueryState loading={validId && query.isPending} error={query.error} retry={() => { void query.refetch() }} empty={!validId ? t('partnersUi.unavailable') : undefined} />
        {company && <>
            <View style={s.row}>
                {!!company.logoId && <PrivateImage variantId={company.logoId} size="small" resizeMode="contain" style={{ width: 56, height: 56, borderRadius: 14 }} />}
                <Text accessibilityRole="header" style={[s.heading, { flex: 1 }]}>{company.companyName}</Text>
            </View>
            {!!summary && <Text style={s.body}>{summary}</Text>}
            {!!company.info?.mainPhotoId && <View style={{ aspectRatio: 1.4, borderRadius: 24, overflow: 'hidden', backgroundColor: 'rgba(255,255,255,0.06)' }}>
                <PrivateImage variantId={company.info.mainPhotoId} size="large" resizeMode="cover" style={StyleSheet.absoluteFill} />
            </View>}
            {!!description && <View style={{ gap: 12 }}>
                <Text accessibilityRole="header" style={s.title}>{t('partnersUi.about')}</Text>
                <Text style={s.body}>{description}</Text>
            </View>}
            {website && <Contact title={t('partnersUi.website')} value={new URL(website).hostname} icon={globe} onPress={() => { void open(website) }} />}
            {!!company.contactEmail && <Contact title={t('partnersUi.email')} value={company.contactEmail} icon={require('../../../assets/system_icons/multi/email-white.png')} onPress={() => { void open(`mailto:${encodeURIComponent(company.contactEmail!)}`) }} />}
            {!!company.phone && <Contact title={t('partnersUi.phone')} value={company.phone} icon={require('../../../assets/system_icons/menu/partners-white.png')} onPress={() => { void open(`tel:${company.phone!.replace(/[^+\d]/g, '')}`) }} />}
            <View style={{ gap: 12 }}>
                {socialFields.map(([field, label, icon]) => {
                    const url = partnerWebUrl(company.info?.[field])
                    return url ? <Contact key={field} title={label} icon={icon} onPress={() => { void open(url) }} /> : null
                })}
            </View>
        </>}
        <Popup visible={linkError} onClose={() => setLinkError(false)}><MessageCard tone="warning" title={t('partnersUi.linkError')} action={{ label: t('feedback.close'), onPress: () => setLinkError(false) }} /></Popup>
    </DetailScreen>
}
