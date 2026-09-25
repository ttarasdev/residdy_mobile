import Page from '../../../components/consultations/BookConsultation'
import SubscriptionGuard from '../../../shared/guards/SubscriptionGuard'
export default function Route() {
    return (
        <SubscriptionGuard>
            <Page />
        </SubscriptionGuard>
    )
}
