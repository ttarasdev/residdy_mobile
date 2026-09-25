import { useSession } from '../../shared/providers/SessionProvider'
import Text from '../shared/typography/Text'
import type { ReactNode } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'
import { router } from 'expo-router'
import { useTranslation } from 'react-i18next'
import Screen from '../shared/layout/Screen'
import BackButton from '../shared/buttons/BackButton'
import Logo from '../shared/logo/Logo'
import LanguageSwitcher from '../shared/language/LanguageSwitcher'
import AuthTabs from './AuthTabs'
import { authStyles as s } from '../../shared/styles/auth.styles'

export default function AuthPage({
    title,
    description,
    children,
    footer,
    back = true,
    mode,
    onModeChange,
}: {
    title?: string
    description?: string
    children: ReactNode
    footer?: ReactNode
    back?: boolean
    mode?: 'login' | 'register'
    onModeChange?: (mode: 'login' | 'register') => void
}) {
    const { t } = useTranslation()
    const { sessionExpired } = useSession()
    return (
        <Screen paddingHorizontal={0} paddingTop={0} paddingBottom={0} gap={0}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    keyboardDismissMode="on-drag"
                    contentContainerStyle={s.page}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 12,
                        }}
                    >
                        {back ? (
                            <BackButton
                                accessibilityLabel={t('navigation.back')}
                                onPress={() =>
                                    router.canGoBack()
                                        ? router.back()
                                        : router.replace('/login')
                                }
                            />
                        ) : (
                            <Logo width={80} />
                        )}
                        <LanguageSwitcher />
                    </View>
                    <View style={s.body}>
                        {sessionExpired && (
                            <Text
                                accessibilityRole="alert"
                                style={{
                                    color: '#FFD39B',
                                    textAlign: 'center',
                                }}
                            >
                                {t('session.expired')}
                            </Text>
                        )}
                        {mode && onModeChange && (
                            <AuthTabs mode={mode} onChange={onModeChange} />
                        )}
                        {title && (
                            <View style={s.header}>
                                <Text
                                    accessibilityRole="header"
                                    style={s.title}
                                >
                                    {title}
                                </Text>
                                {description && (
                                    <Text style={s.description}>
                                        {description}
                                    </Text>
                                )}
                            </View>
                        )}
                        {children}
                    </View>
                    {footer}
                </ScrollView>
            </KeyboardAvoidingView>
        </Screen>
    )
}
