import Text from '../../components/shared/typography/Text'
import type { ReactNode } from 'react'
import { ActivityIndicator } from 'react-native'
import { Redirect, usePathname } from 'expo-router'
import { useTranslation } from 'react-i18next'
import Screen from '../../components/shared/layout/Screen'
import LightButton from '../../components/shared/buttons/LightButton'
import { useWelcome } from '../providers/WelcomeProvider'
import { useSession } from '../providers/SessionProvider'

interface SessionGuardProps {
    access: 'private' | 'guest' | 'entry'
    children?: ReactNode
}

export default function SessionGuard({ access, children }: SessionGuardProps) {
    const { session, legal, retry } = useSession()
    const welcome = useWelcome()
    const waitingForWelcome = session.status === 'authenticated' && welcome.completed === null
    const pathname = usePathname()
    const { t } = useTranslation()

    if (session.status === 'checking' || session.status === 'error' || waitingForWelcome) {
        return (
            <Screen gap={20} style={{ justifyContent: 'center' }}>
                {session.status === 'checking' || (waitingForWelcome && !welcome.error) ? <ActivityIndicator color="#FFFFFF" /> : (
                    <>
                        <Text style={{ color: '#FFFFFF', textAlign: 'center' }}>{t('session.error')}</Text>
                        <LightButton onPress={waitingForWelcome ? welcome.retry : retry}>{t('session.retry')}</LightButton>
                    </>
                )}
            </Screen>
        )
    }
    if (session.status === 'guest' && access !== 'guest') return <Redirect href="/login" />
    if (session.status === 'authenticated' && welcome.completed === false && pathname !== '/welcome') return <Redirect href="/welcome" />
    if (session.status === 'authenticated' && legal?.acceptanceRequired && pathname !== '/consents') return <Redirect href="/consents" />
    if (session.status === 'authenticated' && access !== 'private') return <Redirect href="/home" />
    return children
}
