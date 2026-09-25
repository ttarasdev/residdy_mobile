import { BlurView, type BlurViewProps } from 'expo-blur'
import { StyleSheet, View } from 'react-native'
import { colors } from '../../../shared/styles/constants.styles'
import Card, { type CardGradient, type CardProps } from './Card'

export interface GlassCardProps extends Omit<CardProps, 'background'> {
    intensity?: BlurViewProps['intensity']
    tint?: BlurViewProps['tint']
    /** Android: reference to the background's BlurTargetView. */
    blurTarget?: BlurViewProps['blurTarget']
}

const glassGradient: CardGradient = {
    colors: ['rgba(255, 255, 255, 0.22)', 'rgba(164, 187, 212, 0.07)'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
}

export default function GlassCard({
    intensity = 30,
    tint = 'light',
    blurTarget,
    backgroundColor = 'transparent',
    ...props
}: GlassCardProps) {
    return (
        <Card
            radius={26}
            borderWidth={1}
            borderColor={colors.glassBorder}
            gradient={glassGradient}
            {...props}
            backgroundColor="transparent"
            background={
                <>
                    <BlurView
                        style={StyleSheet.absoluteFill}
                        intensity={intensity}
                        tint={tint}
                        blurTarget={blurTarget}
                        blurMethod={blurTarget ? 'dimezisBlurViewSdk31Plus' : 'none'}
                    />
                    <View style={[StyleSheet.absoluteFill, { backgroundColor }]} />
                </>
            }
        />
    )
}
