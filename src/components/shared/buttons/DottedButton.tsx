import { colors } from '../../../shared/styles/constants.styles'
import Button, { type ButtonProps } from './Button'

export default function DottedButton(props: ButtonProps) {
    return <Button borderWidth={1} borderColor={colors.white} borderStyle="dotted" {...props} />
}
