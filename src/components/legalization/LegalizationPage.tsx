import MyConsultations from '../consultations/MyConsultations'
import ConsultationTopics from '../consultations/ConsultationTopics'
import TabScrollView from '../shared/layout/TabScrollView'
import { useBottomTabBarHeight } from 'expo-router/tabs'
import { useEffect, useRef, useState } from 'react'
import { Animated, ScrollView, StyleSheet, View } from 'react-native'
import { BlurTargetView } from 'expo-blur'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import Screen from '../shared/layout/Screen'
import LegalizationIntro from './LegalizationIntro'
import GlassSegmentedControl from '../shared/segmented-control/GlassSegmentedControl'
import TabHeader from '../navigation/TabHeader'
import MyDocuments from '../documents/MyDocuments'
import MyCases from '../cases/MyCases'
import PartnerAds from '../advertising/PartnerAds'
import useAccessibilityPreferences from '../../shared/hooks/useAccessibilityPreferences'

type Section = 'cases' | 'documents' | 'consultations'

const sectionIcons = {
    cases: require('../../../assets/system_icons/multi/onboarding-business-white.png'),
    documents: require('../../../assets/system_icons/multi/onboarding-document-white.png'),
    consultations: require('../../../assets/system_icons/multi/onboarding-consultant-white.png'),
}

export default function LegalizationPage() {
    const bottomSpace = useBottomTabBarHeight()
    const { t } = useTranslation()
    const router = useRouter()
    const params = useLocalSearchParams<{ section?: string | string[] }>()
    const section: Section =
        params.section === 'documents' || params.section === 'consultations'
            ? params.section
            : 'cases'
    const target = useRef<View>(null)
    const scroll = useRef<ScrollView>(null)
    const opacity = useRef(new Animated.Value(1)).current
    const [controlHeight, setControlHeight] = useState(54)
    const [scrollOffset, setScrollOffset] = useState(0)
    const [viewportHeight, setViewportHeight] = useState(0)
    const { reduceMotion } = useAccessibilityPreferences()
    const items = (['cases', 'documents', 'consultations'] as const).map(
        (value) => ({
            value,
            label: t(`legalization.${value}`),
            icon: sectionIcons[value],
        }),
    )

    useEffect(() => {
        scroll.current?.scrollTo({ y: 0, animated: false })
        if (reduceMotion) {
            opacity.setValue(1)
            return
        }
        opacity.setValue(0)
        const animation = Animated.timing(opacity, {
            toValue: 1,
            duration: 180,
            useNativeDriver: true,
        })
        animation.start()
        return () => animation.stop()
    }, [section, opacity, reduceMotion])

    return (
        <Screen
            edges={['top', 'left', 'right']}
            paddingHorizontal={0}
            paddingTop={0}
            paddingBottom={0}
            gap={0}
        >
            <TabHeader title={t('navigation.legalization')} />
            <View style={styles.body}>
                <BlurTargetView ref={target} style={styles.body}>
                    <TabScrollView
                        queryRoots={[
                            'partner-banners',
                            section === 'cases'
                                ? 'my-cases'
                                : section === 'documents'
                                  ? 'my-documents'
                                  : 'my-consultations',
                            'subscription',
                        ]}
                        ref={scroll}
                        contentContainerStyle={[
                            styles.content,
                            {
                                paddingTop: controlHeight + 32,
                                paddingBottom: bottomSpace + 24,
                            },
                        ]}
                        onLayout={(event) =>
                            setViewportHeight(event.nativeEvent.layout.height)
                        }
                        onScroll={(event) =>
                            setScrollOffset(event.nativeEvent.contentOffset.y)
                        }
                        scrollEventThrottle={100}
                        scrollIndicatorInsets={{ top: controlHeight + 8 }}
                    >
                        <Animated.View style={{ opacity }}>
                            <LegalizationIntro
                                title={t(`legalization.${section}Title`)}
                                buttonLabel={t(`legalization.${section}Button`)}
                                onPress={
                                    section === 'cases'
                                        ? () => router.push('/cases/new')
                                        : section === 'documents'
                                          ? () => router.push('/documents/new')
                                          : () =>
                                                router.push(
                                                    '/consultations/mine',
                                                )
                                }
                            />
                        </Animated.View>
                        <PartnerAds
                            offset={scrollOffset + controlHeight + 8}
                            viewportHeight={Math.max(
                                0,
                                viewportHeight -
                                    controlHeight -
                                    8 -
                                    bottomSpace,
                            )}
                        >
                            {section === 'cases' ? (
                                <MyCases />
                            ) : section === 'documents' ? (
                                <MyDocuments />
                            ) : (
                                <>
                                    <MyConsultations />
                                    <ConsultationTopics />
                                </>
                            )}
                        </PartnerAds>
                    </TabScrollView>
                </BlurTargetView>
                <View
                    style={styles.control}
                    onLayout={(event) =>
                        setControlHeight(event.nativeEvent.layout.height)
                    }
                >
                    <GlassSegmentedControl
                        items={items}
                        value={section}
                        blurTarget={target}
                        onChange={(value) =>
                            router.setParams({ section: value })
                        }
                    />
                </View>
            </View>
        </Screen>
    )
}

const styles = StyleSheet.create({
    body: { flex: 1 },
    content: { paddingHorizontal: 20, paddingBottom: 24 },
    control: { position: 'absolute', top: 8, left: 20, right: 20 },
})
