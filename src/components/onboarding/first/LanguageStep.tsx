import Text from '../../shared/typography/Text'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { languages, setLanguage } from '../../../i18n'
import Card from '../../shared/cards/Card'
import Floating from '../../shared/animation/Floating'
import OnboardingIcon from './OnboardingIcon'
import { firstOnboardingStyles as s } from './first-onboarding.styles'

const codes = { pl: 'PL', uk: 'UA', en: 'EN', ru: 'RU' }
export default function LanguageStep({ active }: { active: boolean }) {
    const { t, i18n } = useTranslation()
    const [failed, setFailed] = useState(false)
    return <View style={s.page}>
        <View style={s.heading}>
            <Floating active={active} distance={2}>
                <View style={styles.globe}><OnboardingIcon name="globe" size={68} /></View>
            </Floating>
            <Text accessibilityRole="header" style={s.title}>{t('onboarding.language.title')}</Text>
            <Text style={s.description}>{t('onboarding.language.description')}</Text>
        </View>
        <View accessibilityRole="radiogroup" accessibilityLabel={t('language.choose')} style={{ gap: 10 }}>
            {languages.map(language => {
                const selected = i18n.resolvedLanguage === language.code
                const color = selected ? '#172936' : '#FFFFFF'
                return <Card key={language.code} padding={14} radius={20}
                    backgroundColor={selected ? '#EDF2F7' : 'rgba(255,255,255,0.055)'}
                    borderWidth={1} borderColor={selected ? '#FFFFFF' : 'rgba(255,255,255,0.16)'}
                    accessibilityRole="radio" accessibilityState={{ checked: selected }}
                    accessibilityLabel={language.label}
                    onPress={() => { setFailed(false); void setLanguage(language.code).catch(() => setFailed(true)) }}>
                    <View style={s.row}>
                        <View style={[s.circle, { backgroundColor: selected ? '#DCE5EC' : 'rgba(255,255,255,0.08)', width: 40, height: 40 }]}>
                            <Text style={[s.small, { color }]}>{codes[language.code]}</Text>
                        </View>
                        <View style={s.grow}>
                            <Text style={[s.label, { color }]}>{language.label}</Text>
                            <Text style={[s.small, { color: selected ? '#526372' : '#CFD9E1' }]}>{t(`onboarding.language.names.${language.code}`)}</Text>
                        </View>
                        <View style={[styles.radio, selected && styles.selected]}>
                            {selected && <OnboardingIcon name="check" size={18} />}
                        </View>
                    </View>
                </Card>
            })}
        </View>
        <Text style={[s.description, { fontSize: 12 }]}>{t(failed ? 'onboarding.saveError' : 'onboarding.language.hint')}</Text>
    </View>
}
const styles = StyleSheet.create({
    globe: { width: 88, height: 88, borderRadius: 44, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', backgroundColor: 'rgba(255,255,255,0.06)', alignItems: 'center', justifyContent: 'center' },
    radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 1, borderColor: 'rgba(255,255,255,0.4)', alignItems: 'center', justifyContent: 'center' },
    selected: { backgroundColor: '#243B4B', borderColor: '#243B4B' },
})
