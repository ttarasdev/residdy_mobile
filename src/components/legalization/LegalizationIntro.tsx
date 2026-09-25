import { StyleSheet, View } from 'react-native'
import Text from '../shared/typography/Text'
import Button from '../shared/buttons/Button'

interface Props {
    title: string
    buttonLabel: string
    onPress?: () => void
}

/** Shared introductory block; actions are wired as each section is implemented. */
export default function LegalizationIntro({ title, buttonLabel, onPress }: Props) {
    return <View style={styles.container}>
        <Text accessibilityRole="header" style={styles.title}>{title}</Text>
        <Button height={40} radius={20} padding={24} backgroundColor="rgba(255,255,255,0.14)" onPress={onPress}
            textStyle={styles.buttonLabel} style={styles.button}>
            {buttonLabel}
        </Button>
    </View>
}

const styles = StyleSheet.create({
    container: { alignItems: 'center', gap: 16, paddingTop: 8, paddingBottom: 24 },
    title: { color: '#FFFFFF', fontFamily: 'Manrope_600SemiBold', fontSize: 28, lineHeight: 38, textAlign: 'center' },
    button: { maxWidth: '100%', paddingVertical: 8 },
    buttonLabel: { fontFamily: 'Manrope_400Regular', fontSize: 14, lineHeight: 20 },
})
