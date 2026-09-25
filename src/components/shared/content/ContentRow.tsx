import { publicAssetUrl } from '../../../shared/utils/public-asset-url'
import { getApiUrl } from '../../../shared/config/api'
import { ActivityIndicator, Image, View } from 'react-native'
import SlateCard from '../cards/SlateCard'
import Text from '../typography/Text'
import { contentStyles as s } from './content.styles'
export default function ContentRow({
    title,
    subtitle,
    icon,
    onPress,
    selected = false,
    loading = false,
}: {
    title: string
    subtitle?: string
    icon?: string
    onPress?: () => void
    selected?: boolean
    loading?: boolean
}) {
    return (
        <SlateCard
            padding={18}
            onPress={onPress}
            borderWidth={selected ? 1 : 0}
            borderColor="#BDD9EA"
            style={s.row}
        >
            {icon && (
                <Image
                    source={{ uri: publicAssetUrl(icon, getApiUrl()) }}
                    style={{ width: 38, height: 38 }}
                    resizeMode="contain"
                />
            )}
            <View style={{ flex: 1, gap: 5 }}>
                <Text style={s.title}>{title}</Text>
                {subtitle && <Text style={s.small}>{subtitle}</Text>}
            </View>
            {loading ? (
                <ActivityIndicator color="#BDD9EA" />
            ) : (
                onPress && <Text style={s.title}>›</Text>
            )}
        </SlateCard>
    )
}
