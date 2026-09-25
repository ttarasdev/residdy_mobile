import { Image, type ImageSourcePropType } from 'react-native'
import Button, { type ButtonProps } from './Button'

export interface IconButtonProps extends Omit<ButtonProps, 'children' | 'startIcon' | 'endIcon'> {
    icon: ImageSourcePropType
    accessibilityLabel: string
    size?: number
    iconSize?: number
}

export default function IconButton({
    icon, size = 44, iconSize = 28, color = '#FFFFFF', ...props
}: IconButtonProps) {
    return (
        <Button
            width={size}
            height={size}
            radius={size / 2}
            padding={0}
            backgroundColor="rgba(255,255,255,0.12)"
            color={color}
            style={{ paddingVertical: 0 }}
            {...props}
        >
            <Image accessible={false} source={icon} resizeMode="contain" style={{ width: iconSize, height: iconSize, tintColor: color }} />
        </Button>
    )
}
