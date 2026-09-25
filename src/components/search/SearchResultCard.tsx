import { ActivityIndicator, Image, StyleSheet, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useTranslation } from 'react-i18next'
import type { SearchItem } from '../../api/search/search.types'
import Card from '../shared/cards/Card'
import Text from '../shared/typography/Text'
import SearchImage from './SearchImage'
import SpecialistAvatar from '../consultations/SpecialistAvatar'
import { publicAssetUrl } from '../../shared/utils/public-asset-url'
import { getApiUrl } from '../../shared/config/api'
import {
    dateLabel,
    money,
    timeLabel,
} from '../consultations/consultation-content'

const icons = {
    case: require('../../../assets/system_icons/multi/onboarding-business-white.png'),
    document: require('../../../assets/system_icons/multi/onboarding-document-white.png'),
    consultation: require('../../../assets/system_icons/multi/onboarding-consultant-white.png'),
    screen: require('../../../assets/system_icons/nav_icons/search-white.png'),
}
export default function SearchResultCard({
    item,
    onPress,
    loading = false,
}: {
    item: SearchItem
    onPress: () => void
    loading?: boolean
}) {
    const { t, i18n } = useTranslation()
    const unavailable = item.type === 'user_document' && !item.available
    const photo =
        item.type === 'blog_post' || item.type === 'partner_company'
            ? item.thumbnail?.assetId
            : undefined
    const iconUrl = 'iconUrl' in item ? item.iconUrl : null
    const icon = item.type.includes('document')
        ? icons.document
        : item.type.includes('case')
          ? icons.case
          : item.type.includes('consultation')
            ? icons.consultation
            : icons.screen
    const title = (
        <Text numberOfLines={2} style={s.title}>
            {item.title}
        </Text>
    )
    if (item.type === 'blog_post')
        return (
            <Card
                onPress={onPress}
                radius={26}
                padding={0}
                height={182}
                backgroundColor="#203A4B"
            >
                <SearchImage assetId={photo} style={StyleSheet.absoluteFill} />
                <LinearGradient
                    colors={['rgba(9,25,39,0)', 'rgba(9,25,39,0.94)']}
                    style={[
                        StyleSheet.absoluteFill,
                        { justifyContent: 'flex-end', padding: 18, gap: 6 },
                    ]}
                >
                    <Text style={s.eyebrow}>
                        {t('search.groups.blog_post')}
                    </Text>
                    {title}
                </LinearGradient>
            </Card>
        )
    if (item.type === 'partner_company')
        return (
            <Card
                onPress={onPress}
                radius={26}
                padding={0}
                backgroundColor="#233C4D"
                borderWidth={1}
                borderColor="rgba(177,214,239,0.14)"
            >
                <View style={{ height: 112, backgroundColor: '#1C3344' }}>
                    <SearchImage
                        assetId={photo}
                        style={{ width: '100%', height: '100%' }}
                    />
                </View>
                <View style={{ padding: 18, gap: 6 }}>
                    {title}
                    {!!item.description && (
                        <Text numberOfLines={2} style={s.subtitle}>
                            {item.description}
                        </Text>
                    )}
                </View>
            </Card>
        )
    const description =
        item.type === 'case'
            ? item.subtitle
            : item.type === 'consultation'
              ? `${item.specialist?.name || ''} · ${item.durationMinutes} min`
              : item.type === 'user_consultation'
                ? `${dateLabel(item.startsAt, i18n.language)} · ${timeLabel(item.startsAt, i18n.language)}`
                : item.type === 'user_case'
                  ? t('search.stage', { number: item.activeStageNo })
                  : item.type === 'user_document'
                    ? unavailable
                        ? t('search.unavailable')
                        : new Date(item.createdAt).toLocaleDateString(
                              i18n.language,
                          )
                    : undefined
    return (
        <Card
            onPress={onPress}
            disabled={unavailable || loading}
            radius={24}
            padding={16}
            backgroundColor={
                item.type === 'screen' ? 'rgba(158,202,232,0.07)' : '#213A4C'
            }
            borderWidth={1}
            borderColor="rgba(171,210,236,0.10)"
            style={{ gap: 12, opacity: unavailable ? 0.5 : 1 }}
        >
            <View style={s.row}>
                {item.type === 'user_consultation' ? (
                    <SpecialistAvatar size={48} variantId={item.avatarId} />
                ) : (
                    <View
                        style={[
                            s.icon,
                            {
                                backgroundColor: item.type.includes('document')
                                    ? 'rgba(116,169,218,0.19)'
                                    : 'rgba(160,209,227,0.12)',
                            },
                        ]}
                    >
                        <Image
                            source={
                                iconUrl
                                    ? {
                                          uri: publicAssetUrl(
                                              iconUrl,
                                              getApiUrl(),
                                          ),
                                      }
                                    : icon
                            }
                            style={{ width: 26, height: 26 }}
                            resizeMode="contain"
                        />
                    </View>
                )}
                <View style={{ flex: 1, gap: 5 }}>
                    {title}
                    {!!description && (
                        <Text numberOfLines={2} style={s.subtitle}>
                            {description}
                        </Text>
                    )}
                </View>
                {loading ? (
                    <ActivityIndicator color="#BDD9EA" />
                ) : (
                    <Text style={s.arrow}>›</Text>
                )}
            </View>
            {item.type === 'consultation' && (
                <Text style={s.price}>{money(item.price, i18n.language)}</Text>
            )}
            {item.type === 'user_consultation' && (
                <Text style={s.eyebrow}>
                    {t(`consultationFlow.status.${item.status}`)}
                </Text>
            )}
        </Card>
    )
}
const s = StyleSheet.create({
    row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    icon: {
        width: 48,
        height: 48,
        borderRadius: 17,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: '#F4F8FC',
        fontSize: 16,
        lineHeight: 23,
        fontFamily: 'Manrope_600SemiBold',
    },
    subtitle: { color: '#A6BDCD', fontSize: 12, lineHeight: 18 },
    eyebrow: { color: '#BDD9EA', fontSize: 11, lineHeight: 16 },
    price: {
        color: '#BDD9EA',
        fontSize: 15,
        fontFamily: 'Manrope_600SemiBold',
        textAlign: 'right',
    },
    arrow: { color: '#9AB9CD', fontSize: 24 },
})
