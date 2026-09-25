import Text from '../shared/typography/Text'
import { useState } from 'react'
import { View } from 'react-native'
import { router } from 'expo-router'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import Input from '../shared/inputs/Input'
import CodeInput from '../shared/inputs/CodeInput'
import PasswordInput from '../shared/inputs/PasswordInput'
import LightButton from '../shared/buttons/LightButton'
import Button from '../shared/buttons/Button'
import AuthError from './AuthError'
import { accountAuthApi } from '../../api/account-auth/account-auth.api'
import { withApi } from '../../shared/config/api'
import { useAuthFlow } from '../../shared/providers/AuthFlowProvider'
import { normalizeEmail, validEmail, validPassword, validCode } from '../../shared/auth/validation'
import useResendCooldown from '../../shared/hooks/useResendCooldown'
import { authStyles as s } from '../../shared/styles/auth.styles'

export default function ResetPasswordForm() {
    const { t } = useTranslation()
    const flow = useAuthFlow()
    const [email, setEmail] = useState(flow.email)
    const [code, setCode] = useState('')
    const [password, setPassword] = useState('')
    const [repeat, setRepeat] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const cooldown = useResendCooldown()
    const mutation = useMutation({ mutationFn: () => withApi((options) => accountAuthApi.resetPassword({ email: normalizeEmail(email), code, password }, options)), onSuccess: () => {
        setCode(''); setPassword(''); setRepeat(''); flow.setEmail(normalizeEmail(email)); flow.setNotice('reset'); router.replace('/login')
    } })
    const resend = useMutation({ mutationFn: () => withApi((options) => accountAuthApi.forgotPassword({ email: normalizeEmail(email) }, options)), onSuccess: () => { cooldown.start(); setCode('') } })
    const busy = mutation.isPending || resend.isPending
    function submit() { setSubmitted(true); if (validEmail(email) && validCode(code) && validPassword(password) && password === repeat && !busy) mutation.mutate() }
    return <View style={s.form}>
        <Input label={t('auth.email')} value={email} onChangeText={(value) => { setEmail(value); setCode('') }} keyboardType="email-address" maxLength={254} editable={!busy} error={submitted && !validEmail(email) ? t('auth.errors.email') : undefined} />
        <CodeInput label={t('auth.code')} value={code} onChangeText={setCode} disabled={busy} error={submitted && !validCode(code) ? t('auth.errors.codeFormat') : undefined} />
        <Button textStyle={s.link} loading={resend.isPending} disabled={busy || cooldown.seconds > 0 || !validEmail(email)} onPress={() => resend.mutate()}>{cooldown.seconds ? t('auth.resendIn', { seconds: cooldown.seconds }) : t('auth.resend')}</Button>
        {resend.isSuccess && <Text style={s.description}>{t('auth.codeSent')}</Text>}
        <PasswordInput label={t('auth.newPassword')} placeholder={t('auth.passwordHint')} value={password} onChangeText={setPassword} maxLength={128} autoComplete="new-password" textContentType="newPassword" editable={!busy} error={submitted && !validPassword(password) ? t('auth.errors.password') : undefined} />
        <PasswordInput label={t('auth.repeatPassword')} value={repeat} onChangeText={setRepeat} maxLength={128} autoComplete="new-password" textContentType="newPassword" editable={!busy} error={submitted && password !== repeat ? t('auth.errors.match') : undefined} />
        <AuthError error={mutation.error} context="code" /><AuthError error={resend.error} />
        <LightButton loading={mutation.isPending} disabled={resend.isPending} onPress={submit}>{t('auth.savePassword')}</LightButton>
    </View>
}
