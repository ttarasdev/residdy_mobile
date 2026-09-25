import { useEffect, useRef, type ReactNode } from 'react'
import {
    ActivityIndicator,
    Animated,
    PanResponder,
    Pressable,
    StyleSheet,
    View,
} from 'react-native'
import Text from '../typography/Text'

const actionWidth = 104
const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

/** A horizontal reveal only: a full swipe never performs the destructive action. */
export default function SwipeActionRow({
    children,
    label,
    open,
    onOpenChange,
    onAction,
    busy = false,
    disabled = false,
    tone = 'danger',
}: {
    children: ReactNode
    label: string
    open: boolean
    onOpenChange: (open: boolean) => void
    onAction: () => void
    busy?: boolean
    disabled?: boolean
    tone?: 'danger' | 'neutral'
}) {
    const x = useRef(new Animated.Value(0)).current
    const start = useRef(0)
    const current = useRef({ open, onOpenChange, disabled })
    current.current = { open, onOpenChange, disabled }
    const settle = (value: boolean) =>
        Animated.timing(x, {
            toValue: value ? -actionWidth : 0,
            duration: 160,
            useNativeDriver: false,
        }).start()
    useEffect(() => {
        settle(open)
    }, [open])
    const responder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, { dx, dy }) =>
                !current.current.disabled &&
                Math.abs(dx) > 10 &&
                Math.abs(dx) > Math.abs(dy) * 1.5 &&
                (dx < 0 || current.current.open),
            onPanResponderGrant: () => {
                x.stopAnimation()
                start.current = current.current.open ? -actionWidth : 0
            },
            onPanResponderMove: (_, { dx }) =>
                x.setValue(
                    Math.max(-actionWidth, Math.min(0, start.current + dx)),
                ),
            onPanResponderRelease: (_, { dx, vx }) => {
                const next =
                    vx < -0.4 ||
                    (vx <= 0.4 && start.current + dx < -actionWidth / 2)
                current.current.onOpenChange(next)
                settle(next)
            },
            onPanResponderTerminate: () => settle(current.current.open),
        }),
    ).current
    return (
        <View
            style={styles.container}
            accessibilityActions={[
                { name: tone === 'danger' ? 'delete' : 'activate', label },
            ]}
            onAccessibilityAction={({ nativeEvent }) => {
                if (
                    nativeEvent.actionName ===
                        (tone === 'danger' ? 'delete' : 'activate') &&
                    !disabled
                )
                    onAction()
            }}
        >
            <AnimatedPressable
                accessibilityRole="button"
                accessibilityLabel={label}
                accessibilityElementsHidden={!open}
                importantForAccessibility={open ? 'yes' : 'no-hide-descendants'}
                disabled={!open || disabled}
                onPress={onAction}
                style={[
                    styles.action,
                    {
                        opacity: x.interpolate({
                            inputRange: [-8, 0],
                            outputRange: [1, 0],
                            extrapolate: 'clamp',
                        }),
                    },
                    tone === 'neutral' && {
                        backgroundColor: 'rgba(94,180,211,0.12)',
                        borderColor: 'rgba(130,206,233,0.45)',
                    },
                ]}
            >
                {busy ? (
                    <ActivityIndicator color="#FFFFFF" />
                ) : (
                    <Text style={styles.label}>{label}</Text>
                )}
            </AnimatedPressable>
            <Animated.View
                {...responder.panHandlers}
                style={{ transform: [{ translateX: x }] }}
                onStartShouldSetResponderCapture={() => {
                    if (!open) return false
                    onOpenChange(false)
                    return true
                }}
            >
                {children}
            </Animated.View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: { borderRadius: 26, overflow: 'hidden' },
    action: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: actionWidth - 8,
        backgroundColor: 'rgba(224, 83, 99, 0.07)',
        borderColor: 'rgba(224, 83, 99, 0.7)',
        borderWidth: 1,
        borderRadius: 26,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
    },
    label: {
        color: '#FFFFFF',
        fontFamily: 'Manrope_600SemiBold',
        fontSize: 13,
        textAlign: 'center',
    },
})
