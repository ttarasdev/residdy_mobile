import SwipeActionRow from '../shared/gestures/SwipeActionRow'
import GlassSegmentedControl from '../shared/segmented-control/GlassSegmentedControl'
import { useState } from 'react'
import { View } from 'react-native'
import {
    useInfiniteQuery,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import useApi from '../../shared/hooks/useApi'
import { userNotificationsApi } from '../../api/user-notifications/user-notifications.api'
import DetailScreen from '../shared/layout/DetailScreen'
import Card from '../shared/cards/Card'
import Button from '../shared/buttons/Button'
import QueryState from '../shared/content/QueryState'
import Text from '../shared/typography/Text'
import { contentStyles as s } from '../shared/content/content.styles'

export default function Notifications() {
    const { account, options } = useApi()
    const { t, i18n } = useTranslation()
    const client = useQueryClient()
    const [expanded, setExpanded] = useState<number | null>(null)
    const [folder, setFolder] = useState<'inbox' | 'archived'>('inbox')
    const [openRow, setOpenRow] = useState<number | null>(null)
    const query = useInfiniteQuery({
        queryKey: ['notifications', account?.account.id, folder],
        initialPageParam: 0,
        enabled: !!account,
        queryFn: ({ signal, pageParam }) =>
            userNotificationsApi.getMy(
                { limit: 20, offset: pageParam, folder },
                { ...options, signal },
            ),
        getNextPageParam: (page) =>
            page.offset + page.rows.length < page.total && page.rows.length
                ? page.offset + page.rows.length
                : undefined,
    })
    const read = useMutation({
        mutationFn: (id: number) =>
            userNotificationsApi.changeStatus(id, { status: 'read' }, options),
        onSuccess: () => {
            void client.invalidateQueries({
                queryKey: ['notifications', account?.account.id],
            })
            void client.invalidateQueries({
                queryKey: ['notifications-unread', account?.account.id],
            })
        },
    })
    const archive = useMutation({
        mutationFn: ({
            id,
            status,
        }: {
            id: number
            status: 'read' | 'archived'
        }) => userNotificationsApi.changeStatus(id, { status }, options),
        onSuccess: () => {
            setOpenRow(null)
            void client.invalidateQueries({
                queryKey: ['notifications', account?.account.id],
            })
            void client.invalidateQueries({
                queryKey: ['notifications-unread', account?.account.id],
            })
        },
    })
    const rows = query.data?.pages.flatMap((page) => page.rows) ?? []
    return (
        <DetailScreen title={t('search.notifications')}>
            <GlassSegmentedControl
                items={[
                    { value: 'inbox', label: t('notificationsUi.inbox') },
                    { value: 'archived', label: t('notificationsUi.archive') },
                ]}
                value={folder}
                onChange={(value) => {
                    setFolder(value)
                    setOpenRow(null)
                    setExpanded(null)
                }}
            />
            <QueryState
                loading={query.isPending}
                error={query.error ?? read.error ?? archive.error}
                retry={() => {
                    read.reset()
                    archive.reset()
                    void query.refetch()
                }}
                empty={
                    query.isSuccess && !rows.length
                        ? t(
                              folder === 'archived'
                                  ? 'notificationsUi.emptyArchive'
                                  : 'notificationsUi.empty',
                          )
                        : undefined
                }
            />
            {rows.map((item) => (
                <SwipeActionRow
                    key={item.id}
                    tone="neutral"
                    label={t(
                        folder === 'archived'
                            ? 'notificationsUi.restore'
                            : 'notificationsUi.archiveAction',
                    )}
                    open={openRow === item.id}
                    onOpenChange={(open) => setOpenRow(open ? item.id : null)}
                    busy={
                        archive.isPending && archive.variables?.id === item.id
                    }
                    disabled={archive.isPending || read.isPending}
                    onAction={() =>
                        archive.mutate({
                            id: item.id,
                            status: folder === 'archived' ? 'read' : 'archived',
                        })
                    }
                >
                    <Card
                        padding={18}
                        radius={24}
                        backgroundColor={
                            item.status === 'unread'
                                ? 'rgba(54,137,173,0.2)'
                                : 'rgba(255,255,255,0.055)'
                        }
                        borderWidth={1}
                        borderColor={
                            item.status === 'unread'
                                ? 'rgba(125,205,233,0.3)'
                                : 'rgba(255,255,255,0.1)'
                        }
                        accessibilityLabel={`${item.status === 'unread' ? t('notificationsUi.unread') + '. ' : ''}${item.subject}`}
                        accessibilityState={{ expanded: expanded === item.id }}
                        onPress={() => {
                            setExpanded(expanded === item.id ? null : item.id)
                            if (item.status === 'unread' && !read.isPending)
                                read.mutate(item.id)
                        }}
                        style={{ gap: 10 }}
                    >
                        <View style={s.row}>
                            <Text style={[s.title, { flex: 1 }]}>
                                {item.subject}
                            </Text>
                            {item.status === 'unread' && (
                                <View
                                    style={{
                                        width: 7,
                                        height: 7,
                                        borderRadius: 4,
                                        backgroundColor: '#F49A55',
                                    }}
                                />
                            )}
                        </View>
                        <Text
                            style={s.body}
                            numberOfLines={expanded === item.id ? undefined : 2}
                        >
                            {item.text}
                        </Text>
                        {!!item.createdAt && (
                            <Text style={s.small}>
                                {new Date(item.createdAt).toLocaleDateString(
                                    i18n.language,
                                )}
                            </Text>
                        )}
                    </Card>
                </SwipeActionRow>
            ))}
            {query.hasNextPage && (
                <Button
                    loading={query.isFetchingNextPage}
                    onPress={() => {
                        void query.fetchNextPage()
                    }}
                >
                    {t('notificationsUi.more')}
                </Button>
            )}
        </DetailScreen>
    )
}
