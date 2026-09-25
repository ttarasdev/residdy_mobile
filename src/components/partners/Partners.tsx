import { View, StyleSheet } from 'react-native'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { useBottomTabBarHeight } from 'expo-router/tabs'
import { useTranslation } from 'react-i18next'
import { partnerCompaniesApi } from '../../api/partner-companies/partner-companies.api'
import useApi from '../../shared/hooks/useApi'
import Screen from '../shared/layout/Screen'
import TabScrollView from '../shared/layout/TabScrollView'
import TabHeader from '../navigation/TabHeader'
import Text from '../shared/typography/Text'
import QueryState from '../shared/content/QueryState'
import OutlineButton from '../shared/buttons/OutlineButton'
import PartnerCard from './PartnerCard'
import { contentStyles as s } from '../shared/content/content.styles'

export default function Partners() {
    const { t } = useTranslation()
    const { account, options } = useApi()
    const router = useRouter()
    const bottom = useBottomTabBarHeight()
    const query = useInfiniteQuery({
        queryKey: ['partners', account?.account.id, 'list'],
        initialPageParam: 0,
        queryFn: ({ pageParam, signal }) => partnerCompaniesApi.getAll({ offset: pageParam, limit: 20 }, { ...options, signal }),
        getNextPageParam: (page) => page.rows.length && page.offset + page.rows.length < page.total ? page.offset + page.rows.length : undefined,
    })
    const companies = query.data?.pages.flatMap(page => page.rows) ?? []
    return <Screen edges={['top', 'left', 'right']} paddingHorizontal={0} paddingTop={0} paddingBottom={0} gap={0}>
        <TabHeader title={t('navigation.partners')} />
        <TabScrollView queryRoots={['partners']} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: bottom + 20, gap: 18 }}>
            <View style={styles.intro}>
                <Text accessibilityRole="header" style={styles.title}>{t('partnersUi.title')}</Text>
                <Text style={[s.body, styles.subtitle]}>{t('partnersUi.subtitle')}</Text>
            </View>
            <QueryState loading={query.isPending} error={query.error} retry={() => { void query.refetch() }} empty={query.isSuccess && !companies.length ? t('partnersUi.empty') : undefined} />
            {companies.map(company => <PartnerCard key={company.id} company={company} onPress={() => router.push(`/partners/${company.id}`)} />)}
            {query.hasNextPage && <OutlineButton loading={query.isFetchingNextPage} onPress={() => { void query.fetchNextPage() }}>{t('partnersUi.more')}</OutlineButton>}
        </TabScrollView>
    </Screen>
}
const styles = StyleSheet.create({
    intro: { alignItems: 'center', gap: 12, paddingTop: 8, paddingBottom: 12 },
    title: { color: '#FFFFFF', fontFamily: 'Manrope_600SemiBold', fontSize: 28, lineHeight: 38, textAlign: 'center' },
    subtitle: { textAlign: 'center', maxWidth: 310 },
})
