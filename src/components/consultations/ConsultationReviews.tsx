import { useLocalSearchParams } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import useApi from '../../shared/hooks/useApi'
import { consultationReviewsApi } from '../../api/consultation-reviews/consultation-reviews.api'
import DetailScreen from '../shared/layout/DetailScreen'
import QueryState from '../shared/content/QueryState'
import GlassCard from '../shared/cards/GlassCard'
import Text from '../shared/typography/Text'
import { contentStyles as s } from '../shared/content/content.styles'
import { allPages } from './consultation-content'
export default function ConsultationReviews() {
    const { specialist } = useLocalSearchParams<{ specialist: string }>()
    const { account, options } = useApi()
    const { t } = useTranslation()
    const valid =
        Number.isSafeInteger(Number(specialist)) && Number(specialist) > 0
    const query = useQuery({
        queryKey: ['consultation-reviews', account?.account.id, specialist],
        enabled: valid,
        queryFn: ({ signal }) =>
            allPages((offset) =>
                consultationReviewsApi.findPublished(
                    Number(specialist),
                    { limit: 100, offset },
                    { ...options, signal },
                ),
            ),
    })
    return (
        <DetailScreen title={t('consultationFlow.reviews')}>
            <QueryState
                loading={valid && query.isPending}
                error={query.error}
                retry={() => {
                    void query.refetch()
                }}
                empty={
                    !valid || (query.isSuccess && !query.data.length)
                        ? t('consultationFlow.noReviews')
                        : undefined
                }
            />
            {query.data?.map((item) => (
                <GlassCard key={item.id} style={{ gap: 12 }}>
                    <Text style={s.title}>
                        {'★'.repeat(item.rating)}
                        {'☆'.repeat(5 - item.rating)}
                    </Text>
                    <Text style={s.body}>{item.comment}</Text>
                </GlassCard>
            ))}
        </DetailScreen>
    )
}
