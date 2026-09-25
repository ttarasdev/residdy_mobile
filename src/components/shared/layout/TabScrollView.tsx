import { useRef, useState, type Ref } from 'react'
import { RefreshControl, ScrollView, type ScrollViewProps } from 'react-native'
import { useQueryClient } from '@tanstack/react-query'

interface Props extends ScrollViewProps {
    queryRoots: string[]
    ref?: Ref<ScrollView>
}
/** Only tab screens use this scroll container. Refetches the current section's mounted queries. */
export default function TabScrollView({
    queryRoots,
    ref,
    contentContainerStyle,
    ...props
}: Props) {
    const client = useQueryClient()
    const [refreshing, setRefreshing] = useState(false)
    const busy = useRef(false)
    async function refresh() {
        if (busy.current) return
        busy.current = true
        setRefreshing(true)
        try {
            await client.refetchQueries({
                type: 'active',
                predicate: (query) =>
                    queryRoots.includes(String(query.queryKey[0])),
            })
        } finally {
            busy.current = false
            setRefreshing(false)
        }
    }
    return (
        <ScrollView
            {...props}
            ref={ref}
            alwaysBounceVertical
            contentContainerStyle={[{ flexGrow: 1 }, contentContainerStyle]}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={() => {
                        void refresh()
                    }}
                    tintColor="#FFFFFF"
                    colors={['#405568']}
                />
            }
        />
    )
}
