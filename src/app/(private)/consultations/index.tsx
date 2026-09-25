import Page from '../../../components/consultations/ConsultationCategories'
import SubscriptionGuard from '../../../shared/guards/SubscriptionGuard'
export default function Route() {
    return (
        <SubscriptionGuard>
            <Page />
        </SubscriptionGuard>
    )
}
