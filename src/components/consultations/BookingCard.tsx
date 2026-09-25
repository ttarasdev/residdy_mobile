import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import type { ConsultationBooking } from '../../api/models'
import useApi from '../../shared/hooks/useApi'
import GlassCard from '../shared/cards/GlassCard'
import Text from '../shared/typography/Text'
import { contentStyles as s } from '../shared/content/content.styles'
import { dateLabel, timeLabel, localized, money } from './consultation-content'
import SpecialistAvatar from './SpecialistAvatar'
export default function BookingCard({
    booking,
    onPress,
}: {
    booking: ConsultationBooking
    onPress?: () => void
}) {
    const { lan } = useApi()
    const { t, i18n } = useTranslation()
    return (
        <GlassCard onPress={onPress} style={{ gap: 14 }}>
            <Text style={s.small}>
                {dateLabel(booking.startsAt, i18n.language)}
            </Text>
            <View style={[s.row, { justifyContent: 'space-between' }]}>
                <Text style={[s.heading, { fontSize: 38, lineHeight: 48 }]}>
                    {timeLabel(booking.startsAt, i18n.language)}
                </Text>
                <Text style={s.body}>
                    {booking.durationMinutes} min · Online
                </Text>
            </View>
            <Text style={s.heading}>
                {localized(booking.specialistConsultation, 'title', lan) ||
                    t('legalization.consultations')}
            </Text>
            <View style={s.row}>
                <SpecialistAvatar
                    size={44}
                    variantId={booking.specialist?.account?.avatarId}
                />
                <Text style={[s.body, { flex: 1 }]}>
                    {booking.specialist?.name ||
                        t('consultationFlow.specialist')}
                </Text>
                <Text style={s.title}>
                    {money(booking.price, i18n.language)}
                </Text>
            </View>
            <Text style={s.small}>
                {t(`consultationFlow.status.${booking.status}`)}
            </Text>
        </GlassCard>
    )
}
