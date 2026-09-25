import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import type { ConsultationSlot } from '../../api/models'
import useApi from '../../shared/hooks/useApi'
import NavyCard from '../shared/cards/NavyCard'
import Text from '../shared/typography/Text'
import { contentStyles as s } from '../shared/content/content.styles'
import SpecialistAvatar from './SpecialistAvatar'
import { localized, money, timeLabel } from './consultation-content'

export default function ConsultationSlotCard({
    slot,
    onSelect,
}: {
    slot: ConsultationSlot
    onSelect: () => void
}) {
    const { lan } = useApi()
    const { t, i18n } = useTranslation()
    const offer = slot.specialistConsultation
    const specialist = offer?.specialist
    return (
        <NavyCard
            onPress={onSelect}
            padding={16}
            radius={22}
            backgroundColor="#243B4B"
            borderWidth={1}
            borderColor="rgba(255,255,255,0.08)"
            style={{ gap: 14 }}
        >
            <View style={s.row}>
                <SpecialistAvatar
                    size={52}
                    variantId={specialist?.account?.avatarId}
                />
                <View style={{ flex: 1, gap: 3 }}>
                    <Text style={s.title}>
                        {specialist?.name || t('consultationFlow.specialist')}
                    </Text>
                    <Text numberOfLines={1} style={s.small}>
                        {[
                            specialist?.rating ? `★ ${specialist.rating}` : '',
                            offer?.lans?.join(' · '),
                        ]
                            .filter(Boolean)
                            .join(' · ')}
                    </Text>
                </View>
                <Text style={s.title}>
                    {money(offer?.price ?? 0, i18n.language)}
                </Text>
            </View>
            <Text
                numberOfLines={2}
                style={[s.title, { fontSize: 15, lineHeight: 21 }]}
            >
                {localized(offer, 'title', lan)}
            </Text>
            <View style={[s.row, { justifyContent: 'space-between' }]}>
                <Text style={s.small}>
                    {offer?.durationMinutes} min · Online
                </Text>
                <View style={{ minHeight: 38, borderRadius: 19, paddingHorizontal: 22, justifyContent: 'center', backgroundColor: 'rgba(182,209,229,0.16)' }}>
                    <Text style={s.title}>{timeLabel(slot.startsAt, i18n.language)}</Text>
                </View>
            </View>
        </NavyCard>
    )
}
