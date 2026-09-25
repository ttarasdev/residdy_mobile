import { useEffect, useRef, useState, type ReactNode } from 'react'
import { AccessibilityInfo, Animated } from 'react-native'

interface FadeSwapProps<T extends string> {
    value: T
    children: (value: T) => ReactNode
    duration?: number
}

/** Fade out, replace content at its natural height, then fade in. */
export default function FadeSwap<T extends string>({ value, children, duration = 120 }: FadeSwapProps<T>) {
    const [displayed, setDisplayed] = useState(value)
    const [reduceMotion, setReduceMotion] = useState(true)
    const opacity = useRef(new Animated.Value(1)).current

    useEffect(() => {
        let active = true
        let changed = false
        void AccessibilityInfo.isReduceMotionEnabled().then((enabled) => {
            if (active && !changed) setReduceMotion(enabled)
        }).catch(() => {})
        const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', (enabled) => {
            changed = true
            setReduceMotion(enabled)
        })
        return () => { active = false; subscription.remove() }
    }, [])

    useEffect(() => {
        if (reduceMotion) {
            setDisplayed(value)
            opacity.setValue(1)
            return
        }
        const animation = Animated.timing(opacity, {
            toValue: displayed === value ? 1 : 0,
            duration,
            useNativeDriver: true,
        })
        animation.start(({ finished }) => {
            if (finished && displayed !== value) setDisplayed(value)
        })
        return () => animation.stop()
    }, [value, displayed, duration, opacity, reduceMotion])

    return <Animated.View style={{ opacity }} pointerEvents={displayed === value ? 'auto' : 'none'}>
        {children(displayed)}
    </Animated.View>
}
