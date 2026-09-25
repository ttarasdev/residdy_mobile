import { colors } from '../../../shared/styles/constants.styles'
import Button, { type ButtonProps } from './Button'

export default function DarkButton(props: ButtonProps) {
    return <Button backgroundColor={colors.ink} {...props} />
}
