import Text from '../shared/typography/Text'
import { useState } from 'react'
import { View } from 'react-native'
import { router } from 'expo-router'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import Input from '../shared/inputs/Input'
import CodeInput from '../shared/inputs/CodeInput'
import LightButton from '../shared/buttons/LightButton'
import Button from '../shared/buttons/Button'
import AuthError from './AuthError'
import { accountAuthApi } from '../../api/account-auth/account-auth.api'
import { withApi } from '../../shared/config/api'
import { useAuthFlow } from '../../shared/providers/AuthFlowProvider'
import { normalizeEmail, validEmail, validCode } from '../../shared/auth/validation'
import useResendCooldown from '../../shared/hooks/useResendCooldown'
import { authStyles as s } from '../../shared/styles/auth.styles'

export default function ConfirmEmailForm() {
    const { t } = useTranslation()
    const flow = useAuthFlow()
    const [email, setEmail] = useState(flow.email)
    const [code, setCode] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const cooldown = useResendCooldown()
    const mutation = useMutation({ mutationFn: () => withApi((options) => accountAuthApi.confirm({ email: normalizeEmail(email), code }, options)), onSuccess: () => {
        setCode(''); flow.setEmail(normalizeEmail(email)); flow.setNotice('confirmed'); router.replace('/login')
    } })
    const resend = useMutation({ mutationFn: () => withApi((options) => accountAuthApi.resend({ email: normalizeEmail(email) }, options)), onSuccess: () => { cooldown.start(); setCode('') } })
    const busy = mutation.isPending || resend.isPending
    return <View style={s.form}>
        <Input label={t('auth.email')} icon={require('../../../assets/system_icons/auth/email-white.png')} value={email} onChangeText={(value) => { setEmail(value); setCode('') }} keyboardType="email-address" autoComplete="email" maxLength={254} editable={!busy} error={submitted && !validEmail(email) ? t('auth.errors.email') : undefined} />
        <CodeInput label={t('auth.code')} value={code} onChangeText={setCode} disabled={busy} error={submitted && !validCode(code) ? t('auth.errors.codeFormat') : undefined} />
        <AuthError error={mutation.error} context="code" />
        <AuthError error={resend.error} />
        <LightButton loading={mutation.isPending} disabled={resend.isPending} onPress={() => { setSubmitted(true); if (validEmail(email) && validCode(code) && !busy) mutation.mutate() }}>{t('auth.confirmEmail')}</LightButton>
        <Button textStyle={s.link} loading={resend.isPending} disabled={busy || cooldown.seconds > 0 || !validEmail(email)} onPress={() => resend.mutate()}>{cooldown.seconds > 0 ? t('auth.resendIn', { seconds: cooldown.seconds }) : t('auth.resend')}</Button>
        {resend.isSuccess && <Text style={s.description}>{t('auth.codeSent')}</Text>}
        <Button textStyle={s.link} disabled={busy} onPress={() => router.replace('/login')}>{t('auth.backToLogin')}</Button>
    </View>
}
