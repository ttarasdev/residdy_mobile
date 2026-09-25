import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import Skeleton, { SkeletonGroup } from '../shared/loading/Skeleton'

export default function SearchLoading() {
    const { t } = useTranslation()
    return (
        <View
            accessible
            accessibilityLabel={t('search.loading')}
            accessibilityState={{ busy: true }}
            accessibilityLiveRegion="polite"
        >
            <SkeletonGroup>
                {[0, 1, 2].map((row) => (
                    <View
                        key={row}
                        style={{
                            height: 76,
                            paddingHorizontal: 16,
                            justifyContent: 'center',
                            gap: 10,
                            borderRadius: 16,
                            backgroundColor: 'rgba(255,255,255,0.07)',
                        }}
                    >
                        <Skeleton width="66%" height={12} />
                        <Skeleton width="44%" height={8} radius={4} />
                    </View>
                ))}
            </SkeletonGroup>
        </View>
    )
}
