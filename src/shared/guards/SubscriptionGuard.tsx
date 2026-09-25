import type { ReactNode } from 'react'
import { ActivityIndicator } from 'react-native'
import { Redirect } from 'expo-router'
import useSubscription from '../hooks/useSubscription'
import Screen from '../../components/shared/layout/Screen'
import QueryState from '../../components/shared/content/QueryState'

export default function SubscriptionGuard({
    children,
}: {
    children: ReactNode
}) {
    const query = useSubscription()
    if (query.isPending)
        return (
            <Screen style={{ justifyContent: 'center' }}>
                <ActivityIndicator color="#FFFFFF" />
            </Screen>
        )
    if (
        query.data &&
        (!query.data.active ||
            new Date(query.data.subscription.periodEnd).getTime() <= Date.now())
    )
        return <Redirect href="/profile" />
    if (query.error)
        return (
            <Screen>
                <QueryState
                    error={query.error}
                    retry={() => {
                        void query.refetch()
                    }}
                />
            </Screen>
        )
    return children
}
