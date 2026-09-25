import { useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import useApi from '../../shared/hooks/useApi'
import useProfile from '../../shared/hooks/useProfile'
import { isProfileComplete, localizedTitle } from '../../shared/utils/profile'
import { gDocTypesApi } from '../../api/g-doc-types/g-doc-types.api'
import { gDocTemplatesApi } from '../../api/g-doc-templates/g-doc-templates.api'
import { gUserDocsApi } from '../../api/g-user-docs/g-user-docs.api'
import { ApiError } from '../../api/http'
import DetailScreen from '../shared/layout/DetailScreen'
import ContentRow from '../shared/content/ContentRow'
import QueryState from '../shared/content/QueryState'
import Input from '../shared/forms/FormInput'
import FormCard from '../shared/forms/FormCard'
import CompleteProfileAlert from '../profile/CompleteProfileAlert'
import LightButton from '../shared/buttons/LightButton'
import Text from '../shared/typography/Text'
import { contentStyles as s } from '../shared/content/content.styles'
export default function NewDocument() {
    const { account, options, lan } = useApi()
    const profile = useProfile()
    const { t } = useTranslation()
    const router = useRouter()
    const client = useQueryClient()
    const [profileAlertVisible, setProfileAlertVisible] = useState(false)
    const [type, setType] = useState<number>()
    const params = useLocalSearchParams<{ template?: string }>()
    const directId = Number(params.template)
    const [template, setTemplate] = useState<number | undefined>(
        Number.isSafeInteger(directId) && directId > 0 ? directId : undefined,
    )
    const [inputs, setInputs] = useState<Record<string, string>>({})
    const types = useQuery({
        queryKey: ['document-types', account?.account.id],
        queryFn: ({ signal }) =>
            gDocTypesApi.findAll(
                { status: 'active', limit: 100 },
                { ...options, signal },
            ),
    })
    const templates = useQuery({
        queryKey: ['document-templates', account?.account.id, type],
        queryFn: ({ signal }) =>
            gDocTemplatesApi.findAll(
                { status: 'active', gDocTypeId: type, limit: 100 },
                { ...options, signal },
            ),
        enabled: !!type,
    })
    const details = useQuery({
        queryKey: ['document-template', account?.account.id, template],
        queryFn: ({ signal }) =>
            gDocTemplatesApi.findOne(template!, { ...options, signal }),
        enabled: !!template,
    })
    function profileAlert() {
        setProfileAlertVisible(true)
    }
    const create = useMutation({
        mutationFn: async () => {
            const current = await profile.refetch()
            if (current.error) throw current.error
            if (!isProfileComplete(current.data)) {
                profileAlert()
                return null
            }
            return gUserDocsApi.create(
                { gDocTemplateId: template!, inputs },
                options,
            )
        },
        onSuccess: async (result) => {
            if (!result) return
            await client.invalidateQueries({ queryKey: ['my-documents'] })
            router.replace('/legalization?section=documents')
        },
        onError: (error) => {
            if (
                error instanceof ApiError &&
                error.code === 'PROFILE_INCOMPLETE'
            )
                profileAlert()
        },
    })
    return (
        <DetailScreen
            title={t('workspace.newDocument')}
            onBack={() => {
                if (create.isPending) return
                if (template) setTemplate(undefined)
                else if (type) setType(undefined)
                else router.back()
            }}
        >
            <CompleteProfileAlert
                visible={profileAlertVisible}
                onClose={() => setProfileAlertVisible(false)}
                onFill={() => {
                    setProfileAlertVisible(false)
                    router.push('/profile/edit')
                }}
            />
            {!type && !template ? (
                <>
                    <Text style={s.heading}>{t('workspace.chooseType')}</Text>
                    <QueryState
                        loading={types.isPending}
                        error={types.error}
                        retry={() => {
                            void types.refetch()
                        }}
                        empty={
                            !types.data?.rows.length
                                ? t('workspace.empty')
                                : undefined
                        }
                    />
                    {types.data?.rows.map((item) => (
                        <ContentRow
                            key={item.id}
                            title={localizedTitle(item, lan)}
                            icon={item.icon?.url}
                            onPress={() => setType(item.id)}
                        />
                    ))}
                </>
            ) : !template ? (
                <>
                    <Text style={s.heading}>
                        {t('workspace.chooseDocument')}
                    </Text>
                    <QueryState
                        loading={templates.isPending}
                        error={templates.error}
                        retry={() => {
                            void templates.refetch()
                        }}
                        empty={
                            !templates.data?.rows.length
                                ? t('workspace.empty')
                                : undefined
                        }
                    />
                    {templates.data?.rows.map((item) => (
                        <ContentRow
                            key={item.id}
                            title={localizedTitle(item, lan)}
                            onPress={() => {
                                setInputs({})
                                setTemplate(item.id)
                            }}
                        />
                    ))}
                </>
            ) : (
                <>
                    <QueryState
                        loading={details.isPending}
                        error={details.error}
                        retry={() => {
                            void details.refetch()
                        }}
                    />
                    {details.data && (
                        <FormCard>
                            <Text style={s.heading}>
                                {localizedTitle(details.data, lan)}
                            </Text>
                            <Text style={s.body}>
                                {t('workspace.documentPersonal')}
                            </Text>
                            {details.data.variables?.map((variable) => (
                                <Input
                                    key={variable.id}
                                    label={variable[`label${lan}`]}
                                    value={inputs[variable.key] ?? ''}
                                    maxLength={2000}
                                    onChangeText={(value) =>
                                        setInputs((old) => ({
                                            ...old,
                                            [variable.key]: value,
                                        }))
                                    }
                                />
                            ))}
                            <QueryState error={create.error} />
                            <LightButton
                                loading={create.isPending}
                                disabled={details.data.variables?.some(
                                    (variable) => !inputs[variable.key]?.trim(),
                                )}
                                onPress={() => create.mutate()}
                            >
                                {t('workspace.generate')}
                            </LightButton>
                        </FormCard>
                    )}
                </>
            )}
        </DetailScreen>
    )
}
