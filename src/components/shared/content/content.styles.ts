import { StyleSheet } from 'react-native'
export const contentStyles = StyleSheet.create({
    row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    heading: {
        color: '#FFFFFF',
        fontFamily: 'Manrope_600SemiBold',
        fontSize: 22,
        lineHeight: 30,
    },
    title: {
        color: '#FFFFFF',
        fontFamily: 'Manrope_600SemiBold',
        fontSize: 16,
        lineHeight: 23,
    },
    body: {
        color: '#D3DEE6',
        fontFamily: 'Manrope_400Regular',
        fontSize: 14,
        lineHeight: 22,
    },
    small: {
        color: '#AFC2D0',
        fontFamily: 'Manrope_400Regular',
        fontSize: 12,
        lineHeight: 18,
    },
    list: { gap: 12 },
})
