import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import type {
    SearchGroup,
    SearchItem,
    SearchType,
} from '../../api/search/search.types'
import SearchResultCard from './SearchResultCard'
import Text from '../shared/typography/Text'
import OutlineButton from '../shared/buttons/OutlineButton'
import { contentStyles as s } from '../shared/content/content.styles'
export default function SearchResults({
    groups,
    onSelect,
    onGroup,
    selectedType,
    openingId,
}: {
    groups: SearchGroup[]
    onSelect: (item: SearchItem) => void
    onGroup: (type: SearchType) => void
    selectedType?: SearchType
    openingId?: number
}) {
    const { t } = useTranslation()
    return (
        <View style={{ gap: 28 }}>
            {groups.map((group) => (
                <View key={group.type} style={{ gap: 12 }}>
                    <Text accessibilityRole="header" style={s.title}>
                        {t(`search.groups.${group.type}`)}
                    </Text>
                    {group.items.map((item) => (
                        <SearchResultCard
                            key={item.type === 'screen' ? item.key : item.id}
                            item={item}
                            onPress={() => onSelect(item)}
                            loading={
                                item.type === 'user_document' &&
                                item.id === openingId
                            }
                        />
                    ))}
                    {!selectedType && group.hasMore && (
                        <OutlineButton
                            height={40}
                            onPress={() => onGroup(group.type)}
                        >
                            {t('search.showAll')}
                        </OutlineButton>
                    )}
                </View>
            ))}
        </View>
    )
}
