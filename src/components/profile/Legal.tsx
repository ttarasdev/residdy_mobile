import { Linking } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery } from '@tanstack/react-query'
import { legalDocumentsApi } from '../../api/legal-documents/legal-documents.api'
import useApi from '../../shared/hooks/useApi'
import DetailScreen from '../shared/layout/DetailScreen'
import ContentRow from '../shared/content/ContentRow'
import QueryState from '../shared/content/QueryState'
export default function Legal() {
    const { t } = useTranslation()
    const { options } = useApi()
    const query = useQuery({
        queryKey: ['profile-legal-documents'],
        queryFn: ({ signal }) =>
            legalDocumentsApi.list({ limit: 100 }, { ...options, signal }),
    })
    const open = useMutation({
        mutationFn: async (url: string) => {
            const link = new URL(url, options.baseUrl)
            if (['https:', 'http:'].includes(link.protocol))
                await Linking.openURL(link.href)
        },
    })
    return (
        <DetailScreen title={t('workspace.legal')}>
            <QueryState
                loading={query.isPending}
                error={query.error ?? open.error}
                retry={() => {
                    void query.refetch()
                }}
            />
            {query.data?.rows
                .filter((item) =>
                    [
                        'registration_terms',
                        'privacy_policy',
                        'subscription_terms',
                        'consultation_terms',
                    ].includes(item.code),
                )
                .map((item) => (
                    <ContentRow
                        key={item.versionId}
                        title={t(`legalUi.${item.code}`)}
                        onPress={() => open.mutate(item.url)}
                    />
                ))}
        </DetailScreen>
    )
}
