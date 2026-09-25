import Text from '../typography/Text'
import type { ReactNode } from 'react'
import { LinearGradient, type LinearGradientProps } from 'expo-linear-gradient'
import { ActivityIndicator, Pressable, StyleSheet, View, type PressableProps, type StyleProp, type TextStyle, type ViewStyle } from 'react-native'

export interface ButtonProps extends Omit<PressableProps, 'children'> {
    children?: ReactNode
    loading?: boolean
    color?: string
    backgroundColor?: ViewStyle['backgroundColor']
    borderColor?: ViewStyle['borderColor']
    borderWidth?: number
    borderStyle?: ViewStyle['borderStyle']
    radius?: number
    padding?: number
    height?: number
    width?: ViewStyle['width']
    gradient?: Pick<LinearGradientProps, 'colors' | 'start' | 'end' | 'locations'> | false
    textStyle?: StyleProp<TextStyle>
    startIcon?: ReactNode
    endIcon?: ReactNode
}

export default function Button({
    children, loading = false, disabled = false, color = '#FFFFFF',
    backgroundColor = 'transparent', borderColor, borderWidth = 0, borderStyle = 'solid',
    radius = 27, padding = 20, height = 54, width, gradient, textStyle,
    startIcon, endIcon, style, accessibilityState, ...props
}: ButtonProps) {
    const blocked = disabled || loading

    return (
        <Pressable
            accessibilityRole="button"
            {...props}
            disabled={blocked}
            accessibilityState={{ ...accessibilityState, disabled: blocked, busy: loading }}
            style={(state) => [
                styles.button,
                { backgroundColor, borderColor, borderWidth, borderStyle, borderRadius: radius, paddingHorizontal: padding, minHeight: height, width },
                typeof style === 'function' ? style(state) : style,
                { opacity: blocked ? 0.45 : state.pressed ? 0.7 : 1 },
            ]}
        >
            {gradient && <LinearGradient {...gradient} pointerEvents="none" style={[StyleSheet.absoluteFill, { borderRadius: radius }]} />}
            <View pointerEvents="none" style={[styles.content, loading && styles.hidden]}>
                {startIcon}
                {typeof children === 'string' || typeof children === 'number'
                    ? <Text style={[styles.label, { color }, textStyle]}>{children}</Text>
                    : children}
                {endIcon}
            </View>
            {loading && <ActivityIndicator color={color} style={StyleSheet.absoluteFill} />}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: { alignItems: 'center', justifyContent: 'center', paddingVertical: 12 },
    content: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
    label: { fontSize: 16, fontFamily: 'Manrope_600SemiBold', textAlign: 'center', flexShrink: 1 },
    hidden: { opacity: 0 },
})
