import { useState } from 'react'
import { View } from 'react-native'
import { router } from 'expo-router'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import Input from '../shared/inputs/Input'
import LightButton from '../shared/buttons/LightButton'
import AuthError from './AuthError'
import { accountAuthApi } from '../../api/account-auth/account-auth.api'
import { withApi } from '../../shared/config/api'
import { useAuthFlow } from '../../shared/providers/AuthFlowProvider'
import { normalizeEmail, validEmail } from '../../shared/auth/validation'
import { authStyles as s } from '../../shared/styles/auth.styles'

export default function ForgotPasswordForm() {
    const { t } = useTranslation()
    const flow = useAuthFlow()
    const [email, setEmail] = useState(flow.email)
    const [submitted, setSubmitted] = useState(false)
    const mutation = useMutation({ mutationFn: () => withApi((options) => accountAuthApi.forgotPassword({ email: normalizeEmail(email) }, options)), onSuccess: () => {
        flow.setEmail(normalizeEmail(email)); router.replace('/reset-password')
    } })
    function submit() { setSubmitted(true); if (validEmail(email) && !mutation.isPending) mutation.mutate() }
    return <View style={s.form}>
        <Input label={t('auth.email')} placeholder={t('auth.emailPlaceholder')} icon={require('../../../assets/system_icons/auth/email-white.png')} value={email} onChangeText={setEmail} keyboardType="email-address" autoComplete="email" maxLength={254} returnKeyType="go" onSubmitEditing={submit} editable={!mutation.isPending} error={submitted && !validEmail(email) ? t('auth.errors.email') : undefined} />
        <AuthError error={mutation.error} />
        <LightButton loading={mutation.isPending} onPress={submit}>{t('auth.sendCode')}</LightButton>
    </View>
}
