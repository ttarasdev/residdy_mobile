import { Alert } from 'react-native'
import { userApi } from '../../api/user/user.api'
import ContentRow from '../shared/content/ContentRow'
import OutlineButton from '../shared/buttons/OutlineButton'
import { useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { accountAuthApi } from '../../api/account-auth/account-auth.api'
import { useSession } from '../../shared/providers/SessionProvider'
import useApi from '../../shared/hooks/useApi'
import DetailScreen from '../shared/layout/DetailScreen'
import Input from '../shared/forms/FormInput'
import LightButton from '../shared/buttons/LightButton'
import QueryState from '../shared/content/QueryState'
import Text from '../shared/typography/Text'
import { contentStyles as s } from '../shared/content/content.styles'
export default function Security() {
    const router = useRouter()
    const { mode } = useLocalSearchParams<{ mode: string }>()
    const email = mode === 'email'
    const { options } = useApi()
    const { signOut } = useSession()
    const { t } = useTranslation()
    const [currentPassword, setCurrent] = useState('')
    const [value, setValue] = useState('')
    const [code, setCode] = useState('')
    const [sent, setSent] = useState(false)
    const request = useMutation({
        mutationFn: () =>
            email
                ? accountAuthApi.requestEmailChange(
                      { newEmail: value.trim(), currentPassword },
                      options,
                  )
                : accountAuthApi.requestPasswordChange(
                      { currentPassword },
                      options,
                  ),
        onSuccess: () => setSent(true),
    })
    const confirm = useMutation({
        mutationFn: async () => {
            if (email)
                await accountAuthApi.confirmEmailChange(
                    { newEmail: value.trim(), currentPassword, code },
                    options,
                )
            else
                await accountAuthApi.changePassword(
                    { password: value, currentPassword, code },
                    options,
                )
            await signOut()
        },
    })
    const remove = useMutation({
        mutationFn: async () => {
            await userApi.removeMe(options)
            await signOut()
        },
    })
    if (!mode)
        return (
            <DetailScreen title={t('workspace.security')}>
                <Text style={s.heading}>{t('workspace.yourProfile')}</Text>
                <ContentRow
                    title={t('workspace.changePassword')}
                    onPress={() =>
                        router.push('/profile/security?mode=password')
                    }
                />
                <ContentRow
                    title={t('workspace.changeEmail')}
                    onPress={() => router.push('/profile/security?mode=email')}
                />
                <OutlineButton
                    loading={remove.isPending}
                    onPress={() =>
                        Alert.alert(
                            t('workspace.deleteAccount'),
                            t('workspace.deleteAccountBody'),
                            [
                                {
                                    text: t('workspace.cancel'),
                                    style: 'cancel',
                                },
                                {
                                    text: t('workspace.delete'),
                                    style: 'destructive',
                                    onPress: () => remove.mutate(),
                                },
                            ],
                        )
                    }
                >
                    {t('workspace.deleteAccount')}
                </OutlineButton>
                <QueryState error={remove.error} />
            </DetailScreen>
        )
    return (
        <DetailScreen
            title={t(
                email ? 'workspace.changeEmail' : 'workspace.changePassword',
            )}
        >
            <Text style={s.body}>{t('workspace.securityInfo')}</Text>
            <Input
                label={t('workspace.currentPassword')}
                secureTextEntry
                value={currentPassword}
                onChangeText={setCurrent}
                editable={!sent}
            />
            <Input
                label={t(
                    email ? 'workspace.newEmail' : 'workspace.newPassword',
                )}
                secureTextEntry={!email}
                keyboardType={email ? 'email-address' : 'default'}
                value={value}
                onChangeText={setValue}
                editable={!sent}
            />
            {sent && (
                <Input
                    label={t('workspace.code')}
                    keyboardType="number-pad"
                    value={code}
                    onChangeText={setCode}
                />
            )}
            <QueryState error={request.error ?? confirm.error} />
            <LightButton
                loading={request.isPending || confirm.isPending}
                disabled={!currentPassword || !value || (sent && !code)}
                onPress={() => (sent ? confirm.mutate() : request.mutate())}
            >
                {t(sent ? 'workspace.confirm' : 'workspace.sendCode')}
            </LightButton>
        </DetailScreen>
    )
}
