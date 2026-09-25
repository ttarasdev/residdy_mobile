import '../shared/utils/blob-runtime'
import PopupBackground from '../components/shared/feedback/PopupBackground'
import { useEffect, useState } from 'react'
import { DarkTheme, Stack, ThemeProvider } from 'expo-router'
import { I18nextProvider } from 'react-i18next'
import {
    SafeAreaProvider,
    initialWindowMetrics,
} from 'react-native-safe-area-context'
import ScreenBackground from '../components/shared/layout/ScreenBackground'
import QueryProvider from '../shared/providers/QueryProvider'
import { useFonts } from 'expo-font'
import { Manrope_400Regular } from '@expo-google-fonts/manrope/400Regular'
import { Manrope_600SemiBold } from '@expo-google-fonts/manrope/600SemiBold'
import SessionProvider from '../shared/providers/SessionProvider'
import WelcomeProvider from '../shared/providers/WelcomeProvider'
import i18n, { initializeLanguage } from '../i18n'

// Native navigator containers also use the theme background.
const navigationTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        background: 'transparent',
        card: 'transparent',
        text: '#FFFFFF',
    },
}

export default function RootLayout() {
    const [fontsLoaded, fontError] = useFonts({
        Manrope_400Regular,
        Manrope_600SemiBold,
    })
    const [ready, setReady] = useState(false)

    useEffect(() => {
        let active = true
        setReady(false)
        initializeLanguage().then(() => {
            if (active) setReady(true)
        })
        return () => {
            active = false
        }
    }, [i18n])

    return (
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <I18nextProvider i18n={i18n}>
                <ScreenBackground>
                    {ready &&
                        i18n.isInitialized &&
                        (fontsLoaded || fontError) && (
                            <QueryProvider>
                                <SessionProvider>
                                    <WelcomeProvider>
                                        <ThemeProvider value={navigationTheme}>
                                            <PopupBackground>
                                                <Stack
                                                    screenOptions={{
                                                        headerShown: false,
                                                        contentStyle: {
                                                            backgroundColor:
                                                                'transparent',
                                                        },
                                                        animation: 'none',
                                                    }}
                                                />
                                            </PopupBackground>
                                        </ThemeProvider>
                                    </WelcomeProvider>
                                </SessionProvider>
                            </QueryProvider>
                        )}
                </ScreenBackground>
            </I18nextProvider>
        </SafeAreaProvider>
    )
}
