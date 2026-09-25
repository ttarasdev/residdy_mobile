import Text from '../shared/typography/Text'
import { useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { router } from 'expo-router'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import Input from '../shared/inputs/Input'
import PasswordInput from '../shared/inputs/PasswordInput'
import LightButton from '../shared/buttons/LightButton'
import Button from '../shared/buttons/Button'
import LegalChecks from './LegalChecks'
import AuthError from './AuthError'
import { registerOrResend } from '../../shared/auth/register-or-resend'
import { legalDocumentsApi } from '../../api/legal-documents/legal-documents.api'
import { withApi } from '../../shared/config/api'
import { useAuthFlow } from '../../shared/providers/AuthFlowProvider'
import { normalizeEmail, validEmail, validPassword } from '../../shared/auth/validation'
import { authStyles as s } from '../../shared/styles/auth.styles'

export default function RegisterForm() {
    const { t, i18n } = useTranslation()
    const flow = useAuthFlow()
    const [email, setEmail] = useState(flow.email)
    const [password, setPassword] = useState('')
    const [repeat, setRepeat] = useState('')
    const [selected, setSelected] = useState<number[]>([])
    const [submitted, setSubmitted] = useState(false)
    const legal = useQuery({ queryKey: ['registration-documents'], queryFn: () => withApi((options) => legalDocumentsApi.list({ placement: 'registration', limit: 6 }, options)), networkMode: 'always' })
    const docs = legal.data?.rows ?? []
    const accepted = docs.length > 0 && docs.every((doc) => selected.includes(doc.versionId)) && !legal.isError
    const mutation = useMutation({ mutationFn: () => withApi((options) => registerOrResend({
        email: normalizeEmail(email), password,
        legalVersionIds: docs.filter((doc) => selected.includes(doc.versionId)).map((doc) => doc.versionId),
        lan: ({ uk: 'UA', pl: 'PL', en: 'EN', ru: 'RU' } as const)[i18n.language as 'uk' | 'pl' | 'en' | 'ru'] ?? 'PL',
    }, options)), onSuccess: () => {
        flow.setEmail(normalizeEmail(email)); flow.setNotice(null); setPassword(''); setRepeat(''); router.replace('/confirm-email')
    }, onError: () => { void legal.refetch() } })
    function submit() {
        setSubmitted(true)
        if (validEmail(email) && validPassword(password) && password === repeat && accepted && !mutation.isPending) mutation.mutate()
    }
    return <View style={s.form}>
        <Input label={t('auth.email')} placeholder={t('auth.emailPlaceholder')} icon={require('../../../assets/system_icons/auth/email-white.png')} value={email} onChangeText={setEmail} keyboardType="email-address" autoComplete="email" textContentType="emailAddress" maxLength={254} editable={!mutation.isPending} error={submitted && !validEmail(email) ? t('auth.errors.email') : undefined} />
        <PasswordInput label={t('auth.password')} placeholder={t('auth.passwordHint')} value={password} onChangeText={setPassword} maxLength={128} autoComplete="new-password" textContentType="newPassword" editable={!mutation.isPending} error={submitted && !validPassword(password) ? t('auth.errors.password') : undefined} />
        <PasswordInput label={t('auth.repeatPassword')} value={repeat} onChangeText={setRepeat} maxLength={128} autoComplete="new-password" textContentType="newPassword" editable={!mutation.isPending} error={submitted && password !== repeat ? t('auth.errors.match') : undefined} />
        {legal.isPending ? <ActivityIndicator color="#FFFFFF" /> : <LegalChecks documents={docs} selected={selected} onChange={setSelected} disabled={mutation.isPending} />}
        {(legal.isError || (!legal.isPending && !docs.length)) && <><Text style={s.error}>{t('auth.errors.documents')}</Text><Button textStyle={s.link} onPress={() => void legal.refetch()}>{t('session.retry')}</Button></>}
        {submitted && !accepted && <Text style={s.error}>{t('auth.errors.accept')}</Text>}
        <AuthError error={mutation.error} context="register" />
        <LightButton loading={mutation.isPending} disabled={!accepted || legal.isFetching} onPress={submit}>{t('auth.createAccount')}</LightButton>
    </View>
}
