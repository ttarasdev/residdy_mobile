import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Animated, AppState, Easing, type StyleProp, type ViewStyle } from 'react-native'
import useAccessibilityPreferences from '../../../shared/hooks/useAccessibilityPreferences'

/** Small native movement; stops off screen, in the background and for Reduce Motion. */
export default function Floating({ children, active = true, distance = 3, duration = 2600, style }: {
    children: ReactNode
    active?: boolean
    distance?: number
    duration?: number
    style?: StyleProp<ViewStyle>
}) {
    const value = useRef(new Animated.Value(0)).current
    const { reduceMotion } = useAccessibilityPreferences()
    const [foreground, setForeground] = useState(AppState.currentState === 'active')
    useEffect(() => {
        const listener = AppState.addEventListener('change', state => setForeground(state === 'active'))
        return () => listener.remove()
    }, [])
    useEffect(() => {
        value.setValue(0)
        if (!active || !foreground || reduceMotion) return
        const timing = (toValue: number) => Animated.timing(value, {
            toValue, duration, easing: Easing.inOut(Easing.sin), useNativeDriver: true, isInteraction: false,
        })
        const animation = Animated.loop(Animated.sequence([timing(-distance), timing(distance), timing(0)]))
        animation.start()
        return () => { animation.stop(); value.setValue(0) }
    }, [active, foreground, reduceMotion, distance, duration, value])
    return <Animated.View style={[style, { transform: [{ translateY: value }] }]}>{children}</Animated.View>
}
