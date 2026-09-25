import Text from '../../shared/typography/Text'
import { useCallback, useRef, useState } from 'react'
import { BackHandler, StyleSheet, View } from 'react-native'
import { useFocusEffect, useIsFocused } from 'expo-router'
import { useTranslation } from 'react-i18next'
import Screen from '../../shared/layout/Screen'
import Logo from '../../shared/logo/Logo'
import LightButton from '../../shared/buttons/LightButton'
import Button from '../../shared/buttons/Button'
import BackButton from '../../shared/buttons/BackButton'
import OnboardingPager from '../../shared/onboarding/OnboardingPager'
import OnboardingProgress from '../../shared/onboarding/OnboardingProgress'
import LanguageStep from './LanguageStep'
import FeatureArtwork from './FeatureArtwork'
import OnboardingIcon from './OnboardingIcon'
import { firstOnboardingStyles as s } from './first-onboarding.styles'

const pages = ['language', 'legalization', 'documents', 'consultations', 'partners'] as const
export default function FirstOnboarding({ onComplete }: { onComplete: () => Promise<void> }) {
    const { t } = useTranslation()
    const focused = useIsFocused()
    const [index, setIndex] = useState(0)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState(false)
    const finishing = useRef(false)
    useFocusEffect(useCallback(() => {
        const listener = BackHandler.addEventListener('hardwareBackPress', () => {
            if (finishing.current) return true
            if (index === 0) return false
            setIndex(value => value - 1)
            return true
        })
        return () => listener.remove()
    }, [index]))
    async function finish() {
        if (finishing.current) return
        finishing.current = true
        setSaving(true)
        setError(false)
        try { await onComplete() }
        catch { setError(true) }
        finally { finishing.current = false; setSaving(false) }
    }
    return <Screen paddingHorizontal={0} paddingTop={0} paddingBottom={12} gap={0}>
        <View style={styles.header}>
            <Logo width={78} />
            {index > 0 && <Button height={48} padding={8} style={{ flexShrink: 1 }} disabled={saving} onPress={() => void finish()} textStyle={{ fontSize: 13 }}>{t('onboarding.skip')}</Button>}
        </View>
        <OnboardingPager pages={pages} index={index} onChange={setIndex} renderPage={(page, active) =>
            page === 'language' ? <LanguageStep active={active && focused} /> : <View style={s.page}>
                <FeatureArtwork feature={page} active={active && focused} />
                <View style={s.heading}>
                    <Text accessibilityRole="header" style={s.title}>{t(`onboarding.${page}.title`)}</Text>
                    <Text style={s.description}>{t(`onboarding.${page}.description`)}</Text>
                </View>
            </View>
        } />
        <View style={styles.footer}>
            <OnboardingProgress count={pages.length} index={index} label={t('onboarding.progress', { current: index + 1, total: pages.length })} />
            {error && <Text accessibilityRole="alert" style={s.description}>{t('onboarding.saveError')}</Text>}
            <View style={s.row}>
                {index > 0 && <BackButton size={54} disabled={saving} accessibilityLabel={t('navigation.back')} onPress={() => setIndex(value => Math.max(0, value - 1))} />}
                <LightButton style={{ flex: 1 }} loading={saving} onPress={() => index === pages.length - 1 ? void finish() : setIndex(value => Math.min(pages.length - 1, value + 1))}
                    endIcon={<OnboardingIcon name="arrow" size={24} color="#243B4B" />}>
                    {t(index === 0 ? 'onboarding.continue' : index === pages.length - 1 ? 'onboarding.start' : 'onboarding.next')}
                </LightButton>
            </View>
        </View>
    </Screen>
}
const styles = StyleSheet.create({
    header: { minHeight: 52, marginHorizontal: 28, gap: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    footer: { width: '100%', maxWidth: 496, alignSelf: 'center', paddingHorizontal: 28, paddingTop: 8, gap: 12 },
})
