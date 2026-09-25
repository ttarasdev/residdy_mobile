import { StyleSheet, View, type ViewProps } from 'react-native'
import { SafeAreaView, type Edge } from 'react-native-safe-area-context'

interface ScreenProps extends ViewProps {
    paddingHorizontal?: number
    paddingTop?: number
    paddingBottom?: number
    gap?: number
    edges?: Edge[]
}

export default function Screen({
    children,
    paddingHorizontal = 20,
    paddingTop = 16,
    paddingBottom = 16,
    gap = 16,
    edges = ['top', 'right', 'bottom', 'left'],
    style,
    ...props
}: ScreenProps) {
    return (
        <SafeAreaView edges={edges} style={styles.fill}>
            <View
                {...props}
                style={[styles.fill, { paddingHorizontal, paddingTop, paddingBottom, gap }, style]}
            >
                {children}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    fill: { flex: 1, backgroundColor: 'transparent' },
})
