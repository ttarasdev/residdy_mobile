import { StyleSheet, View } from 'react-native'

export default function PaginationDots({ count, index, label }: { count: number; index: number; label: string }) {
    return <View accessible accessibilityRole="progressbar" accessibilityLabel={label}
        accessibilityValue={{ min: 1, max: count, now: index + 1 }} style={styles.row}>
        {Array.from({ length: count }, (_, step) => <View key={step}
            style={[styles.dot, step === index && styles.active]} />)}
    </View>
}
const styles = StyleSheet.create({
    row: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 7, minHeight: 24 },
    dot: { width: 6, height: 6, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.3)' },
    active: { width: 22, backgroundColor: '#FFFFFF' },
})
