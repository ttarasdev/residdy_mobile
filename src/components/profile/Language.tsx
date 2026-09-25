import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import {
    languages,
    setLanguage,
    type Language as LanguageCode,
} from '../../i18n'
import useApi from '../../shared/hooks/useApi'
import { userApi } from '../../api/user/user.api'
import DetailScreen from '../shared/layout/DetailScreen'
import { ActivityIndicator, Image, View } from 'react-native'
import Card from '../shared/cards/Card'
import Text from '../shared/typography/Text'
import { contentStyles as s } from '../shared/content/content.styles'
import QueryState from '../shared/content/QueryState'
export default function Language() {
    const { t, i18n } = useTranslation()
    const { options } = useApi()
    const client = useQueryClient()
    const change = useMutation({
        mutationFn: async (code: LanguageCode) => {
            await userApi.updateMe(
                {
                    lan:
                        code === 'uk'
                            ? 'UA'
                            : (code.toUpperCase() as 'PL' | 'EN' | 'RU'),
                },
                options,
            )
            await setLanguage(code)
        },
        onSuccess: () => client.invalidateQueries({ queryKey: ['user-me'] }),
    })
    return (
        <DetailScreen title={t('workspace.language')}>
            {languages.map((language) => (
                <Card
                    key={language.code}
                    padding={20}
                    radius={22}
                    backgroundColor={
                        i18n.language === language.code
                            ? '#EDF2F7'
                            : 'rgba(255,255,255,0.07)'
                    }
                    disabled={change.isPending}
                    onPress={() => {
                        if (i18n.language !== language.code)
                            change.mutate(language.code)
                    }}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 18,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 14,
                            fontFamily: 'Manrope_600SemiBold',
                            color:
                                i18n.language === language.code
                                    ? '#405568'
                                    : '#A9BCCA',
                        }}
                    >
                        {language.code.toUpperCase()}
                    </Text>
                    <Text
                        style={[
                            s.title,
                            {
                                flex: 1,
                                color:
                                    i18n.language === language.code
                                        ? '#18242D'
                                        : '#FFFFFF',
                            },
                        ]}
                    >
                        {language.label}
                    </Text>
                    {change.isPending && change.variables === language.code ? (
                        <ActivityIndicator color="#9EBACF" />
                    ) : (
                        i18n.language === language.code && (
                            <Image
                                source={require('../../../assets/system_icons/multi/check-white.png')}
                                style={{
                                    width: 22,
                                    height: 22,
                                    tintColor: '#253B4C',
                                }}
                            />
                        )
                    )}
                </Card>
            ))}
            <QueryState error={change.error} />
        </DetailScreen>
    )
}
