import { useLocalSearchParams, useRouter } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import useApi from '../../shared/hooks/useApi'
import { specialistConsultationsApi } from '../../api/specialist-consultations/specialist-consultations.api'
import DetailScreen from '../shared/layout/DetailScreen'
import QueryState from '../shared/content/QueryState'
import Text from '../shared/typography/Text'
import OutlineButton from '../shared/buttons/OutlineButton'
import { contentStyles as s } from '../shared/content/content.styles'
import SpecialistAvatar from './SpecialistAvatar'
import WeekSlots from './WeekSlots'
import { localized, money } from './consultation-content'
export default function ConsultationService() {
    const { id } = useLocalSearchParams<{ id: string }>()
    const { options, account, lan } = useApi()
    const { t, i18n } = useTranslation()
    const router = useRouter()
    const valid = Number.isSafeInteger(Number(id)) && Number(id) > 0
    const query = useQuery({
        queryKey: ['consultation-service', account?.account.id, id],
        enabled: valid,
        queryFn: ({ signal }) =>
            specialistConsultationsApi.findAvailable(Number(id), {
                ...options,
                signal,
            }),
    })
    const item = query.data
    return (
        <DetailScreen title={t('consultationFlow.details')}>
            <QueryState
                loading={valid && query.isPending}
                error={query.error}
                retry={() => {
                    void query.refetch()
                }}
                empty={!valid ? t('consultationFlow.unavailable') : undefined}
            />
            {item && (
                <>
                    <View style={s.row}>
                        <SpecialistAvatar
                            size={88}
                            variantId={item.specialist?.account?.avatarId}
                        />
                        <View style={{ flex: 1, gap: 8 }}>
                            <Text style={s.heading}>
                                {item.specialist?.name}
                            </Text>
                            <Text style={s.body}>{item.lans.join(' · ')}</Text>
                        </View>
                    </View>
                    <Text style={s.heading}>
                        {localized(item, 'title', lan)}
                    </Text>
                    <Text style={s.body}>
                        {item.durationMinutes} min · Online ·{' '}
                        {money(item.price, i18n.language)}
                    </Text>
                    <Text style={s.body}>
                        {localized(item, 'description', lan)}
                    </Text>
                    {(['about', 'education', 'servicesSummary'] as const).map(
                        (field) => {
                            const value = localized(
                                item.specialist?.info,
                                field,
                                lan,
                            )
                            return value ? (
                                <View key={field} style={{ gap: 8 }}>
                                    <Text style={s.title}>
                                        {t(`consultationFlow.${field}`)}
                                    </Text>
                                    <Text style={s.body}>{value}</Text>
                                </View>
                            ) : null
                        },
                    )}
                    <OutlineButton
                        onPress={() =>
                            router.push(
                                `/consultations/reviews?specialist=${item.specialistId}`,
                            )
                        }
                    >
                        {t('consultationFlow.reviews')}
                    </OutlineButton>
                    <Text style={s.heading}>
                        {t('consultationFlow.chooseTime')}
                    </Text>
                    <WeekSlots serviceId={item.id} />
                </>
            )}
        </DetailScreen>
    )
}
