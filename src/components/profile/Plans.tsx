import { useState } from 'react'
import { View } from 'react-native'
import { useRouter } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import useApi from '../../shared/hooks/useApi'
import { subscriptionPricesApi } from '../../api/subscription-prices/subscription-prices.api'
import DetailScreen from '../shared/layout/DetailScreen'
import GlassSegmentedControl from '../shared/segmented-control/GlassSegmentedControl'
import PaperCard from '../shared/cards/PaperCard'
import DarkButton from '../shared/buttons/DarkButton'
import Text from '../shared/typography/Text'
import QueryState from '../shared/content/QueryState'
export default function Plans() {
    const { options, account } = useApi()
    const { t } = useTranslation()
    const router = useRouter()
    const [interval, setInterval] = useState<'monthly' | 'yearly'>('monthly')
    const query = useQuery({
        queryKey: ['subscription-prices', account?.account.id],
        queryFn: ({ signal }) =>
            subscriptionPricesApi.list({ limit: 100 }, { ...options, signal }),
    })
    const offers = query.data?.rows
        .filter(
            (item) =>
                item.interval === interval &&
                item.provider === 'dev' &&
                item.available,
        )
        .sort((a, b) => (a.plan?.rank ?? 0) - (b.plan?.rank ?? 0))
    return (
        <DetailScreen title={t('plansUi.choose')}>
            <GlassSegmentedControl
                value={interval}
                onChange={setInterval}
                items={(['monthly', 'yearly'] as const).map((value) => ({
                    value,
                    label: t(`plansUi.${value}`),
                }))}
            />
            <QueryState
                loading={query.isPending}
                error={query.error}
                retry={() => {
                    void query.refetch()
                }}
                empty={offers?.length === 0 ? t('plansUi.empty') : undefined}
            />
            {offers?.map((offer) => (
                <PaperCard key={offer.id} padding={24} style={{ gap: 18 }}>
                    <Text
                        style={{
                            fontFamily: 'Manrope_600SemiBold',
                            fontSize: 24,
                            color: '#18242D',
                        }}
                    >
                        {offer.plan?.name}
                    </Text>
                    <View style={{ gap: 10 }}>
                        <Text style={{ color: '#405568' }}>
                            {t('plansUi.documents', {
                                limit: offer.plan?.documentsPerMonth === -1 ? t('plansUi.unlimited') : offer.plan?.documentsPerMonth,
                            })}
                        </Text>
                        <Text style={{ color: '#405568' }}>
                            {t('plansUi.cases', {
                                limit: offer.plan?.openCases === -1 ? t('plansUi.unlimited') : offer.plan?.openCases,
                            })}
                        </Text>
                        <Text style={{ color: '#405568' }}>
                            {t('plansUi.discount', {
                                percent:
                                    offer.plan?.consultationDiscountPercent,
                            })}
                        </Text>
                    </View>
                    <DarkButton
                        onPress={() =>
                            router.push(`/profile/purchase?priceId=${offer.id}`)
                        }
                    >
                        {t('plansUi.select')}
                    </DarkButton>
                </PaperCard>
            ))}
        </DetailScreen>
    )
}
