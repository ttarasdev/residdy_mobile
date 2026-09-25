import { useEffect, useState } from 'react'
import { Image, View } from 'react-native'
import { useIsFocused, useRouter } from 'expo-router'
import { useBottomTabBarHeight } from 'expo-router/tabs'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import Screen from '../shared/layout/Screen'
import TabHeader from '../navigation/TabHeader'
import TabScrollView from '../shared/layout/TabScrollView'
import Text from '../shared/typography/Text'
import Card from '../shared/cards/Card'
import ContentRow from '../shared/content/ContentRow'
import QueryState from '../shared/content/QueryState'
import Skeleton, { SkeletonGroup } from '../shared/loading/Skeleton'
import CaseCard from '../cases/CaseCard'
import BookingCard from '../consultations/BookingCard'
import BlogCard from '../blog/BlogCard'
import PartnerAds from '../advertising/PartnerAds'
import HomeSection from './HomeSection'
import HomeQuickActions from './HomeQuickActions'
import useHomeContent from './useHomeContent'
import {
    availableDocuments,
    nextConsultation,
    nextReminder,
} from './home-content'
import { dateLabel, timeLabel } from '../consultations/consultation-content'
import { localizedTitle } from '../../shared/utils/profile'
import { openUserDocument } from '../../shared/utils/open-user-document'
import useApi from '../../shared/hooks/useApi'
import { contentStyles as s } from '../shared/content/content.styles'

export default function HomePage() {
    const { t, i18n } = useTranslation()
    const router = useRouter()
    const focused = useIsFocused()
    const bottom = useBottomTabBarHeight()
    const { options, lan } = useApi()
    const data = useHomeContent()
    const [offset, setOffset] = useState(0)
    const [viewportHeight, setViewportHeight] = useState(0)
    const [now, setNow] = useState(Date.now())
    useEffect(() => {
        if (!focused) return
        setNow(Date.now())
        const timer = setInterval(() => setNow(Date.now()), 30_000)
        return () => clearInterval(timer)
    }, [focused])
    const open = useMutation({
        mutationFn: (id: number) => openUserDocument(id, options),
    })
    const booking = nextConsultation(data.consultations.data ?? [], now)
    const reminder = nextReminder(data.reminders.data ?? [], now)
    const documents = availableDocuments(data.documents.data?.rows ?? [], now)
    const queries = Object.values(data)
    const error = queries.find((query) => query.error)?.error || open.error
    const personalLoading = data.cases.isPending || data.consultations.isPending
    const name = data.profile.data?.name?.trim()
    return (
        <Screen
            edges={['top', 'left', 'right']}
            paddingHorizontal={0}
            paddingTop={0}
            paddingBottom={0}
            gap={0}
        >
            <TabHeader title={t('navigation.home')} />
            <TabScrollView
                queryRoots={[
                    'user-me',
                    'my-cases',
                    'my-consultations',
                    'user-reminders',
                    'my-documents',
                    'blog',
                    'partner-banners',
                ]}
                scrollEventThrottle={32}
                onScroll={(event) =>
                    setOffset(event.nativeEvent.contentOffset.y)
                }
                onLayout={(event) =>
                    setViewportHeight(event.nativeEvent.layout.height)
                }
                contentContainerStyle={{
                    paddingHorizontal: 20,
                    paddingTop: 12,
                    paddingBottom: bottom + 24,
                    gap: 28,
                }}
            >
                <View style={{ gap: 8 }}>
                    <Text style={[s.body, { color: '#8DE8F5' }]}>
                        {name
                            ? t('homeUi.helloName', { name })
                            : t('homeUi.hello')}
                    </Text>
                    <Text
                        accessibilityRole="header"
                        style={[s.heading, { fontSize: 28, lineHeight: 38 }]}
                    >
                        {t('homeUi.title')}
                    </Text>
                    <Text style={s.body}>{t('homeUi.subtitle')}</Text>
                </View>
                <HomeQuickActions />
                <QueryState
                    error={error}
                    retry={() => {
                        open.reset()
                        queries
                            .filter((query) => query.error)
                            .forEach((query) => {
                                void query.refetch()
                            })
                    }}
                />
                {personalLoading &&
                    !data.cases.data &&
                    !data.consultations.data && (
                        <SkeletonGroup>
                            <Skeleton height={170} radius={24} />
                            <Skeleton height={100} radius={24} />
                        </SkeletonGroup>
                    )}
                {!!data.cases.data?.rows.length && (
                    <HomeSection
                        title={t('homeUi.cases')}
                        onMore={() =>
                            router.push('/legalization?section=cases')
                        }
                    >
                        {data.cases.data.rows.map((item) => (
                            <CaseCard
                                key={item.id}
                                item={item}
                                onPress={() => router.push(`/cases/${item.id}`)}
                            />
                        ))}
                    </HomeSection>
                )}
                {(booking || reminder) && (
                    <HomeSection
                        title={t('homeUi.upNext')}
                        accent="#FFD39B"
                        onMore={
                            booking
                                ? () => router.push('/consultations/mine')
                                : undefined
                        }
                    >
                        {booking && (
                            <BookingCard
                                booking={booking}
                                onPress={() =>
                                    router.push(
                                        `/consultations/booking?id=${booking.id}`,
                                    )
                                }
                            />
                        )}
                        {reminder && (
                            <Card
                                radius={24}
                                padding={18}
                                backgroundColor="rgba(221,167,66,0.16)"
                                borderWidth={1}
                                borderColor="rgba(242,192,108,0.38)"
                                style={{ gap: 10 }}
                            >
                                <View style={s.row}>
                                    <Image
                                        source={require('../../../assets/system_icons/multi/onboarding-bell-white.png')}
                                        style={{ width: 24, height: 24 }}
                                    />
                                    <Text
                                        style={[
                                            s.small,
                                            { color: '#FFD39B', flex: 1 },
                                        ]}
                                    >
                                        {dateLabel(
                                            reminder.targetAt,
                                            i18n.language,
                                        )}{' '}
                                        ·{' '}
                                        {timeLabel(
                                            reminder.targetAt,
                                            i18n.language,
                                        )}
                                    </Text>
                                </View>
                                <Text style={s.title}>{reminder.topic}</Text>
                                {!!reminder.text && (
                                    <Text style={s.body}>{reminder.text}</Text>
                                )}
                            </Card>
                        )}
                    </HomeSection>
                )}
                {!!documents.length && (
                    <HomeSection
                        title={t('homeUi.documents')}
                        accent="#C8B5FF"
                        onMore={() =>
                            router.push('/legalization?section=documents')
                        }
                    >
                        {documents.map((doc) => (
                            <ContentRow
                                key={doc.id}
                                title={
                                    doc.template
                                        ? localizedTitle(doc.template, lan)
                                        : t('workspace.document')
                                }
                                subtitle={t('homeUi.openDocument')}
                                loading={
                                    open.isPending && open.variables === doc.id
                                }
                                onPress={() => {
                                    if (!open.isPending) open.mutate(doc.id)
                                }}
                            />
                        ))}
                    </HomeSection>
                )}
                <PartnerAds
                    offset={offset}
                    viewportHeight={viewportHeight}
                    showBig={false}
                />
                {!!data.posts.data?.rows.length && (
                    <HomeSection
                        title={t('homeUi.articles')}
                        accent="#94E2CC"
                        onMore={() => router.push('/blog')}
                    >
                        {data.posts.data.rows.map((post) => (
                            <BlogCard
                                compact
                                key={post.id}
                                post={post}
                                onPress={() => router.push(`/blog/${post.id}`)}
                            />
                        ))}
                    </HomeSection>
                )}
            </TabScrollView>
        </Screen>
    )
}
