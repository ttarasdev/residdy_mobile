import { StyleSheet } from 'react-native'
import { colors } from '../../../shared/styles/constants.styles'

export const firstOnboardingStyles = StyleSheet.create({
    page: { width: '100%', maxWidth: 440, alignSelf: 'center', gap: 24 },
    heading: { gap: 12, alignItems: 'center' },
    title: { fontFamily: 'Manrope_600SemiBold', fontSize: 30, lineHeight: 39, textAlign: 'center', color: colors.white },
    description: { fontFamily: 'Manrope_400Regular', fontSize: 14, lineHeight: 22, color: '#CED9E2', textAlign: 'center' },
    label: { fontFamily: 'Manrope_600SemiBold', fontSize: 15, color: colors.white },
    small: { fontFamily: 'Manrope_400Regular', fontSize: 12, lineHeight: 18, color: '#D4DFE8' },
    eyebrow: { fontFamily: 'Manrope_600SemiBold', fontSize: 10, letterSpacing: 1, color: '#CFDBE4' },
    cardTitle: { fontFamily: 'Manrope_600SemiBold', fontSize: 22, color: colors.white },
    row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    grow: { flex: 1, gap: 4 },
    circle: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.12)' },
    divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.14)', marginVertical: 14 },
})
