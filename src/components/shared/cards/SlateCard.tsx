import { colors } from '../../../shared/styles/constants.styles'
import Card, { type CardProps } from './Card'

export default function SlateCard(props: CardProps) {
    return <Card backgroundColor={colors.slate} radius={26} {...props} />
}
