import { useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import type { ConsultationSlot } from '../../api/models'
import useApi from '../../shared/hooks/useApi'
import { consultationBookingsApi } from '../../api/consultation-bookings/consultation-bookings.api'
import DetailScreen from '../shared/layout/DetailScreen'
import QueryState from '../shared/content/QueryState'
import Text from '../shared/typography/Text'
import BlueButton from '../shared/buttons/BlueButton'
import Checkbox from '../shared/inputs/Checkbox'
import { contentStyles as s } from '../shared/content/content.styles'
import BookingCard from './BookingCard'
import WeekSlots from './WeekSlots'
import { dateLabel, timeLabel } from './consultation-content'
export default function ChangeBooking({
    cancel = false,
}: {
    cancel?: boolean
}) {
    const { id } = useLocalSearchParams<{ id: string }>()
    const bookingId = Number(id)
    const { account, options } = useApi()
    const { t, i18n } = useTranslation()
    const router = useRouter()
    const client = useQueryClient()
    const [slot, setSlot] = useState<ConsultationSlot>()
    const [early, setEarly] = useState(false)
    const valid = Number.isSafeInteger(bookingId) && bookingId > 0
    const booking = useQuery({
        queryKey: ['consultation-booking', account?.account.id, bookingId],
        enabled: valid,
        queryFn: ({ signal }) =>
            consultationBookingsApi.findMyOne(bookingId, {
                ...options,
                signal,
            }),
    })
    const actions = useQuery({
        queryKey: ['consultation-actions', account?.account.id, bookingId],
        enabled: valid,
        queryFn: ({ signal }) =>
            consultationBookingsApi.actions(bookingId, { ...options, signal }),
    })
    const mutation = useMutation({
        mutationFn: () =>
            cancel
                ? consultationBookingsApi.cancel(bookingId, options)
                : consultationBookingsApi.reschedule(
                      bookingId,
                      {
                          consultationSlotId: slot!.id,
                          previousSlotId: booking.data!.consultationSlotId,
                          acceptEarlyService: early,
                      },
                      options,
                  ),
        onSuccess: async () => {
            await Promise.all(
                [
                    'consultation-booking',
                    'consultation-actions',
                    'consultation-slots',
                    'my-consultations',
                ].map((key) => client.invalidateQueries({ queryKey: [key] })),
            )
            router.replace(`/consultations/booking?id=${bookingId}`)
        },
    })
    const allowed = cancel
        ? actions.data?.canCancel
        : actions.data?.canReschedule
    const needsEarly =
        !!slot &&
        !booking.data?.earlyServiceConsentAt &&
        !!booking.data?.withdrawalUntil &&
        Date.parse(slot.startsAt) < Date.parse(booking.data.withdrawalUntil)
    return (
        <DetailScreen
            title={t(
                cancel
                    ? 'consultationFlow.cancel'
                    : 'consultationFlow.reschedule',
            )}
        >
            <QueryState
                loading={valid && (booking.isPending || actions.isPending)}
                error={booking.error || actions.error || mutation.error}
                retry={() => {
                    void booking.refetch()
                    void actions.refetch()
                }}
                empty={!valid ? t('consultationFlow.unavailable') : undefined}
            />
            {booking.data && <BookingCard booking={booking.data} />}
            {actions.isSuccess && !allowed && (
                <Text style={s.body}>
                    {t('consultationFlow.actionUnavailable')}
                </Text>
            )}
            {allowed && (
                <>
                    {cancel ? (
                        <Text style={s.body}>
                            {t('consultationFlow.cancelConfirm')}
                        </Text>
                    ) : (
                        <>
                            <WeekSlots
                                bookingId={bookingId}
                                onSelect={(value) => {
                                    setSlot(value)
                                    setEarly(false)
                                }}
                            />
                            {slot && (
                                <Text style={s.title}>
                                    {dateLabel(slot.startsAt, i18n.language)} ·{' '}
                                    {timeLabel(slot.startsAt, i18n.language)}
                                </Text>
                            )}
                            {needsEarly && (
                                <Checkbox
                                    checked={early}
                                    onChange={setEarly}
                                    label={t('consultationFlow.earlyConsent')}
                                >
                                    <Text style={s.body}>
                                        {t('consultationFlow.earlyConsent')}
                                    </Text>
                                </Checkbox>
                            )}
                        </>
                    )}
                    <BlueButton
                        loading={mutation.isPending}
                        disabled={!cancel && (!slot || (needsEarly && !early))}
                        onPress={() => mutation.mutate()}
                    >
                        {t(
                            cancel
                                ? 'consultationFlow.confirmCancel'
                                : 'consultationFlow.confirmTime',
                        )}
                    </BlueButton>
                </>
            )}
        </DetailScreen>
    )
}
