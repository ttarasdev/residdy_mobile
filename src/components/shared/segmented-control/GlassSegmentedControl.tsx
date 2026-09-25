import { useEffect, useRef, useState } from 'react'
import { Animated, Image, Pressable, StyleSheet, View, type ImageSourcePropType } from 'react-native'
import type { BlurViewProps } from 'expo-blur'
import GlassCard from '../cards/GlassCard'
import Card from '../cards/Card'
import Text from '../typography/Text'
import useAccessibilityPreferences from '../../../shared/hooks/useAccessibilityPreferences'

type Item<T extends string> = { value: T; label: string; icon?: ImageSourcePropType }
interface Props<T extends string> {
    items: readonly Item<T>[]
    value: T
    onChange: (value: T) => void
    blurTarget?: BlurViewProps['blurTarget']
}

export default function GlassSegmentedControl<T extends string>({ items, value, onChange, blurTarget }: Props<T>) {
    const { reduceMotion, reduceTransparency } = useAccessibilityPreferences()
    const [width, setWidth] = useState(0)
    const position = useRef(new Animated.Value(0)).current
    const previousWidth = useRef(0)
    const index = items.findIndex(item => item.value === value)
    const itemWidth = items.length ? width / items.length : 0

    useEffect(() => {
        const x = Math.max(index, 0) * itemWidth
        const resized = previousWidth.current !== width
        previousWidth.current = width
        if (reduceMotion || resized) { position.setValue(x); return }
        const animation = Animated.spring(position, {
            toValue: x, damping: 26, stiffness: 220, mass: 0.8, useNativeDriver: true,
        })
        animation.start()
        return () => animation.stop()
    }, [index, itemWidth, width, position, reduceMotion])

    const content = <View style={styles.row} onLayout={event => setWidth(event.nativeEvent.layout.width)}>
        {width > 0 && index >= 0 && <Animated.View pointerEvents="none" style={[styles.focus, {
            width: itemWidth, transform: [{ translateX: position }],
        }]} />}
        {items.map(item => <Pressable key={item.value} accessibilityRole="tab" accessibilityLabel={item.label}
            accessibilityState={{ selected: value === item.value }}
            onPress={() => { if (item.value !== value) onChange(item.value) }}
            style={({ pressed }) => [styles.item, { opacity: pressed ? 0.65 : 1 }]}>
            {item.icon && <Image source={item.icon} accessible={false} resizeMode="contain"
                style={[styles.icon, { opacity: value === item.value ? 1 : 0.6 }]} />}
            <Text style={[styles.label, value === item.value && styles.active]}>{item.label}</Text>
        </Pressable>)}
    </View>

    return reduceTransparency
        ? <Card padding={4} radius={28} backgroundColor="#243B4B" borderWidth={1} borderColor="#526B7C">{content}</Card>
        : <GlassCard padding={4} radius={28} tint="dark" intensity={35} blurTarget={blurTarget}
            backgroundColor="transparent" borderColor="rgba(255,255,255,0.22)"
            gradient={{ colors: ['rgba(255,255,255,0.048)', 'rgba(255,255,255,0.014)'], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } }}>
            {content}
        </GlassCard>
}

const styles = StyleSheet.create({
    row: { flexDirection: 'row' },
    item: { flex: 1, flexDirection: 'row', gap: 3, minHeight: 44, paddingHorizontal: 4, paddingVertical: 12, justifyContent: 'center', alignItems: 'center' },
    icon: { width: 22, height: 22, tintColor: '#FFFFFF', flexShrink: 0 },
    label: { flexShrink: 1, fontSize: 12, lineHeight: 18, color: 'rgba(255,255,255,0.65)', textAlign: 'center' },
    active: { color: '#FFFFFF' },
    focus: { position: 'absolute', top: 0, bottom: 0, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.18)' },
})
