import { Keyboard } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import AuthPage from '../../../components/auth/AuthPage'
import SocialLinks from '../../../components/shared/socials/SocialLinks'
import FadeSwap from '../../../components/shared/animation/FadeSwap'
import LoginForm from '../../../components/auth/LoginForm'
import RegisterForm from '../../../components/auth/RegisterForm'

export default function LoginFormScreen() {
    const params = useLocalSearchParams<{ mode?: string }>()
    const mode = params.mode === 'register' ? 'register' : 'login'
    return <AuthPage mode={mode} back={false}
        onModeChange={(next) => { Keyboard.dismiss(); router.setParams({ mode: next }) }}
        footer={mode === 'login' ? <SocialLinks /> : undefined}>
        <FadeSwap value={mode}>
            {(current) => current === 'login' ? <LoginForm /> : <RegisterForm />}
        </FadeSwap>
    </AuthPage>
}
