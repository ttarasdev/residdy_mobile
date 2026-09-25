import {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
    type ReactNode,
} from 'react'
import {
    Animated,
    AppState,
    Easing,
    StyleSheet,
    View,
    type DimensionValue,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import useAccessibilityPreferences from '../../../shared/hooks/useAccessibilityPreferences'

const Progress = createContext<Animated.Value | null>(null)

/** One native shimmer animation shared by every block in the group. */
export function SkeletonGroup({
    children,
    active = true,
}: {
    children: ReactNode
    active?: boolean
}) {
    const progress = useRef(new Animated.Value(-1)).current
    const { reduceMotion } = useAccessibilityPreferences()
    useEffect(() => {
        let animation: Animated.CompositeAnimation | undefined
        function update(state: string) {
            animation?.stop()
            progress.setValue(-1)
            if (!active || reduceMotion || state !== 'active') return
            animation = Animated.loop(
                Animated.timing(progress, {
                    toValue: 1,
                    duration: 1600,
                    easing: Easing.linear,
                    useNativeDriver: true,
                    isInteraction: false,
                }),
            )
            animation.start()
        }
        update(AppState.currentState)
        const listener = AppState.addEventListener('change', update)
        return () => {
            listener.remove()
            animation?.stop()
        }
    }, [active, progress, reduceMotion])
    return (
        <Progress.Provider value={progress}>
            <View
                accessibilityElementsHidden
                importantForAccessibility="no-hide-descendants"
                style={{ gap: 16 }}
            >
                {children}
            </View>
        </Progress.Provider>
    )
}

export default function Skeleton({
    width = '100%',
    height = 12,
    radius = 6,
}: {
    width?: DimensionValue
    height?: number
    radius?: number
}) {
    const progress = useContext(Progress)
    const [measuredWidth, setMeasuredWidth] = useState(0)
    return (
        <View
            onLayout={(event) =>
                setMeasuredWidth(event.nativeEvent.layout.width)
            }
            style={{
                width,
                height,
                borderRadius: radius,
                overflow: 'hidden',
                backgroundColor: 'rgba(255,255,255,0.12)',
            }}
        >
            {progress && measuredWidth > 0 && (
                <Animated.View
                    style={[
                        StyleSheet.absoluteFill,
                        {
                            transform: [
                                {
                                    translateX: progress.interpolate({
                                        inputRange: [-1, 1],
                                        outputRange: [
                                            -measuredWidth,
                                            measuredWidth,
                                        ],
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    <LinearGradient
                        colors={[
                            'rgba(255,255,255,0)',
                            'rgba(255,255,255,0.17)',
                            'rgba(255,255,255,0)',
                        ]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={StyleSheet.absoluteFill}
                    />
                </Animated.View>
            )}
        </View>
    )
}
