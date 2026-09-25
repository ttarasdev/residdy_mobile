import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import Button from '../buttons/Button'
import { languages, setLanguage } from '../../../i18n'

export default function LanguageSwitcher() {
    const { t, i18n } = useTranslation()
    return <View style={{ flexDirection: 'row', gap: 2 }} accessibilityLabel={t('language.choose')}>
        {languages.map(({ code, label }) => <Button key={code}
            accessibilityLabel={label} accessibilityState={{ selected: i18n.language === code }}
            backgroundColor={i18n.language === code ? 'rgba(255,255,255,0.16)' : 'transparent'}
            height={44} width={42} padding={0} radius={14} textStyle={{ fontSize: 12 }}
            onPress={() => { void setLanguage(code) }}>
            {code === 'uk' ? 'UA' : code.toUpperCase()}
        </Button>)}
    </View>
}
