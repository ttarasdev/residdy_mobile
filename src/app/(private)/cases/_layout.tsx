import { Stack } from 'expo-router'
import SubscriptionGuard from '../../../shared/guards/SubscriptionGuard'
export default function Layout() {
    return (
        <SubscriptionGuard>
            <Stack
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: 'transparent' },
                }}
            />
        </SubscriptionGuard>
    )
}
