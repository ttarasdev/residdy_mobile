import { colors } from '../../../shared/styles/constants.styles'
import Button, { type ButtonProps } from './Button'

export default function LightButton(props: ButtonProps) {
    return <Button backgroundColor={colors.white} color={colors.ink} {...props} />
}
