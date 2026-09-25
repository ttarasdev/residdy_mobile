import type { ReactNode } from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'

interface CheckboxProps { checked: boolean; onChange: (checked: boolean) => void; label: string; children: ReactNode; disabled?: boolean }
export default function Checkbox({ checked, onChange, label, children, disabled }: CheckboxProps) {
    return <View style={styles.row}>
        <Pressable accessibilityRole="checkbox" accessibilityLabel={label} accessibilityState={{ checked, disabled }} disabled={disabled} onPress={() => onChange(!checked)} style={styles.touch}>
            <View style={[styles.box, checked && styles.checked]}>{checked && <Image source={require('../../../../assets/system_icons/multi/check-white.png')} style={styles.icon} />}</View>
        </Pressable>
        <View style={styles.content}>{children}</View>
    </View>
}
const styles = StyleSheet.create({
    row: { flexDirection: 'row', alignItems: 'center', gap: 4 }, touch: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
    box: { width: 22, height: 22, borderRadius: 6, borderWidth: 1, borderColor: '#A4B6C5', alignItems: 'center', justifyContent: 'center' },
    checked: { backgroundColor: '#425E72', borderColor: '#FFFFFF' }, icon: { width: 18, height: 18 }, content: { flex: 1 },
})
