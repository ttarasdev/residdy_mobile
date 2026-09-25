import { useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { BlurTargetView } from 'expo-blur'
import { useTranslation } from 'react-i18next'
import type { BlogPost } from '../../api/models'
import useApi from '../../shared/hooks/useApi'
import Card from '../shared/cards/Card'
import GlassCard from '../shared/cards/GlassCard'
import PrivateImage from '../shared/media/PrivateImage'
import Text from '../shared/typography/Text'
import { contentStyles as s } from '../shared/content/content.styles'
import { articleDate, categoryName } from './blog-content'

export default function BlogCard({
    post,
    onPress,
    compact = false,
}: {
    post: BlogPost
    onPress: () => void
    compact?: boolean
}) {
    const target = useRef<View | null>(null)
    const [footerHeight, setFooterHeight] = useState(130)
    const { lan } = useApi()
    const { i18n } = useTranslation()
    const category = post.categories
        ?.map((item) => categoryName(item, lan))
        .filter(Boolean)
        .join(' · ')
    return (
        <Card
            padding={0}
            radius={28}
            onPress={onPress}
            accessibilityLabel={post.title}
            borderWidth={1}
            borderColor="rgba(255,255,255,0.16)"
        >
            <BlurTargetView
                ref={target}
                style={[styles.photo, compact && { height: 260 }]}
            >
                <PrivateImage
                    variantId={post.variantId}
                    size="large"
                    resizeMode="cover"
                    style={StyleSheet.absoluteFill}
                />
            </BlurTargetView>
            <GlassCard
                blurTarget={target}
                intensity={42}
                tint="dark"
                radius={0}
                padding={20}
                borderWidth={0}
                backgroundColor="rgba(16,34,49,0.38)"
                style={{ marginTop: -footerHeight, gap: 8 }}
                onLayout={(event) =>
                    setFooterHeight(event.nativeEvent.layout.height)
                }
            >
                {!!category && (
                    <Text numberOfLines={1} style={styles.category}>
                        {category}
                    </Text>
                )}
                <Text
                    accessibilityRole="header"
                    numberOfLines={compact ? 2 : 3}
                    style={compact ? s.title : s.heading}
                >
                    {post.title}
                </Text>
                <Text style={s.small}>
                    {articleDate(post.publishedAt, i18n.language)}
                </Text>
            </GlassCard>
        </Card>
    )
}
const styles = StyleSheet.create({
    photo: { height: 440, backgroundColor: '#395B73' },
    category: {
        color: '#DFEBF2',
        fontFamily: 'Manrope_600SemiBold',
        fontSize: 12,
        lineHeight: 18,
    },
})
