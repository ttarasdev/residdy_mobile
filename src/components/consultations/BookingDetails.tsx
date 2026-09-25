import { useEffect, useState } from 'react'
import { Linking, View } from 'react-native'
import { useIsFocused, useLocalSearchParams, useRouter } from 'expo-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import useApi from '../../shared/hooks/useApi'
import type { ConsultationBooking } from '../../api/models'
import { consultationBookingsApi } from '../../api/consultation-bookings/consultation-bookings.api'
import DetailScreen from '../shared/layout/DetailScreen'
import QueryState from '../shared/content/QueryState'
import Text from '../shared/typography/Text'
import BlueButton from '../shared/buttons/BlueButton'
import OutlineButton from '../shared/buttons/OutlineButton'
import { contentStyles as s } from '../shared/content/content.styles'
import BookingCard from './BookingCard'
export default function BookingDetails() {
    const { id } = useLocalSearchParams<{ id: string }>()
    const focused = useIsFocused()
    const bookingId = Number(id)
    const { account, options } = useApi()
    const { t } = useTranslation()
    const router = useRouter()
    const client = useQueryClient()
    const [now, setNow] = useState(Date.now())
    const [linkError, setLinkError] = useState<unknown>()
    const valid = Number.isSafeInteger(bookingId) && bookingId > 0
    const booking = useQuery({
        queryKey: ['consultation-booking', account?.account.id, bookingId],
        enabled: valid,
        queryFn: ({ signal }) =>
            consultationBookingsApi.findMyOne(bookingId, {
                ...options,
                signal,
            }),
        // Creation returns booking fields without the full related records.
        staleTime: 0,
        refetchInterval: focused ? 15000 : false,
    })
    const actions = useQuery({
        queryKey: ['consultation-actions', account?.account.id, bookingId],
        enabled: valid,
        queryFn: ({ signal }) =>
            consultationBookingsApi.actions(bookingId, { ...options, signal }),
        refetchInterval: focused ? 15000 : false,
    })
    const pay = useMutation({
        mutationFn: () =>
            consultationBookingsApi.confirmDev(bookingId, options),
        onSuccess: async (updated) => {
            const queryKey = [
                'consultation-booking',
                account?.account.id,
                bookingId,
            ]
            // A poll started before payment must not overwrite the confirmed status.
            await client.cancelQueries({ queryKey, exact: true })
            client.setQueryData<ConsultationBooking>(queryKey, (previous) => ({
                ...previous,
                ...updated,
                specialist: updated.specialist ?? previous?.specialist,
                specialistConsultation:
                    updated.specialistConsultation ??
                    previous?.specialistConsultation,
            }))
            void client.invalidateQueries({ queryKey, exact: true })
            void client.invalidateQueries({
                queryKey: [
                    'consultation-actions',
                    account?.account.id,
                    bookingId,
                ],
            })
            void client.invalidateQueries({ queryKey: ['my-consultations'] })
        },
    })
    useEffect(() => {
        if (!focused) return
        const timer = setInterval(() => setNow(Date.now()), 1000)
        return () => clearInterval(timer)
    }, [focused])
    const item = booking.data
    const seconds = Math.max(
        0,
        Math.floor(
            ((item?.expiresAt ? Date.parse(item.expiresAt) : now) - now) / 1000,
        ),
    )
    return (
        <DetailScreen title={t('consultationsUi.mine')}>
            <QueryState
                loading={valid && booking.isPending}
                error={booking.error || actions.error || pay.error || linkError}
                retry={() => {
                    void booking.refetch()
                    void actions.refetch()
                }}
                empty={!valid ? t('consultationFlow.unavailable') : undefined}
            />
            {item && (
                <>
                    <BookingCard booking={item} />
                    {item.status === 'awaiting_payment' && (
                        <>
                            <Text style={s.heading}>
                                {t('consultationFlow.finish')}
                            </Text>
                            <Text style={s.body}>
                                {t('consultationFlow.remaining')}{' '}
                                {Math.floor(seconds / 60)}:
                                {String(seconds % 60).padStart(2, '0')}
                            </Text>
                            {__DEV__ && (
                                <BlueButton
                                    loading={pay.isPending}
                                    disabled={!seconds}
                                    onPress={() => pay.mutate()}
                                >
                                    {t('consultationFlow.pay')}
                                </BlueButton>
                            )}
                        </>
                    )}
                    {!!item.userText && (
                        <View style={{ gap: 8 }}>
                            <Text style={s.title}>
                                {t('consultationFlow.question')}
                            </Text>
                            <Text style={s.body}>{item.userText}</Text>
                        </View>
                    )}
                    {!!item.userFileName && (
                        <Text style={s.body}>{item.userFileName}</Text>
                    )}
                    {item.status === 'paid' && (
                        <>
                            <Text style={s.heading}>
                                {t('consultationFlow.meeting')}
                            </Text>
                            {item.meetingStatus === 'ready' &&
                            item.meetingUrl ? (
                                <BlueButton
                                    onPress={async () => {
                                        try {
                                            const url = new URL(
                                                item.meetingUrl!,
                                            )
                                            if (
                                                !['http:', 'https:'].includes(
                                                    url.protocol,
                                                )
                                            )
                                                throw Error(
                                                    'Invalid meeting URL',
                                                )
                                            await Linking.openURL(url.href)
                                        } catch (e) {
                                            setLinkError(e)
                                        }
                                    }}
                                >
                                    {t('consultationFlow.join')}
                                </BlueButton>
                            ) : (
                                <Text style={s.body}>
                                    {t(
                                        `consultationFlow.meetingStatus.${item.meetingStatus}`,
                                    )}
                                </Text>
                            )}
                        </>
                    )}
                    {item.refundStatus !== 'none' && (
                        <Text style={s.body}>
                            {t(`consultationFlow.refund.${item.refundStatus}`)}
                        </Text>
                    )}
                    {actions.data?.canReschedule && (
                        <OutlineButton
                            onPress={() =>
                                router.push(
                                    `/consultations/reschedule?id=${bookingId}`,
                                )
                            }
                        >
                            {t('consultationFlow.reschedule')}
                        </OutlineButton>
                    )}
                    {actions.data?.canCancel && (
                        <OutlineButton
                            onPress={() =>
                                router.push(
                                    `/consultations/cancel?id=${bookingId}`,
                                )
                            }
                        >
                            {t('consultationFlow.cancel')}
                        </OutlineButton>
                    )}
                    {item.status === 'completed' && (
                        <BlueButton
                            onPress={() =>
                                router.push(
                                    `/consultations/review?id=${bookingId}`,
                                )
                            }
                        >
                            {t('consultationFlow.writeReview')}
                        </BlueButton>
                    )}
                </>
            )}
        </DetailScreen>
    )
}
