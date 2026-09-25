import { colors } from '../../../shared/styles/constants.styles'
import Card, { type CardProps } from './Card'

export default function PaperCard(props: CardProps) {
    return <Card backgroundColor={colors.paper} {...props} />
}
