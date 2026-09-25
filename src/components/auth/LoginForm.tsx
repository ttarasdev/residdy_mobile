import Text from '../shared/typography/Text'
import TextInput from '../shared/typography/TextInput'
import { useRef, useState } from 'react'
import { View } from 'react-native'
import { router } from 'expo-router'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import Input from '../shared/inputs/Input'
import PasswordInput from '../shared/inputs/PasswordInput'
import LightButton from '../shared/buttons/LightButton'
import Button from '../shared/buttons/Button'
import AuthError from './AuthError'
import { accountAuthApi } from '../../api/account-auth/account-auth.api'
import { withApi } from '../../shared/config/api'
import { useSession } from '../../shared/providers/SessionProvider'
import { useAuthFlow } from '../../shared/providers/AuthFlowProvider'
import { normalizeEmail, validEmail } from '../../shared/auth/validation'
import { authStyles as s } from '../../shared/styles/auth.styles'

export default function LoginForm() {
    const { t } = useTranslation()
    const flow = useAuthFlow()
    const { signIn } = useSession()
    const [email, setEmail] = useState(flow.email)
    const [password, setPassword] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const passwordRef = useRef<TextInput>(null)
    const mutation = useMutation({ mutationFn: async () => {
        const response = await withApi((options) => accountAuthApi.login({ email: normalizeEmail(email), password }, options))
        await signIn(response)
        setPassword('')
        flow.setNotice(null)
    } })
    function submit() {
        setSubmitted(true)
        if (validEmail(email) && password.length > 0 && password.length <= 128 && !mutation.isPending) mutation.mutate()
    }
    return <View style={s.form}>
        {flow.notice && <Text style={s.success}>{t(`auth.${flow.notice}Success`)}</Text>}
        <View style={s.fields}>
            <Input label={t('auth.email')} placeholder={t('auth.emailPlaceholder')} icon={require('../../../assets/system_icons/auth/email-white.png')} value={email} onChangeText={setEmail}
                keyboardType="email-address" textContentType="username" autoComplete="email" maxLength={254} returnKeyType="next" onSubmitEditing={() => passwordRef.current?.focus()} editable={!mutation.isPending} error={submitted && !validEmail(email) ? t('auth.errors.email') : undefined} />
            <PasswordInput ref={passwordRef} label={t('auth.password')} placeholder={t('auth.password')} value={password} onChangeText={setPassword} textContentType="password" autoComplete="current-password" maxLength={128} returnKeyType="go" onSubmitEditing={submit} editable={!mutation.isPending} error={submitted && !password ? t('auth.errors.required') : undefined} />
        </View>
        <Button height={36} padding={0} textStyle={s.link} style={{ alignSelf: 'flex-end', paddingVertical: 4 }} disabled={mutation.isPending} onPress={() => { flow.setEmail(normalizeEmail(email)); router.push('/forgot-password') }}>{t('navigation.forgotPassword')}</Button>
        <AuthError error={mutation.error} context="login" />
        <LightButton loading={mutation.isPending} onPress={submit}>{t('navigation.login')}</LightButton>
    </View>
}
