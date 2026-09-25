import { useEffect, useRef } from 'react'
import { Animated, Easing, StyleSheet, View } from 'react-native'
import Logo from '../shared/logo/Logo'

export default function IntroAnimation({ onFinish }: { onFinish: () => void }) {
    const markOpacity = useRef(new Animated.Value(0)).current
    const scale = useRef(new Animated.Value(1)).current
    const translateX = useRef(new Animated.Value(0)).current
    const wordWidth = useRef(new Animated.Value(0)).current
    const wordOpacity = useRef(new Animated.Value(0)).current
    const opacity = useRef(new Animated.Value(1)).current

    useEffect(() => {
        const animation = Animated.sequence([
            Animated.timing(markOpacity, { toValue: 1, duration: 220, useNativeDriver: true }),
            Animated.delay(1500),
            Animated.timing(scale, { toValue: 0.48, duration: 700, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
            Animated.parallel([
                Animated.timing(translateX, { toValue: -95, duration: 600, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
                Animated.timing(wordWidth, { toValue: 220, duration: 600, easing: Easing.out(Easing.cubic), useNativeDriver: false }),
                Animated.timing(wordOpacity, { toValue: 1, duration: 320, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
            ]),
            Animated.parallel([
                Animated.timing(markOpacity, { toValue: 0, duration: 220, useNativeDriver: true }),
                Animated.timing(opacity, { toValue: 0, duration: 260, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
            ]),
        ])
        animation.start(({ finished }) => { if (finished) onFinish() })
        return () => animation.stop()
    }, [onFinish, markOpacity, scale, translateX, wordWidth, wordOpacity, opacity])

    return (
        <Animated.View style={[styles.screen, { opacity }]} accessibilityLabel="Residdy">
            <View style={styles.center}>
                <View style={styles.wordPosition}>
                    <Animated.View style={{ opacity: wordOpacity }}>
                        <Animated.View style={[styles.reveal, { width: wordWidth }]}>
                            <Logo width={220} />
                        </Animated.View>
                    </Animated.View>
                </View>
                <Animated.View style={{ opacity: markOpacity, transform: [{ translateX }, { translateY: -5 }, { scale }] }}>
                    <Logo variant="mark" width={100} />
                </Animated.View>
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    screen: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    center: { alignItems: 'center', justifyContent: 'center' },
    wordPosition: { position: 'absolute', left: 0, right: 0, alignItems: 'center' },
    reveal: { height: 65, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' },
})
