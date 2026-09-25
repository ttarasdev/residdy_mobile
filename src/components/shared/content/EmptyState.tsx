import { Image, StyleSheet, type ImageSourcePropType } from 'react-native'
import GlassCard from '../cards/GlassCard'
import Text from '../typography/Text'

export default function EmptyState({
    title,
    icon,
}: {
    title: string
    icon?: ImageSourcePropType
}) {
    return (
        <GlassCard padding={28} style={styles.card}>
            {icon && <Image source={icon} style={styles.icon} />}
            <Text style={styles.title}>{title}</Text>
        </GlassCard>
    )
}
const styles = StyleSheet.create({
    card: {
        alignItems: 'center',
        gap: 16,
        minHeight: 150,
        justifyContent: 'center',
    },
    icon: { width: 36, height: 36, opacity: 0.7 },
    title: {
        color: '#DDE7EF',
        fontFamily: 'Manrope_600SemiBold',
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'center',
    },
})
