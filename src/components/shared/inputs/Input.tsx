import Text from '../typography/Text'
import TextInput from '../typography/TextInput'
import { useState, type ReactNode, type Ref } from 'react'
import { Image, StyleSheet, View, type ImageSourcePropType, type TextInputProps, type StyleProp, type ViewStyle } from 'react-native'

export interface InputProps extends TextInputProps {
    label: string
    hideLabel?: boolean
    fieldStyle?: StyleProp<ViewStyle>
    error?: string
    icon?: ImageSourcePropType
    right?: ReactNode
    containerStyle?: StyleProp<ViewStyle>
    ref?: Ref<TextInput>
}
export default function Input({ label, hideLabel = false, fieldStyle, error, icon, right, containerStyle, style, onFocus, onBlur, editable = true, ref, ...props }: InputProps) {
    const [focused, setFocused] = useState(false)
    return (
        <View style={[styles.group, containerStyle]}>
            {!hideLabel && <Text style={styles.label}>{label}</Text>}
            <View style={[styles.field, fieldStyle, focused && styles.focused, !!error && styles.invalid, !editable && styles.disabled]}>
                {icon && <Image accessible={false} source={icon} style={styles.icon} />}
                <TextInput
                    ref={ref}
                    accessibilityLabel={label}
                    accessibilityHint={error}
                    placeholderTextColor="#A4B6C5"
                    selectionColor="#D9EAF4"
                    autoCapitalize="none"
                    autoCorrect={false}
                    {...props}
                    editable={editable}
                    onFocus={(event) => { setFocused(true); onFocus?.(event) }}
                    onBlur={(event) => { setFocused(false); onBlur?.(event) }}
                    style={[styles.input, style]}
                />
                {right}
            </View>
            {error && <Text accessibilityLiveRegion="polite" style={styles.error}>{error}</Text>}
        </View>
    )
}
const styles = StyleSheet.create({
    group: { gap: 8 },
    label: { color: '#CFD8E0', fontFamily: 'Manrope_400Regular', fontSize: 12 },
    field: { minHeight: 57, borderRadius: 18, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: 'rgba(255,255,255,0.07)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.18)' },
    focused: { borderColor: '#C1D7EC', backgroundColor: 'rgba(255,255,255,0.11)' },
    invalid: { borderColor: '#D78187' },
    disabled: { opacity: 0.5 },
    icon: { width: 24, height: 24, tintColor: '#CCD9E4' },
    input: { flex: 1, minWidth: 0, color: '#FFFFFF', fontFamily: 'Manrope_400Regular', fontSize: 14, paddingVertical: 14 },
    error: { color: '#F2BFC3', fontSize: 12, fontFamily: 'Manrope_400Regular' },
})
