import type { ReactNode } from 'react'
import { Image, StyleSheet, View, type ImageSourcePropType } from 'react-native'
import Card from '../cards/Card'
import Text from '../typography/Text'
import Button from '../buttons/Button'

export interface MessageCardProps {
    title: string
    message?: string
    tone?: 'glass' | 'warning'
    icon?: ImageSourcePropType
    action?: { label: string; onPress: () => void; loading?: boolean }
    secondaryAction?: { label: string; onPress: () => void }
    children?: ReactNode
}

export default function MessageCard({
    title,
    message,
    tone = 'glass',
    icon,
    action,
    secondaryAction,
    children,
}: MessageCardProps) {
    const warning = tone === 'warning'
    const color = warning ? '#18242D' : '#FFFFFF'
    return (
        <Card
            padding={20}
            radius={26}
            backgroundColor={warning ? '#EEDAC6' : '#2E4353'}
            borderWidth={warning ? 0 : 1}
            borderColor="rgba(255,255,255,0.18)"
            gradient={
                warning
                    ? false
                    : {
                          colors: [
                              'rgba(255,255,255,0.13)',
                              'rgba(255,255,255,0)',
                          ],
                          start: { x: 0, y: 0 },
                          end: { x: 1, y: 1 },
                      }
            }
            style={styles.card}
        >
            {(icon || warning) && (
                <Image
                    accessible={false}
                    source={
                        icon ??
                        require('../../../../assets/system_icons/multi/warning-ink.png')
                    }
                    style={[styles.icon, { tintColor: color }]}
                />
            )}
            <Text accessibilityRole="header" style={[styles.title, { color }]}>
                {title}
            </Text>
            {message && (
                <Text
                    style={[
                        styles.message,
                        { color: warning ? '#62707B' : '#C3CFD8' },
                    ]}
                >
                    {message}
                </Text>
            )}
            {children}
            {(action || secondaryAction) && (
                <View style={styles.actions}>
                    {action && (
                        <Button
                            height={48}
                            backgroundColor={warning ? '#141E25' : '#F5F7FA'}
                            color={warning ? '#FFFFFF' : '#18242D'}
                            textStyle={styles.button}
                            onPress={action.onPress}
                            loading={action.loading}
                        >
                            {action.label}
                        </Button>
                    )}
                    {secondaryAction && (
                        <Button
                            height={44}
                            color={color}
                            textStyle={styles.button}
                            onPress={secondaryAction.onPress}
                        >
                            {secondaryAction.label}
                        </Button>
                    )}
                </View>
            )}
        </Card>
    )
}
const styles = StyleSheet.create({
    card: { gap: 12 },
    icon: { width: 36, height: 36 },
    title: { fontFamily: 'Manrope_600SemiBold', fontSize: 22, lineHeight: 29 },
    message: { fontFamily: 'Manrope_400Regular', fontSize: 14, lineHeight: 21 },
    actions: { gap: 4, marginTop: 4 },
    button: { fontSize: 14 },
})
