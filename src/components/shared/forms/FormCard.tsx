import type { ReactNode } from 'react'
import { StyleSheet } from 'react-native'
import Card from '../cards/Card'
import Text from '../typography/Text'

export default function FormCard({
    title,
    description,
    children,
}: {
    title?: string
    description?: string
    children: ReactNode
}) {
    return (
        <Card
            padding={24}
            radius={28}
            borderWidth={1}
            borderColor="rgba(255,255,255,0.18)"
            backgroundColor="#2B3F4E"
            gradient={{
                colors: ['rgba(255,255,255,0.14)', 'rgba(255,255,255,0)'],
                start: { x: 0, y: 0 },
                end: { x: 1, y: 1 },
            }}
            style={styles.card}
        >
            {title && <Text style={styles.title}>{title}</Text>}
            {description && (
                <Text style={styles.description}>{description}</Text>
            )}
            {children}
        </Card>
    )
}
const styles = StyleSheet.create({
    card: { gap: 16 },
    title: {
        fontFamily: 'Manrope_600SemiBold',
        fontSize: 24,
        lineHeight: 32,
        color: '#FFFFFF',
    },
    description: {
        fontFamily: 'Manrope_400Regular',
        fontSize: 14,
        lineHeight: 21,
        color: '#BCCAD5',
    },
})
