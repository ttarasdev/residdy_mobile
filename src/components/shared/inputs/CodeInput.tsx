import Text from '../typography/Text'
import TextInput from '../typography/TextInput'
import { useRef, useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'

interface CodeInputProps { label: string; value: string; onChangeText: (value: string) => void; error?: string; disabled?: boolean }
export default function CodeInput({ label, value, onChangeText, error, disabled }: CodeInputProps) {
    const input = useRef<TextInput>(null)
    const [focused, setFocused] = useState(false)
    return (
        <View style={{ gap: 8 }}>
            <Text style={styles.label}>{label}</Text>
            <Pressable onPress={() => input.current?.focus()} accessible={false} style={{ opacity: disabled ? 0.5 : 1 }}>
                <View pointerEvents="none" style={styles.row} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
                    {Array.from({ length: 6 }, (_, index) => <View key={index} style={[styles.box, focused && index === Math.min(value.length, 5) && styles.focused, !!error && styles.invalid]}><Text style={styles.digit}>{value[index] ?? '–'}</Text></View>)}
                </View>
                <TextInput ref={input} accessibilityLabel={label} accessibilityHint={error} value={value} editable={!disabled}
                    onChangeText={(text) => onChangeText(text.replace(/\D/g, '').slice(0, 6))}
                    keyboardType="number-pad" textContentType="oneTimeCode" autoComplete="one-time-code" maxLength={6}
                    onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} caretHidden
                    style={styles.input} />
            </Pressable>
            {error && <Text accessibilityLiveRegion="polite" style={styles.error}>{error}</Text>}
        </View>
    )
}
const styles = StyleSheet.create({
    row: { flexDirection: 'row', gap: 8 },
    box: { flex: 1, height: 59, borderRadius: 13, borderWidth: 1, borderColor: 'rgba(255,255,255,0.18)', backgroundColor: 'rgba(255,255,255,0.08)', alignItems: 'center', justifyContent: 'center' },
    focused: { borderColor: '#C1D7EC' }, invalid: { borderColor: '#D78187' },
    digit: { color: '#FFFFFF', fontSize: 22, fontFamily: 'Manrope_600SemiBold' },
    label: { color: '#CFD8E0', fontSize: 12, fontFamily: 'Manrope_400Regular' },
    input: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, opacity: 0.02, color: 'transparent' },
    error: { color: '#F2BFC3', fontSize: 12 },
})
