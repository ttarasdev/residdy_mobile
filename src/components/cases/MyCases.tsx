import { View } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import useApi from '../../shared/hooks/useApi'
import { userCasesApi } from '../../api/user-cases/user-cases.api'
import CaseCard from './CaseCard'
import QueryState from '../shared/content/QueryState'
import Text from '../shared/typography/Text'
import { contentStyles as s } from '../shared/content/content.styles'
export default function MyCases() {
    const { account, options } = useApi()
    const { t } = useTranslation()
    const router = useRouter()
    const query = useQuery({
        queryKey: ['my-cases', account?.account.id],
        queryFn: ({ signal }) =>
            userCasesApi.getAll({ limit: 100 }, { ...options, signal }),
        enabled: !!account,
    })
    return (
        <View style={[s.list, { marginVertical: 24 }]}>
            <Text style={s.heading}>{t('workspace.myCases')}</Text>
            <QueryState
                loading={query.isPending}
                error={query.error}
                retry={() => {
                    void query.refetch()
                }}
                empty={
                    !query.data?.rows.length
                        ? t('workspace.noCases')
                        : undefined
                }
            />
            {query.data?.rows.map((item) => (
                <CaseCard
                    key={item.id}
                    item={item}
                    onPress={() => router.push(`/cases/${item.id}`)}
                />
            ))}
        </View>
    )
}
