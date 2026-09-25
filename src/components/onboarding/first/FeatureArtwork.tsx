import Text from '../../shared/typography/Text'
import type { ReactNode } from 'react'
import { StyleSheet, View, useWindowDimensions, type ViewStyle } from 'react-native'
import { useTranslation } from 'react-i18next'
import GlassCard from '../../shared/cards/GlassCard'
import SlateCard from '../../shared/cards/SlateCard'
import PaperCard from '../../shared/cards/PaperCard'
import Floating from '../../shared/animation/Floating'
import { useBackgroundBlurTarget } from '../../shared/layout/ScreenBackground'
import useAccessibilityPreferences from '../../../shared/hooks/useAccessibilityPreferences'
import OnboardingIcon, { type OnboardingIconName } from './OnboardingIcon'
import { firstOnboardingStyles as s } from './first-onboarding.styles'

export type Feature = 'legalization' | 'documents' | 'consultations' | 'partners'

/** Real cards compose the illustration; narrow screens use a readable stack. */
export default function FeatureArtwork({ feature, active }: { feature: Feature; active: boolean }) {
    const { t } = useTranslation()
    const { width } = useWindowDimensions()
    const stacked = width < 350
    const blurTarget = useBackgroundBlurTarget()
    const { reduceTransparency } = useAccessibilityPreferences()
    const text = (key: string) => t(`onboarding.art.${key}`)
    function panel(children: ReactNode, position: ViewStyle, angle: string, order: number) {
        return <Floating active={active && !stacked} duration={2400 + order * 400}
            style={stacked ? undefined : { position: 'absolute', ...position }}>
            <View style={!stacked ? { transform: [{ rotate: angle as `${number}deg` }] } : undefined}>{children}</View>
        </Floating>
    }
    function note(icon: OnboardingIconName, title: string, detail: string) {
        return <GlassCard padding={14} radius={20} intensity={18} blurTarget={blurTarget}
            backgroundColor={reduceTransparency ? '#405568' : 'rgba(59,82,100,0.55)'}>
            <View style={s.row}>
                <View style={s.circle}><OnboardingIcon name={icon} size={32} /></View>
                <View style={s.grow}><Text style={[s.label, { fontSize: 12 }]}>{text(title)}</Text><Text style={[s.small, { fontSize: 10 }]}>{text(detail)}</Text></View>
            </View>
        </GlassCard>
    }
    return <View style={stacked ? styles.stack : styles.stage}>
        {!stacked && <View pointerEvents="none" style={styles.orbit} />}
        {feature === 'legalization' && <>
            {panel(<SlateCard padding={22} style={{ gap: 9 }}>
                <OnboardingIcon name="id" size={44} />
                <Text style={s.eyebrow}>{text('yourCase')}</Text>
                <Text style={s.cardTitle}>{text('residenceCard')}</Text>
                <Text style={s.small}>{text('inProgress')}</Text>
            </SlateCard>, { left: 8, top: 28, width: '74%' }, '-7deg', 0)}
            {panel(<PaperCard padding={20} style={{ gap: 15 }}>
                <Text style={[s.eyebrow, styles.ink]}>{text('stepByStep')}</Text>
                {['prepare', 'apply', 'track'].map((key, index) => <View key={key} style={{ ...s.row, gap: 8 }}>
                    <View style={[styles.step, index < 2 && { backgroundColor: '#243B4B' }]}>
                        {index === 0 ? <OnboardingIcon name="check" size={18} /> : <Text style={{ fontSize: 10, color: index === 1 ? '#FFF' : '#607583' }}>{index + 1}</Text>}
                    </View>
                    <Text style={[s.small, styles.ink, { flex: 1 }]}>{text(key)}</Text>
                </View>)}
            </PaperCard>, { right: 0, top: 134, width: '83%' }, '0deg', 1)}
            {panel(note('bell', 'deadlines', 'onePlace'), { left: 4, top: 284, width: '78%' }, '-4deg', 2)}
        </>}
        {feature === 'documents' && <>
            {panel(<SlateCard padding={20} style={{ gap: 17 }}>
                <Text style={s.eyebrow}>{text('yourData')}</Text>
                <Text style={s.small}>{text('fullName')}</Text><View style={styles.line} />
                <Text style={s.small}>{text('address')}</Text><View style={styles.line} />
                <Text style={s.small}>{text('completed')}</Text>
            </SlateCard>, { left: 8, top: 40, width: '66%' }, '-9deg', 0)}
            {panel(<PaperCard padding={20} style={{ gap: 10 }}>
                <OnboardingIcon name="document" size={56} color="#243B4B" />
                <Text style={[s.label, styles.ink]}>{text('yourDocument')}</Text>
                <Text style={[s.small, styles.ink]}>{text('ready')}</Text>
                <View style={[styles.line, { backgroundColor: '#CCD6DF' }]} />
                <View style={[styles.line, { backgroundColor: '#CCD6DF', width: '65%' }]} />
            </PaperCard>, { right: 0, top: 56, width: '61%' }, '7deg', 1)}
            {panel(note('download', 'fillDownload', 'weHandleRest'), { left: 4, top: 282, width: '81%' }, '-4deg', 2)}
        </>}
        {feature === 'consultations' && <>
            {panel(<SlateCard padding={20} style={{ gap: 12 }}>
                <Text style={s.eyebrow}>{text('question')}</Text>
                <Text style={s.label}>{text('prepareQuestion')}</Text>
            </SlateCard>, { left: 0, top: 60, width: '65%' }, '-7deg', 0)}
            {panel(<PaperCard padding={20} style={{ gap: 14 }}>
                <View style={s.row}><OnboardingIcon name="consultant" size={46} color="#405568" /><View style={s.grow}>
                    <Text style={[s.label, styles.ink]}>{text('specialist')}</Text><Text style={[s.small, styles.ink]}>{text('residence')}</Text>
                </View></View>
                <Text style={[s.label, styles.ink]}>{text('letsTalk')}</Text>
                <View style={s.row}><OnboardingIcon name="video" color="#405568" size={26} /><Text style={[s.small, styles.ink]}>{text('online')}</Text></View>
            </PaperCard>, { right: 0, top: 100, width: '70%' }, '5deg', 1)}
            {panel(note('calendar', 'yourTime', 'chooseTime'), { left: 0, top: 294, width: '84%' }, '-4deg', 2)}
        </>}
        {feature === 'partners' && <>
            {panel(<SlateCard padding={20} style={{ gap: 12 }}>
                <OnboardingIcon name="business" size={44} />
                <Text style={s.label}>{text('accounting')}</Text><Text style={s.small}>{text('businessSupport')}</Text>
            </SlateCard>, { left: 0, top: 62, width: '58%' }, '-11deg', 0)}
            {panel(<SlateCard padding={20} style={{ gap: 12 }}>
                <OnboardingIcon name="home" size={44} />
                <Text style={s.label}>{text('realEstate')}</Text><Text style={s.small}>{text('findPlace')}</Text>
            </SlateCard>, { right: 0, top: 28, width: '54%' }, '10deg', 1)}
            {panel(<PaperCard padding={20}>
                <View style={s.row}><OnboardingIcon name="partners" color="#405568" size={48} /><View style={s.grow}>
                    <Text style={[s.label, styles.ink]}>{text('ourPartners')}</Text><Text style={[s.small, styles.ink]}>{text('nearYou')}</Text>
                </View></View><View style={[s.divider, { backgroundColor: '#CCD6DF' }]} />
                <View style={s.row}><Text style={[s.small, styles.ink, { flex: 1 }]}>{text('discoverOffer')}</Text><OnboardingIcon name="arrow" size={24} color="#405568" /></View>
            </PaperCard>, { left: '8%', top: 200, width: '84%' }, '0deg', 2)}
        </>}
    </View>
}
const styles = StyleSheet.create({
    stage: { height: 380, width: '100%' },
    stack: { gap: 16, paddingVertical: 8 },
    orbit: { position: 'absolute', width: '85%', aspectRatio: 1, top: 16, alignSelf: 'center', borderRadius: 200, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)' },
    ink: { color: '#243B4B' },
    line: { height: 5, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.14)' },
    step: { width: 22, height: 22, borderRadius: 11, borderWidth: 1, borderColor: '#BCCAD4', alignItems: 'center', justifyContent: 'center' },
})
