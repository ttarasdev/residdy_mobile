import { useState } from 'react'
import { Alert, View } from 'react-native'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import useApi from '../../shared/hooks/useApi'
import { openUserDocument } from '../../shared/utils/open-user-document'
import { gUserDocsApi } from '../../api/g-user-docs/g-user-docs.api'
import { localizedTitle } from '../../shared/utils/profile'
import ContentRow from '../shared/content/ContentRow'
import QueryState from '../shared/content/QueryState'
import SwipeActionRow from '../shared/gestures/SwipeActionRow'
import Text from '../shared/typography/Text'
import { contentStyles as s } from '../shared/content/content.styles'
export default function MyDocuments({ showTitle = true }: { showTitle?: boolean }) {
    const { account, options, lan } = useApi()
    const { t } = useTranslation()
    const client = useQueryClient()
    const [openRow, setOpenRow] = useState<number | null>(null)
    const query = useQuery({
        queryKey: ['my-documents', account?.account.id],
        queryFn: ({ signal }) =>
            gUserDocsApi.findAll({ limit: 100 }, { ...options, signal }),
    })
    const open = useMutation({
        mutationFn: (id: number) => openUserDocument(id, options),
    })
    const remove = useMutation({
        mutationFn: (id: number) => gUserDocsApi.remove(id, options),
        onSuccess: () =>
            client.invalidateQueries({ queryKey: ['my-documents'] }),
    })
    return (
        <View style={[s.list, { marginVertical: 24 }]}>
            {showTitle && <Text style={s.heading}>{t('workspace.myDocuments')}</Text>}
            <QueryState
                loading={query.isPending}
                error={query.error}
                retry={() => {
                    void query.refetch()
                }}
                empty={
                    !query.data?.rows.length
                        ? t('workspace.noDocuments')
                        : undefined
                }
            />
            <QueryState error={open.error ?? remove.error} />
            {query.data?.rows.map((item) => (
                <SwipeActionRow
                    key={item.id}
                    label={t('workspace.delete')}
                    open={openRow === item.id}
                    onOpenChange={(value) => setOpenRow(value ? item.id : null)}
                    busy={remove.isPending && remove.variables === item.id}
                    disabled={remove.isPending || open.isPending}
                    onAction={() =>
                        Alert.alert(
                            t('workspace.deleteDocument'),
                            t('workspace.deleteConfirm'),
                            [
                                {
                                    text: t('workspace.cancel'),
                                    style: 'cancel',
                                    onPress: () => setOpenRow(null),
                                },
                                {
                                    text: t('workspace.delete'),
                                    style: 'destructive',
                                    onPress: () => remove.mutate(item.id),
                                },
                            ],
                        )
                    }
                >
                    <ContentRow
                        title={
                            item.template
                                ? localizedTitle(item.template, lan)
                                : t('workspace.document')
                        }
                        subtitle={
                            item.createdAt
                                ? new Date(item.createdAt).toLocaleDateString()
                                : undefined
                        }
                        loading={open.isPending && open.variables === item.id}
                        onPress={() => {
                            if (!open.isPending) open.mutate(item.id)
                        }}
                    />
                </SwipeActionRow>
            ))}
        </View>
    )
}
