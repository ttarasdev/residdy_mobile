import Page from '../../../components/consultations/ConsultationOffers'
import SubscriptionGuard from '../../../shared/guards/SubscriptionGuard'
export default function Route() {
    return (
        <SubscriptionGuard>
            <Page />
        </SubscriptionGuard>
    )
}
