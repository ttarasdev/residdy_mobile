import { StyleSheet, View } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { useLocalSearchParams } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { blogPostsApi } from '../../api/blog-posts/blog-posts.api'
import useApi from '../../shared/hooks/useApi'
import DetailScreen from '../shared/layout/DetailScreen'
import PrivateImage from '../shared/media/PrivateImage'
import QueryState from '../shared/content/QueryState'
import RichText from '../shared/content/RichText'
import Text from '../shared/typography/Text'
import { contentStyles as s } from '../shared/content/content.styles'
import { articleDate, categoryName } from './blog-content'

export default function BlogArticle() {
    const { id } = useLocalSearchParams<{ id: string }>()
    const postId = Number(id)
    const valid = Number.isSafeInteger(postId) && postId > 0
    const { account, options, lan } = useApi()
    const { t, i18n } = useTranslation()
    const query = useQuery({
        queryKey: ['blog', account?.account.id, 'article', postId],
        enabled: valid,
        queryFn: ({ signal }) => blogPostsApi.findOne(postId, { ...options, signal }),
    })
    const post = query.data
    return <DetailScreen title={t('navigation.blog')}>
        <QueryState loading={valid && query.isPending} error={query.error} retry={() => { void query.refetch() }} empty={!valid ? t('blogUi.unavailable') : undefined} />
        {post && <>
            <Text style={s.small}>{[post.categories?.map(category => categoryName(category, lan)).filter(Boolean).join(' · '), articleDate(post.publishedAt, i18n.language)].filter(Boolean).join(' · ')}</Text>
            <Text accessibilityRole="header" style={[s.heading, { fontSize: 28, lineHeight: 38 }]}>{post.title}</Text>
            <View style={{ aspectRatio: 0.95, borderRadius: 28, overflow: 'hidden', backgroundColor: '#395B73' }}>
                <PrivateImage variantId={post.variantId} size="large" resizeMode="cover" style={StyleSheet.absoluteFill} />
            </View>
            <RichText content={post.contentJson} />
        </>}
    </DetailScreen>
}
