import { useEffect, useRef, useState, type ReactNode } from 'react'
import { FlatList, ScrollView, StyleSheet, View } from 'react-native'
import useAccessibilityPreferences from '../../../shared/hooks/useAccessibilityPreferences'

interface Props<T extends string> {
    pages: readonly T[]
    index: number
    onChange: (index: number) => void
    renderPage: (page: T, active: boolean) => ReactNode
}
/** Horizontal paging with independent vertical scrolling for small screens and large text. */
export default function OnboardingPager<T extends string>({ pages, index, onChange, renderPage }: Props<T>) {
    const list = useRef<FlatList<T>>(null)
    const [width, setWidth] = useState(0)
    const { reduceMotion } = useAccessibilityPreferences()
    const previousWidth = useRef(0)
    useEffect(() => {
        if (!width) return
        list.current?.scrollToOffset({ offset: index * width, animated: !reduceMotion && previousWidth.current === width })
        previousWidth.current = width
    }, [index, width, reduceMotion])
    return <View style={styles.fill} onLayout={event => setWidth(event.nativeEvent.layout.width)}>
        {width > 0 && <FlatList
            ref={list}
            data={pages}
            extraData={index}
            horizontal
            pagingEnabled
            directionalLockEnabled
            nestedScrollEnabled
            bounces={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={page => page}
            getItemLayout={(_, itemIndex) => ({ length: width, offset: width * itemIndex, index: itemIndex })}
            onMomentumScrollEnd={event => onChange(Math.max(0, Math.min(pages.length - 1, Math.round(event.nativeEvent.contentOffset.x / width))))}
            renderItem={({ item, index: pageIndex }) => <View
                style={{ width, flex: 1 }}
                accessibilityElementsHidden={pageIndex !== index}
                importantForAccessibility={pageIndex === index ? 'auto' : 'no-hide-descendants'}
            >
                <ScrollView directionalLockEnabled nestedScrollEnabled contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                    {renderPage(item, pageIndex === index)}
                </ScrollView>
            </View>}
        />}
    </View>
}
const styles = StyleSheet.create({
    fill: { flex: 1 },
    content: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 28, paddingVertical: 16 },
})
