import { createContext, useContext, useRef } from 'react'
import { BlurTargetView, type BlurViewProps } from 'expo-blur'
import { LinearGradient } from 'expo-linear-gradient'
import { StatusBar, type StatusBarStyle } from 'expo-status-bar'
import { StyleSheet, View, type ViewProps } from 'react-native'

const BlurTargetContext = createContext<BlurViewProps['blurTarget']>(undefined)
export const useBackgroundBlurTarget = () => useContext(BlurTargetContext)

interface ScreenBackgroundProps extends ViewProps {
    statusBarStyle?: StatusBarStyle
}

// Initial blue palette; refine the stops when comparing the screen with Figma.
const gradient = {
    colors: ['#425E72', '#243B4B', '#111D25'],
    locations: [0, 0.45, 1],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
} as const

export default function ScreenBackground({
    children,
    statusBarStyle = 'light',
    style,
    ...props
}: ScreenBackgroundProps) {
    const blurTarget = useRef<View>(null)
    return (
        <BlurTargetContext.Provider value={blurTarget}>
        <View {...props} style={[styles.root, style]}>
            <BlurTargetView ref={blurTarget} pointerEvents="none" style={StyleSheet.absoluteFill}>
                <LinearGradient {...gradient} style={StyleSheet.absoluteFill} />
            </BlurTargetView>
            <StatusBar style={statusBarStyle} />
            {children}
        </View>
        </BlurTargetContext.Provider>
    )
}

const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: '#111D25' },
})
