import { StyleSheet } from 'react-native'

export const authStyles = StyleSheet.create({
    page: { width: '100%', maxWidth: 440, alignSelf: 'center', flexGrow: 1, paddingHorizontal: 20, paddingTop: 12, paddingBottom: 28, gap: 28 },
    body: { flexGrow: 1, justifyContent: 'center', gap: 28 },
    header: { gap: 12 },
    title: { color: '#FFFFFF', fontSize: 28, lineHeight: 37, fontFamily: 'Manrope_600SemiBold' },
    description: { color: '#BDC9D1', fontSize: 14, lineHeight: 21, fontFamily: 'Manrope_400Regular' },
    form: { gap: 22 },
    fields: { gap: 20 },
    error: { color: '#F2BFC3', fontSize: 13, lineHeight: 19, fontFamily: 'Manrope_400Regular' },
    success: { color: '#D9EAF4', fontSize: 14, lineHeight: 21, fontFamily: 'Manrope_400Regular' },
    link: { color: '#C1D7EC', fontSize: 13, fontFamily: 'Manrope_600SemiBold' },
    legal: { color: '#CED8E1', fontSize: 12, lineHeight: 19, fontFamily: 'Manrope_400Regular' },
    cardTitle: { color: '#111D25', fontSize: 16, fontFamily: 'Manrope_600SemiBold' },
    cardLink: { color: '#385771', fontSize: 14, fontFamily: 'Manrope_600SemiBold' },
})
