import { useContext, useEffect, useRef, useState } from 'react'
import { Animated, Image, Pressable, ScrollView, StyleSheet, View, type ImageSourcePropType } from 'react-native'
import { BottomTabBarHeightCallbackContext, type BottomTabBarProps } from 'expo-router/tabs'
import type { BlurViewProps } from 'expo-blur'
import GlassCard from '../shared/cards/GlassCard'
import Card from '../shared/cards/Card'
import { useBackgroundBlurTarget } from '../shared/layout/ScreenBackground'
import useAccessibilityPreferences from '../../shared/hooks/useAccessibilityPreferences'

const icons: Record<string, ImageSourcePropType> = {
    home: require('../../../assets/system_icons/menu/home-white.png'),
    legalization: require('../../../assets/system_icons/menu/legalization-white.png'),
    blog: require('../../../assets/system_icons/menu/blog-white.png'),
    profile: require('../../../assets/system_icons/menu/profile-white.png'),
    partners: require('../../../assets/system_icons/menu/partners-white.png'),
}

function TabIcon({ icon, active, reduceMotion }: { icon: ImageSourcePropType; active: boolean; reduceMotion: boolean }) {
    const scale = useRef(new Animated.Value(active ? 1.1 : 1)).current
    useEffect(() => {
        if (reduceMotion) { scale.setValue(1); return }
        const animation = Animated.spring(scale, { toValue: active ? 1.1 : 1, damping: 20, stiffness: 240, mass: 0.7, useNativeDriver: true })
        animation.start()
        return () => animation.stop()
    }, [active, reduceMotion, scale])
    return <Animated.View style={{ transform: [{ scale }] }}>
        <Image source={icon} accessible={false} style={{ width: 32, height: 32, tintColor: '#FFFFFF' }} resizeMode="contain" />
    </Animated.View>
}

export default function GlassTabBar({ state, descriptors, navigation, insets, contentBlurTarget, overlay = false }: BottomTabBarProps & { contentBlurTarget?: BlurViewProps['blurTarget']; overlay?: boolean }) {
    const { reduceMotion, reduceTransparency } = useAccessibilityPreferences()
    const backgroundBlurTarget = useBackgroundBlurTarget()
    const blurTarget = contentBlurTarget ?? backgroundBlurTarget
    const reportHeight = useContext(BottomTabBarHeightCallbackContext)
    const [width, setWidth] = useState(0)
    const scroll = useRef<ScrollView>(null)
    const position = useRef(new Animated.Value(0)).current
    const previousWidth = useRef(0)
    const itemWidth = width ? Math.max(width / state.routes.length, 48) : 48
    const contentWidth = itemWidth * state.routes.length

    useEffect(() => {
        if (!width) return
        const x = state.index * itemWidth
        const resized = previousWidth.current !== width
        previousWidth.current = width
        scroll.current?.scrollTo({ x: Math.max(0, Math.min(x - (width - itemWidth) / 2, contentWidth - width)), animated: !reduceMotion && !resized })
        if (reduceMotion || resized) { position.setValue(x); return }
        const animation = Animated.spring(position, { toValue: x, damping: 26, stiffness: 220, mass: 0.8, useNativeDriver: true })
        animation.start()
        return () => animation.stop()
    }, [state.index, itemWidth, width, contentWidth, reduceMotion, position, overlay, reduceTransparency])

    const surface = <ScrollView ref={scroll} style={styles.scroll} horizontal showsHorizontalScrollIndicator={contentWidth > width + 1}
        scrollEnabled={contentWidth > width + 1} bounces={false} onLayout={(event) => setWidth(event.nativeEvent.layout.width)}>
        <View style={[styles.row, { width: contentWidth }]}>
            {width > 0 && <Animated.View pointerEvents="none" style={[styles.focus, { width: itemWidth - 6.4, transform: [{ translateX: position }] }]} />}
            {state.routes.map((route, index) => {
                const active = state.index === index
                const options = descriptors[route.key].options
                const label = options.title ?? route.name
                return <Pressable key={route.key} accessibilityRole="tab" accessibilityState={{ selected: active }}
                    accessibilityLabel={options.tabBarAccessibilityLabel ?? label}
                    testID={options.tabBarButtonTestID}
                    onPress={() => {
                        const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true })
                        if (!active && !event.defaultPrevented) navigation.navigate(route.name, route.params)
                    }}
                    onLongPress={() => navigation.emit({ type: 'tabLongPress', target: route.key })}
                    style={({ pressed }) => [styles.tab, { width: itemWidth, opacity: pressed ? 0.7 : 1 }]}>
                    <TabIcon icon={icons[route.name]} active={active} reduceMotion={reduceMotion} />
                </Pressable>
            })}
        </View>
    </ScrollView>
    return <View onLayout={(event) => reportHeight?.(event.nativeEvent.layout.height)} style={{ flexShrink: 0, zIndex: 10, ...(overlay ? { position: 'absolute' as const, bottom: 0, left: 0, right: 0 } : {}), paddingLeft: Math.max(insets.left, 16), paddingRight: Math.max(insets.right, 16), paddingTop: 8, paddingBottom: Math.max(insets.bottom, 10) }}>
        {reduceTransparency
            ? <Card width="95%" style={{ alignSelf: 'center' }} padding={7} radius={36} backgroundColor="#243B4B" borderWidth={1} borderColor="#526B7C">{surface}</Card>
            : <GlassCard width="95%" style={{ alignSelf: 'center' }} padding={7} radius={36} tint="dark" intensity={35} blurTarget={blurTarget}
                backgroundColor="transparent" borderColor="rgba(255,255,255,0.3)"
                gradient={{ colors: ['rgba(255,255,255,0.048)', 'rgba(255,255,255,0.014)'], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } }}>
                {surface}
            </GlassCard>}
    </View>
}

const styles = StyleSheet.create({
    scroll: { flexGrow: 0, flexShrink: 0, minHeight: 56 },
    row: { flexDirection: 'row', alignItems: 'stretch' },
    tab: { minHeight: 56, minWidth: 48, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4, paddingVertical: 10, gap: 8 },
    focus: { position: 'absolute', left: 3.2, top: 0, bottom: 0, borderRadius: 28, backgroundColor: 'rgba(255,255,255,0.35)' },
})
