import { Image, View } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import useApi from '../../shared/hooks/useApi'
import { consultationCategoriesApi } from '../../api/consultation-categories/consultation-categories.api'
import { publicAssetUrl } from '../../shared/utils/public-asset-url'
import NavyCard from '../shared/cards/NavyCard'
import Text from '../shared/typography/Text'
import QueryState from '../shared/content/QueryState'
import { contentStyles as s } from '../shared/content/content.styles'
import { allPages, localized } from './consultation-content'

export default function ConsultationTopics() {
    const { account, options, lan } = useApi()
    const { t } = useTranslation()
    const router = useRouter()
    const query = useQuery({
        queryKey: ['consultation-categories', account?.account.id],
        queryFn: ({ signal }) =>
            allPages((offset) =>
                consultationCategoriesApi.findActive(
                    { offset, limit: 100 },
                    { ...options, signal },
                ),
            ),
    })
    return (
        <View style={{ gap: 24, marginVertical: 20 }}>
            <QueryState
                loading={query.isPending}
                error={query.error}
                retry={() => {
                    void query.refetch()
                }}
            />
            {[
                {
                    key: 'popular',
                    rows: query.data?.filter((item) => item.isPopular),
                },
                { key: 'allTopics', rows: query.data },
            ].map(
                (group) =>
                    !!group.rows?.length && (
                        <View key={group.key} style={{ gap: 14 }}>
                            <Text accessibilityRole="header" style={s.heading}>
                                {t(`consultationFlow.${group.key}`)}
                            </Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    gap: 12,
                                }}
                            >
                                {group.rows.map((item) => (
                                    <NavyCard
                                        key={item.id}
                                        width="48%"
                                        padding={16}
                                        radius={20}
                                        backgroundColor="#243B4B"
                                        borderWidth={1}
                                        borderColor="rgba(255,255,255,0.07)"
                                        style={{
                                            minHeight: 96,
                                            gap: 12,
                                            flexGrow: 1,
                                        }}
                                        onPress={() =>
                                            router.push(
                                                `/consultations/offers?category=${item.id}`,
                                            )
                                        }
                                    >
                                        <Image
                                            source={
                                                item.icon?.url
                                                    ? {
                                                          uri: publicAssetUrl(
                                                              item.icon.url,
                                                              options.baseUrl,
                                                          ),
                                                      }
                                                    : require('../../../assets/system_icons/multi/onboarding-consultant-white.png')
                                            }
                                            style={{
                                                width: 24,
                                                height: 24,
                                                tintColor: '#FFFFFF',
                                            }}
                                        />
                                        <Text style={s.title}>
                                            {localized(item, 'title', lan)}
                                        </Text>
                                    </NavyCard>
                                ))}
                            </View>
                        </View>
                    ),
            )}
        </View>
    )
}
