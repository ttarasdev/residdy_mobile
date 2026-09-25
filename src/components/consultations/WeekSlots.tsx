import { useState } from 'react'
import { View } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import type { ConsultationSlot } from '../../api/models'
import useApi from '../../shared/hooks/useApi'
import { consultationSlotsApi } from '../../api/consultation-slots/consultation-slots.api'
import { consultationBookingsApi } from '../../api/consultation-bookings/consultation-bookings.api'
import GlassCard from '../shared/cards/GlassCard'
import Button from '../shared/buttons/Button'
import Text from '../shared/typography/Text'
import QueryState from '../shared/content/QueryState'
import { contentStyles as s } from '../shared/content/content.styles'
import ConsultationSlotCard from './ConsultationSlotCard'
import {
    allPages,
    weekStart,
    addDays,
    warsawDay,
    dateLabel,
} from './consultation-content'

export default function WeekSlots({
    categoryId,
    serviceId,
    bookingId,
    onSelect,
}: {
    categoryId?: number
    serviceId?: number
    bookingId?: number
    onSelect?: (slot: ConsultationSlot) => void
}) {
    const [week, setWeek] = useState(weekStart)
    const { account, options } = useApi()
    const { t, i18n } = useTranslation()
    const router = useRouter()
    const query = useQuery({
        queryKey: [
            'consultation-slots',
            account?.account.id,
            week,
            categoryId,
            serviceId,
            bookingId,
        ],
        queryFn: ({ signal }) =>
            allPages((offset) =>
                bookingId
                    ? consultationBookingsApi.rescheduleSlots(
                          bookingId,
                          { weekStart: week, offset, limit: 100 },
                          { ...options, signal },
                      )
                    : consultationSlotsApi.findPublic(
                          {
                              weekStart: week,
                              consultationCategoryId: categoryId,
                              specialistConsultationId: serviceId,
                              offset,
                              limit: 100,
                          },
                          { ...options, signal },
                      ),
            ),
    })
    const days = [
        ...new Set(
            query.data?.map((slot) => warsawDay(new Date(slot.startsAt))),
        ),
    ].sort()
    return (
        <View style={{ gap: 20 }}>
            <GlassCard padding={8} radius={20} style={s.row}>
                <Button
                    height={40}
                    padding={12}
                    disabled={week <= weekStart()}
                    accessibilityLabel={t('consultationFlow.previousWeek')}
                    onPress={() => setWeek(addDays(week, -7))}
                >
                    ‹
                </Button>
                <Text style={[s.body, { flex: 1, textAlign: 'center' }]}>
                    {dateLabel(week, i18n.language)} —{' '}
                    {dateLabel(addDays(week, 6), i18n.language)}
                </Text>
                <Button
                    height={40}
                    padding={12}
                    accessibilityLabel={t('consultationFlow.nextWeek')}
                    onPress={() => setWeek(addDays(week, 7))}
                >
                    ›
                </Button>
            </GlassCard>
            <Text style={s.small}>{t('consultationFlow.warsaw')}</Text>
            <QueryState
                loading={query.isPending}
                error={query.error}
                retry={() => {
                    void query.refetch()
                }}
                empty={
                    query.isSuccess && !query.data.length
                        ? t('consultationFlow.noSlots')
                        : undefined
                }
            />
            {days.map((day) => {
                const slots = query.data!.filter(
                    (slot) => warsawDay(new Date(slot.startsAt)) === day,
                )
                return (
                    <View key={day} style={{ gap: 14 }}>
                        <Text style={s.title}>
                            {day === addDays(warsawDay(), 1)
                                ? `${t('consultationFlow.tomorrow')} · `
                                : ''}
                            {dateLabel(day, i18n.language)}
                        </Text>
                        {slots.map((slot) => (
                            <ConsultationSlotCard
                                key={slot.id}
                                slot={slot}
                                onSelect={() =>
                                    onSelect
                                        ? onSelect(slot)
                                        : router.push(
                                              `/consultations/book?service=${slot.specialistConsultationId}&slot=${slot.id}&week=${week}`,
                                          )
                                }
                            />
                        ))}
                    </View>
                )
            })}
        </View>
    )
}
