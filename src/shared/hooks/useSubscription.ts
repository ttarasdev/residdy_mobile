import { useCallback } from 'react'
import { useFocusEffect } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { userSubscriptionsApi } from '../../api/user-subscriptions/user-subscriptions.api'
import useApi from './useApi'
export default function useSubscription(enabled = true) {
    const { account, options } = useApi()
    const query = useQuery({
        queryKey: ['subscription', account?.account.id],
        queryFn: ({ signal }) =>
            userSubscriptionsApi.current({ ...options, signal }),
        enabled: enabled && !!account,
        staleTime: 0,
    })
    useFocusEffect(
        useCallback(() => {
            if (enabled && account) void query.refetch()
        }, [enabled, account?.account.id, query.refetch]),
    )
    return query
}
