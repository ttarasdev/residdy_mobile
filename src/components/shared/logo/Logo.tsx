import { Image, type ImageProps } from 'react-native'

interface LogoProps extends Omit<ImageProps, 'source'> {
    variant?: 'wordmark' | 'mark'
    width?: number
    color?: string
}

export default function Logo({ variant = 'wordmark', width = 220, color, style, ...props }: LogoProps) {
    return (
        <Image
            accessibilityLabel="Residdy"
            {...props}
            source={variant === 'mark'
                ? require('../../../../assets/logos/logo_r_white.png')
                : require('../../../../assets/logos/logo_residdy_white.png')}
            resizeMode="contain"
            style={[{ width, height: variant === 'mark' ? width : width * 65 / 220, tintColor: color }, style]}
        />
    )
}
