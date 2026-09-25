import type { ReactNode } from 'react'
import { LinearGradient, type LinearGradientProps } from 'expo-linear-gradient'
import { Pressable, StyleSheet, View, type PressableProps, type ViewProps, type ViewStyle } from 'react-native'

export type CardGradient = Pick<LinearGradientProps, 'colors' | 'locations' | 'start' | 'end'>

export interface CardProps extends ViewProps {
    children?: ReactNode
    padding?: ViewStyle['padding']
    radius?: number
    width?: ViewStyle['width']
    height?: ViewStyle['height']
    backgroundColor?: ViewStyle['backgroundColor']
    borderColor?: ViewStyle['borderColor']
    borderWidth?: number
    gradient?: CardGradient | false
    /** Decorative layer behind the gradient and content, e.g. blur. */
    background?: ReactNode
    onPress?: PressableProps['onPress']
    disabled?: boolean
}

export default function Card({
    children,
    padding = 20,
    radius = 24,
    width,
    height,
    backgroundColor = 'transparent',
    borderColor,
    borderWidth = 0,
    gradient,
    background,
    onPress,
    disabled,
    style,
    ...props
}: CardProps) {
    const cardStyle = [
        { padding, borderRadius: radius, width, height, backgroundColor, borderColor, borderWidth },
        style,
        styles.clip,
    ]
    const content = (
        <>
            {background != null && (
                <View pointerEvents="none" style={StyleSheet.absoluteFill}>
                    {background}
                </View>
            )}
            {gradient && (
                <LinearGradient {...gradient} pointerEvents="none" style={StyleSheet.absoluteFill} />
            )}
            {children}
        </>
    )

    if (onPress) {
        return (
            <Pressable
                accessibilityRole="button"
                {...props}
                onPress={onPress}
                disabled={disabled}
                style={cardStyle}
            >
                {content}
            </Pressable>
        )
    }

    return <View {...props} style={cardStyle}>{content}</View>
}

const styles = StyleSheet.create({
    clip: { overflow: 'hidden' },
})
