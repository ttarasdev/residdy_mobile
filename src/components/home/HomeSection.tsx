import type { ReactNode } from 'react'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import Text from '../shared/typography/Text'
import Button from '../shared/buttons/Button'
import { contentStyles as s } from '../shared/content/content.styles'
export default function HomeSection({
    title,
    accent = '#8DE8F5',
    onMore,
    children,
}: {
    title: string
    accent?: string
    onMore?: () => void
    children: ReactNode
}) {
    const { t } = useTranslation()
    return (
        <View style={{ gap: 14 }}>
            <View style={[s.row, { justifyContent: 'space-between' }]}>
                <View style={{ width: 4, height: 20, borderRadius: 2, backgroundColor: accent }} />
                <Text
                    accessibilityRole="header"
                    style={[s.title, { flex: 1, fontSize: 18 }]}
                >
                    {title}
                </Text>
                {onMore && (
                    <Button
                        height={44}
                        padding={10}
                        color={accent}
                        textStyle={{ fontSize: 12 }}
                        onPress={onMore}
                    >
                        {t('homeUi.all')}
                    </Button>
                )}
            </View>
            {children}
        </View>
    )
}
