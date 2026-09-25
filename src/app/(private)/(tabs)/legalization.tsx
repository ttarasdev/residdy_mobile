import LegalizationPage from '../../../components/legalization/LegalizationPage'
import SubscriptionGuard from '../../../shared/guards/SubscriptionGuard'
export default function Legalization() {
    return (
        <SubscriptionGuard>
            <LegalizationPage />
        </SubscriptionGuard>
    )
}
