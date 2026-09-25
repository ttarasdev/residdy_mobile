import { useCallback, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { Redirect } from 'expo-router'
import Screen from '../../components/shared/layout/Screen'
import { useWelcome } from '../../shared/providers/WelcomeProvider'
import IntroAnimation from '../../components/intro/IntroAnimation'
import SessionGuard from '../../shared/guards/SessionGuard'

export default function Intro() {
    const [finished, setFinished] = useState(false)
    const finish = useCallback(() => setFinished(true), [])
    const { completed, error } = useWelcome()

    if (!finished) return <IntroAnimation onFinish={finish} />
    if (completed === null && error) return <SessionGuard access="entry" />
    if (completed === null) return <Screen style={{ justifyContent: 'center' }}><ActivityIndicator color="#FFFFFF" /></Screen>
    return completed ? <SessionGuard access="entry" /> : <Redirect href="/welcome" />
}
