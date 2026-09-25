import { useState } from 'react'
import { ScrollView, View, Pressable, StyleSheet } from 'react-native'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { useBottomTabBarHeight } from 'expo-router/tabs'
import { useTranslation } from 'react-i18next'
import { blogPostsApi } from '../../api/blog-posts/blog-posts.api'
import { blogCategoriesApi } from '../../api/blog-categories/blog-categories.api'
import useApi from '../../shared/hooks/useApi'
import Screen from '../shared/layout/Screen'
import TabScrollView from '../shared/layout/TabScrollView'
import TabHeader from '../navigation/TabHeader'
import Text from '../shared/typography/Text'
import QueryState from '../shared/content/QueryState'
import OutlineButton from '../shared/buttons/OutlineButton'
import { contentStyles as s } from '../shared/content/content.styles'
import BlogCard from './BlogCard'
import BlogSkeleton from './BlogSkeleton'
import { categoryName } from './blog-content'

export default function Blog() {
    const { t } = useTranslation()
    const { account, options, lan } = useApi()
    const [categoryId, setCategoryId] = useState<number>()
    const router = useRouter()
    const bottom = useBottomTabBarHeight()
    const categories = useQuery({
        queryKey: ['blog', account?.account.id, 'categories'],
        queryFn: async ({ signal }) => {
            const rows = []
            let offset = 0
            while (true) {
                const page = await blogCategoriesApi.findAll({ offset, limit: 100 }, { ...options, signal })
                rows.push(...page.rows)
                offset += page.rows.length
                if (!page.rows.length || offset >= page.total) return rows.sort((a, b) => a.sort_key - b.sort_key)
            }
        },
    })
    const posts = useInfiniteQuery({
        queryKey: ['blog', account?.account.id, 'posts', lan, categoryId],
        initialPageParam: 0,
        queryFn: ({ pageParam, signal }) => blogPostsApi.findAll({ lan, categoryId, offset: pageParam, limit: 12 }, { ...options, signal }),
        getNextPageParam: page => page.rows.length && page.offset + page.rows.length < page.total ? page.offset + page.rows.length : undefined,
    })
    const rows = posts.data?.pages.flatMap(page => page.rows) ?? []
    const tabs = [{ id: undefined, label: t('blogUi.all') }, ...(categories.data ?? []).map(category => ({ id: category.id, label: categoryName(category, lan) }))]
    return <Screen edges={['top', 'left', 'right']} paddingHorizontal={0} paddingTop={0} paddingBottom={0} gap={0}>
        <TabHeader title={t('navigation.blog')} />
        <TabScrollView queryRoots={['blog']} contentContainerStyle={{ paddingBottom: bottom + 20, gap: 20 }}>
            <View style={styles.intro}>
                <Text accessibilityRole="header" style={styles.title}>{t('blogUi.title')}</Text>
                <Text style={[s.body, { textAlign: 'center' }]}>{t('blogUi.subtitle')}</Text>
            </View>
            <ScrollView horizontal style={{ flexGrow: 0, flexShrink: 0 }} showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 8, alignItems: 'center' }}>
                {tabs.map(tab => <Pressable key={tab.id ?? 'all'} accessibilityRole="tab" accessibilityState={{ selected: categoryId === tab.id }} onPress={() => setCategoryId(tab.id)} style={[styles.chip, categoryId === tab.id && styles.selected]}>
                    <Text style={[s.body, { color: categoryId === tab.id ? '#1D3548' : '#FFFFFF', fontFamily: 'Manrope_600SemiBold' }]}>{tab.label}</Text>
                </Pressable>)}
            </ScrollView>
            <View style={{ paddingHorizontal: 20, gap: 20 }}>
                <QueryState error={categories.error} retry={() => { void categories.refetch() }} />
                <QueryState error={posts.error} retry={() => { void posts.refetch() }} empty={posts.isSuccess && !rows.length ? t('blogUi.empty') : undefined} />
                {posts.isPending && <BlogSkeleton />}
                {rows.map(post => <BlogCard key={post.id} post={post} onPress={() => router.push(`/blog/${post.id}`)} />)}
                {posts.hasNextPage && <OutlineButton loading={posts.isFetchingNextPage} onPress={() => { void posts.fetchNextPage() }}>{t('blogUi.more')}</OutlineButton>}
            </View>
        </TabScrollView>
    </Screen>
}
const styles = StyleSheet.create({
    intro: { paddingHorizontal: 24, paddingTop: 8, gap: 10, alignItems: 'center' },
    title: { color: '#FFFFFF', fontFamily: 'Manrope_600SemiBold', fontSize: 28, lineHeight: 38, textAlign: 'center' },
    chip: { paddingHorizontal: 18, paddingVertical: 11, borderRadius: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.18)', backgroundColor: 'rgba(255,255,255,0.07)' },
    selected: { backgroundColor: '#DDE9F0', borderColor: '#DDE9F0' },
})
