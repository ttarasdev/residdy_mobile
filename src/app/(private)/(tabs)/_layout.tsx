import { useRef } from 'react'
import { View } from 'react-native'
import { BlurTargetView } from 'expo-blur'
import GlassTabBar from '../../../components/navigation/GlassTabBar'
import { Tabs } from 'expo-router'
import { useTranslation } from 'react-i18next'

export default function TabsLayout() {
    const { t } = useTranslation()
    const targets = {
        home: useRef<View>(null),
        legalization: useRef<View>(null),
        blog: useRef<View>(null),
        partners: useRef<View>(null),
        profile: useRef<View>(null),
    }
    return (
        <Tabs
            screenLayout={({ route, children }) => (
                <BlurTargetView
                    ref={targets[route.name as keyof typeof targets]}
                    style={{ flex: 1 }}
                >
                    {children}
                </BlurTargetView>
            )}
            tabBar={(props) => (
                <GlassTabBar
                    {...props}
                    overlay
                    contentBlurTarget={
                        targets[
                            props.state.routes[props.state.index]
                                .name as keyof typeof targets
                        ]
                    }
                />
            )}
            screenOptions={{
                headerShown: false,
                sceneStyle: { backgroundColor: 'transparent' },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{ title: t('navigation.home') }}
            />
            <Tabs.Screen
                name="legalization"
                options={{ title: t('navigation.legalization') }}
            />
            <Tabs.Screen
                name="blog"
                options={{ title: t('navigation.blog') }}
            />
            <Tabs.Screen
                name="partners"
                options={{ title: t('navigation.partners') }}
            />
            <Tabs.Screen
                name="profile"
                options={{ title: t('navigation.profile') }}
            />
        </Tabs>
    )
}
