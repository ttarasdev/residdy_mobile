import { useLocalSearchParams, useRouter } from 'expo-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import useApi from '../../shared/hooks/useApi'
import { subscriptionPlansApi } from '../../api/subscription-plans/subscription-plans.api'
import { subscriptionPricesApi } from '../../api/subscription-prices/subscription-prices.api'
import { userSubscriptionsApi } from '../../api/user-subscriptions/user-subscriptions.api'
import DetailScreen from '../shared/layout/DetailScreen'
import FormCard from '../shared/forms/FormCard'
import LightButton from '../shared/buttons/LightButton'
import QueryState from '../shared/content/QueryState'
export default function Purchase() {
    const { priceId } = useLocalSearchParams<{ priceId: string }>()
    const { options, account } = useApi()
    const { t } = useTranslation()
    const router = useRouter()
    const client = useQueryClient()
    const id = Number(priceId)
    const query = useQuery({
        queryKey: ['subscription-price', id],
        enabled: Number.isSafeInteger(id) && id > 0,
        queryFn: ({ signal }) =>
            subscriptionPricesApi.get(id, { ...options, signal }),
    })
    const plan = useQuery({
        queryKey: ['subscription-plan', query.data?.planId],
        enabled: !!query.data?.planId,
        queryFn: ({ signal }) =>
            subscriptionPlansApi.get(query.data!.planId, {
                ...options,
                signal,
            }),
    })
    const purchase = useMutation({
        mutationFn: () =>
            userSubscriptionsApi.devPurchase({ priceId: id }, options),
        onSuccess: async (result) => {
            client.setQueryData(['subscription', account?.account.id], result)
            await client.invalidateQueries({ queryKey: ['subscription'] })
            router.replace('/profile/subscription')
        },
    })
    return (
        <DetailScreen title={t('plansUi.purchase')}>
            <QueryState
                loading={query.isLoading}
                error={query.error ?? plan.error ?? purchase.error}
            />
            {query.data && (
                <FormCard
                    title={plan.data?.name}
                    description={t(`plansUi.${query.data.interval}`)}
                >
                    <LightButton
                        loading={purchase.isPending}
                        onPress={() => purchase.mutate()}
                    >
                        {t('plansUi.buy')}
                    </LightButton>
                </FormCard>
            )}
        </DetailScreen>
    )
}
