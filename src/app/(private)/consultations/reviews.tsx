import Page from '../../../components/consultations/ConsultationReviews'
import SubscriptionGuard from '../../../shared/guards/SubscriptionGuard'
export default function Route() {
    return (
        <SubscriptionGuard>
            <Page />
        </SubscriptionGuard>
    )
}
