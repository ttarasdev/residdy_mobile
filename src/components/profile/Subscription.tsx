import { useRouter } from 'expo-router'
import LightButton from '../shared/buttons/LightButton'
import { useTranslation } from 'react-i18next'
import useSubscription from '../../shared/hooks/useSubscription'
import DetailScreen from '../shared/layout/DetailScreen'
import SlateCard from '../shared/cards/SlateCard'
import Text from '../shared/typography/Text'
import QueryState from '../shared/content/QueryState'
import { contentStyles as s } from '../shared/content/content.styles'
export default function Subscription() {
    const { t } = useTranslation()
    const router = useRouter()
    const query = useSubscription()
    return (
        <DetailScreen title={t('workspace.subscription')}>
            <QueryState
                loading={query.isPending}
                error={query.error}
                retry={() => {
                    void query.refetch()
                }}
            />
            {query.data && (
                <SlateCard style={s.list}>
                    <Text style={s.heading}>{query.data.plan.name}</Text>
                    <Text style={s.body}>
                        {t(
                            query.data.active
                                ? 'workspace.active'
                                : 'workspace.expired',
                        )}
                    </Text>
                    <Text style={s.small}>
                        {t('workspace.validUntil')}:{' '}
                        {new Date(
                            query.data.subscription.periodEnd,
                        ).toLocaleDateString()}
                    </Text>
                </SlateCard>
            )}
            <LightButton onPress={() => router.push('/profile/plans')}>
                {t('plansUi.choose')}
            </LightButton>
        </DetailScreen>
    )
}
