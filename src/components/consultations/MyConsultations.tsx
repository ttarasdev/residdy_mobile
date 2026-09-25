import { useState } from 'react'
import { View } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'expo-router'
import useApi from '../../shared/hooks/useApi'
import { consultationBookingsApi } from '../../api/consultation-bookings/consultation-bookings.api'
import QueryState from '../shared/content/QueryState'
import Text from '../shared/typography/Text'
import Button from '../shared/buttons/Button'
import { contentStyles as s } from '../shared/content/content.styles'
import BookingCard from './BookingCard'
import { allPages } from './consultation-content'
export default function MyConsultations({ full = false }: { full?: boolean }) {
    const { account, options } = useApi()
    const { t } = useTranslation()
    const router = useRouter()
    const [history, setHistory] = useState(false)
    const query = useQuery({
        queryKey: ['my-consultations', account?.account.id],
        queryFn: ({ signal }) =>
            allPages((offset) =>
                consultationBookingsApi.findMy(
                    { offset, limit: 100 },
                    { ...options, signal },
                ),
            ),
    })
    const rows = (query.data ?? [])
        .filter((item) => {
            const upcoming =
                ['paid', 'awaiting_payment'].includes(item.status) &&
                new Date(item.endsAt).getTime() > Date.now()
            return full && history ? !upcoming : upcoming
        })
        .sort(
            (a, b) =>
                (history ? -1 : 1) *
                    (Date.parse(a.startsAt) - Date.parse(b.startsAt)) ||
                (history ? b.id - a.id : a.id - b.id),
        )
    if (!full && query.isSuccess && !rows.length) return null
    return (
        <View style={{ gap: 16, marginVertical: full ? 0 : 24 }}>
            <Text style={s.heading}>{t('consultationsUi.mine')}</Text>
            {full && (
                <View style={s.row}>
                    {[false, true].map((value) => (
                        <Button
                            key={String(value)}
                            height={40}
                            radius={20}
                            padding={20}
                            backgroundColor={
                                history === value
                                    ? 'rgba(255,255,255,0.22)'
                                    : 'rgba(255,255,255,0.06)'
                            }
                            onPress={() => setHistory(value)}
                        >
                            {t(
                                value
                                    ? 'consultationFlow.history'
                                    : 'consultationFlow.upcoming',
                            )}
                        </Button>
                    ))}
                </View>
            )}
            <QueryState
                loading={query.isPending}
                error={query.error}
                retry={() => {
                    void query.refetch()
                }}
                empty={
                    full && query.isSuccess && !rows.length
                        ? t('consultationsUi.empty')
                        : undefined
                }
            />
            {(full ? rows : rows.slice(0, 2)).map((item) => (
                <BookingCard
                    key={item.id}
                    booking={item}
                    onPress={() =>
                        router.push(`/consultations/booking?id=${item.id}`)
                    }
                />
            ))}
        </View>
    )
}
