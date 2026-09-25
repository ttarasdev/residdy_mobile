import { Image, View } from 'react-native'
import { useRouter, type Href } from 'expo-router'
import { useTranslation } from 'react-i18next'
import Card from '../shared/cards/Card'
import Text from '../shared/typography/Text'
const actions = [
    {
        key: 'newCase',
        href: '/cases/new',
        color: '#8DE8F5',
        tint: 'rgba(36,172,216,0.34)',
        icon: require('../../../assets/system_icons/multi/onboarding-business-white.png'),
    },
    {
        key: 'document',
        href: '/documents/new',
        color: '#C8B5FF',
        tint: 'rgba(132,96,217,0.34)',
        icon: require('../../../assets/system_icons/multi/onboarding-document-white.png'),
    },
    {
        key: 'consultation',
        href: '/consultations',
        color: '#FFD39B',
        tint: 'rgba(215,143,69,0.28)',
        icon: require('../../../assets/system_icons/multi/onboarding-consultant-white.png'),
    },
]
export default function HomeQuickActions() {
    const { t } = useTranslation()
    const router = useRouter()
    return (
        <View style={{ flexDirection: 'row', gap: 10 }}>
            {actions.map((action) => (
                <Card
                    key={action.key}
                    onPress={() => router.push(action.href as Href)}
                    padding={12}
                    radius={24}
                    backgroundColor="rgba(17,40,63,0.42)"
                    gradient={{
                        colors: [action.tint, 'rgba(22,45,68,0.08)'],
                        start: { x: 0, y: 0 },
                        end: { x: 1, y: 1 },
                    }}
                    borderWidth={1}
                    borderColor={action.tint}
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        gap: 12,
                        minHeight: 100,
                    }}
                >
                    <Image
                        source={action.icon}
                        resizeMode="contain"
                        style={{ width: 28, height: 28, tintColor: action.color }}
                    />
                    <Text
                        style={{
                            color: '#EAF2F8',
                            textAlign: 'center',
                            fontSize: 11,
                            lineHeight: 16,
                            fontFamily: 'Manrope_600SemiBold',
                        }}
                    >
                        {t(`homeUi.${action.key}`)}
                    </Text>
                </Card>
            ))}
        </View>
    )
}
