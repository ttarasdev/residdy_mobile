import { useState } from 'react'
import { useRouter } from 'expo-router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import useApi from '../../shared/hooks/useApi'
import useProfile from '../../shared/hooks/useProfile'
import { userApi } from '../../api/user/user.api'
import type { User } from '../../api/models'
import DetailScreen from '../shared/layout/DetailScreen'
import Input from '../shared/forms/FormInput'
import FormCard from '../shared/forms/FormCard'
import LightButton from '../shared/buttons/LightButton'
import QueryState from '../shared/content/QueryState'
function Form({ user }: { user: User }) {
    const { options, lan } = useApi()
    const { t } = useTranslation()
    const client = useQueryClient()
    const router = useRouter()
    const [values, setValues] = useState({
        name: user.name ?? '',
        surname: user.surname ?? '',
        phone: user.phone ?? '',
        location: user.location ?? '',
    })
    const save = useMutation({
        mutationFn: () =>
            userApi.updateMe(
                {
                    ...Object.fromEntries(
                        Object.entries(values).map(([key, value]) => [
                            key,
                            value.trim(),
                        ]),
                    ),
                    lan,
                },
                options,
            ),
        onSuccess: async () => {
            await client.invalidateQueries({ queryKey: ['user-me'] })
            router.back()
        },
    })
    return (
        <FormCard description={t('feedback.profileDescription')}>
            {(Object.keys(values) as Array<keyof typeof values>).map((key) => (
                <Input
                    key={key}
                    label={t(`workspace.${key}`)}
                    value={values[key]}
                    maxLength={key === 'phone' ? 40 : 200}
                    autoCapitalize={key === 'phone' ? 'none' : 'words'}
                    keyboardType={key === 'phone' ? 'phone-pad' : 'default'}
                    editable={!save.isPending}
                    onChangeText={(value) =>
                        setValues((old) => ({ ...old, [key]: value }))
                    }
                />
            ))}
            <QueryState error={save.error} />
            <LightButton
                loading={save.isPending}
                disabled={Object.values(values).some((value) => !value.trim())}
                onPress={() => save.mutate()}
            >
                {t('workspace.save')}
            </LightButton>
        </FormCard>
    )
}
export default function EditProfile() {
    const { t } = useTranslation()
    const query = useProfile()
    return (
        <DetailScreen title={t('workspace.editProfile')}>
            <QueryState
                loading={query.isPending}
                error={query.error}
                retry={() => {
                    void query.refetch()
                }}
            />
            {query.data && <Form user={query.data} />}
        </DetailScreen>
    )
}
