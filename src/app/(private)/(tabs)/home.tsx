import HomePage from '../../../components/home/HomePage'
import SubscriptionGuard from '../../../shared/guards/SubscriptionGuard'
export default function HomeScreen() {
    return (
        <SubscriptionGuard>
            <HomePage />
        </SubscriptionGuard>
    )
}
