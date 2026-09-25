import { useRef, useState } from 'react'
import { View } from 'react-native'
import { uploadFile } from '../../shared/utils/upload-file'
import { File } from 'expo-file-system'
import * as DocumentPicker from 'expo-document-picker'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import useApi from '../../shared/hooks/useApi'
import useSubscription from '../../shared/hooks/useSubscription'
import { consultationSlotsApi } from '../../api/consultation-slots/consultation-slots.api'
import { consultationBookingsApi } from '../../api/consultation-bookings/consultation-bookings.api'
import { consultationPromocodeApi } from '../../api/consultation-promocode/consultation-promocode.api'
import { legalDocumentsApi } from '../../api/legal-documents/legal-documents.api'
import DetailScreen from '../shared/layout/DetailScreen'
import QueryState from '../shared/content/QueryState'
import Text from '../shared/typography/Text'
import FormInput from '../shared/forms/FormInput'
import GlassCard from '../shared/cards/GlassCard'
import BlueButton from '../shared/buttons/BlueButton'
import OutlineButton from '../shared/buttons/OutlineButton'
import Checkbox from '../shared/inputs/Checkbox'
import LegalChecks from '../auth/LegalChecks'
import { contentStyles as s } from '../shared/content/content.styles'
import SpecialistAvatar from './SpecialistAvatar'
import {
    allPages,
    dateLabel,
    timeLabel,
    localized,
    money,
} from './consultation-content'

export default function BookConsultation() {
    const params = useLocalSearchParams<{
        service: string
        slot: string
        week: string
    }>()
    const { account, options, lan } = useApi()
    const { t, i18n } = useTranslation()
    const router = useRouter()
    const client = useQueryClient()
    const subscription = useSubscription()
    const [question, setQuestion] = useState('')
    const [code, setCode] = useState('')
    const [selected, setSelected] = useState<number[]>([])
    const [early, setEarly] = useState(false)
    const [file, setFile] = useState<DocumentPicker.DocumentPickerAsset>()
    const [fileError, setFileError] = useState<unknown>()
    const busy = useRef(false)
    const valid =
        Number(params.service) > 0 &&
        Number(params.slot) > 0 &&
        /^\d{4}-\d{2}-\d{2}$/.test(params.week ?? '')
    const slots = useQuery({
        queryKey: [
            'consultation-slots',
            account?.account.id,
            'checkout',
            params.service,
            params.week,
        ],
        enabled: valid,
        queryFn: ({ signal }) =>
            allPages((offset) =>
                consultationSlotsApi.findPublic(
                    {
                        weekStart: params.week,
                        specialistConsultationId: Number(params.service),
                        offset,
                        limit: 100,
                    },
                    { ...options, signal },
                ),
            ),
    })
    const slot = slots.data?.find((item) => item.id === Number(params.slot))
    const offer = slot?.specialistConsultation
    const legal = useQuery({
        queryKey: ['consultation-legal'],
        queryFn: ({ signal }) =>
            legalDocumentsApi.list(
                { placement: 'consultation_checkout', limit: 6 },
                { ...options, signal },
            ),
    })
    const promo = useMutation({
        mutationFn: () =>
            consultationPromocodeApi.evaluate(
                {
                    specialistConsultationId: Number(params.service),
                    code: code.trim(),
                },
                options,
            ),
    })
    const create = useMutation({
        mutationFn: async () =>
            consultationBookingsApi.create(
                {
                    consultationSlotId: Number(params.slot),
                    userText: question.trim(),
                    legalVersionIds: legal.data!.rows.map(
                        (doc) => doc.versionId,
                    ),
                    acceptEarlyService: early,
                    ...(code.trim() ? { promocode: code.trim() } : {}),
                },
                options,
                file ? await uploadFile(file.uri, file.name, file.mimeType ?? 'application/octet-stream') : undefined,
            ),
        onSuccess: (booking) => {
            client.setQueryData(
                ['consultation-booking', account?.account.id, booking.id],
                {
                    ...booking,
                    specialist:
                        booking.specialist ??
                        offer?.specialist ??
                        slot?.specialist,
                    specialistConsultation:
                        booking.specialistConsultation ?? offer,
                },
            )
            router.replace(`/consultations/booking?id=${booking.id}`)
            void client.invalidateQueries({ queryKey: ['my-consultations'] })
            void client.invalidateQueries({ queryKey: ['consultation-slots'] })
        },
    })
    const original = Number(offer?.price ?? 0)
    const discounted =
        (Math.round(original * 100) -
            Math.floor(
                (Math.round(original * 100) *
                    (subscription.data?.plan.consultationDiscountPercent ??
                        0)) /
                    100,
            )) /
        100
    const total = promo.data
        ? Math.min(discounted, Number(promo.data.finalAmount))
        : discounted
    const needsEarly =
        !!slot && Date.parse(slot.startsAt) < Date.now() + 15 * 86400000
    const accepted =
        !!legal.data?.rows.length &&
        legal.data.rows.every((doc) => selected.includes(doc.versionId))
    async function pick() {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                copyToCacheDirectory: true,
                multiple: false,
                type: ['application/pdf', 'image/jpeg', 'image/png'],
            })
            if (!result.canceled) {
                if (
                    (result.assets[0].size ??
                        new File(result.assets[0].uri).size) >
                    20 * 1024 * 1024
                )
                    throw Error('file-size')
                setFile(result.assets[0])
            }
        } catch (error) {
            setFileError(error)
        }
    }
    return (
        <DetailScreen title={t('consultationFlow.book')}>
            <QueryState
                loading={valid && slots.isPending}
                error={slots.error || legal.error || subscription.error}
                retry={() => {
                    void slots.refetch()
                    void legal.refetch()
                    void subscription.refetch()
                }}
                empty={
                    !valid || (slots.isSuccess && !slot)
                        ? t('consultationFlow.unavailable')
                        : undefined
                }
            />
            <QueryState error={create.error || promo.error || fileError} />
            {slot && offer && (
                <>
                    <Text style={s.heading}>
                        {t('consultationFlow.discuss')}
                    </Text>
                    <GlassCard style={{ gap: 14 }}>
                        <View style={s.row}>
                            <SpecialistAvatar
                                variantId={offer.specialist?.account?.avatarId}
                            />
                            <View style={{ flex: 1, gap: 6 }}>
                                <Text style={s.title}>
                                    {offer.specialist?.name}
                                </Text>
                                <Text style={s.body}>
                                    {localized(offer, 'title', lan)}
                                </Text>
                            </View>
                        </View>
                        <Text style={s.title}>
                            {dateLabel(slot.startsAt, i18n.language)} ·{' '}
                            {timeLabel(slot.startsAt, i18n.language)}
                        </Text>
                        <Text style={s.body}>
                            {offer.durationMinutes} min · Online ·{' '}
                            {offer.lans?.join(' · ')}
                        </Text>
                    </GlassCard>
                    <FormInput
                        label={t('consultationFlow.question')}
                        value={question}
                        onChangeText={setQuestion}
                        multiline
                        maxLength={15000}
                        style={{ minHeight: 120, textAlignVertical: 'top' }}
                    />
                    <OutlineButton
                        onPress={() => {
                            void pick()
                        }}
                    >
                        {file?.name ?? t('consultationFlow.attach')}
                    </OutlineButton>
                    {file && (
                        <OutlineButton onPress={() => setFile(undefined)}>
                            {t('consultationFlow.removeFile')}
                        </OutlineButton>
                    )}
                    <Text style={s.small}>PDF, JPG, PNG · 20 MB</Text>
                    <FormInput
                        label={t('consultationFlow.promo')}
                        value={code}
                        onChangeText={(value) => {
                            setCode(value)
                            promo.reset()
                        }}
                        maxLength={50}
                    />
                    <OutlineButton
                        loading={promo.isPending}
                        disabled={!code.trim()}
                        onPress={() => promo.mutate()}
                    >
                        {t('consultationFlow.apply')}
                    </OutlineButton>
                    <GlassCard style={{ gap: 10 }}>
                        <Text style={s.body}>
                            {t('consultationFlow.total')}
                        </Text>
                        <Text style={s.heading}>
                            {money(total, i18n.language)}
                        </Text>
                    </GlassCard>
                    <LegalChecks
                        documents={legal.data?.rows ?? []}
                        selected={selected}
                        onChange={setSelected}
                        disabled={create.isPending}
                    />
                    {
                        <Checkbox
                            checked={early}
                            onChange={setEarly}
                            label={t('consultationFlow.earlyConsent')}
                            disabled={create.isPending}
                        >
                            <Text style={s.body}>
                                {t('consultationFlow.earlyConsent')}
                            </Text>
                        </Checkbox>
                    }
                    <BlueButton
                        loading={create.isPending}
                        disabled={
                            !accepted ||
                            (needsEarly && !early) ||
                            subscription.isPending ||
                            promo.isPending
                        }
                        onPress={async () => {
                            if (busy.current) return
                            busy.current = true
                            try {
                                await create.mutateAsync()
                            } catch {
                            } finally {
                                busy.current = false
                            }
                        }}
                    >
                        {t('consultationFlow.continue')}
                    </BlueButton>
                </>
            )}
        </DetailScreen>
    )
}
