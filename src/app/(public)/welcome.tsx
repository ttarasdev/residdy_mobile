import { useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import Screen from '../../components/shared/layout/Screen'
import FirstOnboarding from '../../components/onboarding/first/FirstOnboarding'
import { useWelcome } from '../../shared/providers/WelcomeProvider'
import SessionGuard from '../../shared/guards/SessionGuard'

export default function Welcome() {
    const { completed, complete, error } = useWelcome()
    const { preview } = useLocalSearchParams<{ preview?: string }>()
    const [finished, setFinished] = useState(false)
    if (completed === null && error) return <SessionGuard access="entry" />
    if (completed === null) return <Screen style={{ justifyContent: 'center' }}><ActivityIndicator color="#FFFFFF" /></Screen>
    if (finished || (completed && !(__DEV__ && preview === '1'))) return <SessionGuard access="entry" />
    return <FirstOnboarding onComplete={async () => { await complete(); setFinished(true) }} />
}
