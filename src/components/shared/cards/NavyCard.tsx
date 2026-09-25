import { colors } from '../../../shared/styles/constants.styles'
import Card, { type CardProps } from './Card'

export default function NavyCard(props: CardProps) {
    return <Card backgroundColor={colors.navy} {...props} />
}
