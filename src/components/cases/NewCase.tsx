import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import useApi from '../../shared/hooks/useApi'
import { caseTypesApi } from '../../api/case-types/case-types.api'
import { casesApi } from '../../api/cases/cases.api'
import { userCasesApi } from '../../api/user-cases/user-cases.api'
import DetailScreen from '../shared/layout/DetailScreen'
import FeatureArtwork from '../onboarding/first/FeatureArtwork'
import PaginationDots from '../shared/pagination/PaginationDots'
import ContentRow from '../shared/content/ContentRow'
import QueryState from '../shared/content/QueryState'
import LightButton from '../shared/buttons/LightButton'
import Text from '../shared/typography/Text'
import { contentStyles as s } from '../shared/content/content.styles'
export default function NewCase() {
    const { account, options, lan } = useApi()
    const { t } = useTranslation()
    const router = useRouter()
    const client = useQueryClient()
    const params = useLocalSearchParams<{ template?: string }>()
    const templateId = Number(params.template)
    const [applied, setApplied] = useState(false)
    const direct = useQuery({
        queryKey: ['case-template', account?.account.id, templateId],
        enabled: Number.isSafeInteger(templateId) && templateId > 0,
        queryFn: ({ signal }) =>
            casesApi.getOne(templateId, { ...options, signal }),
    })
    const [step, setStep] = useState(0)
    const [type, setType] = useState<number>()
    const [selected, setSelected] = useState<number>()
    useEffect(() => {
        if (direct.data && !applied) {
            setType(direct.data.typeId)
            setSelected(direct.data.id)
            setStep(2)
            setApplied(true)
        }
    }, [direct.data, applied])
    const types = useQuery({
        queryKey: ['case-types', lan],
        queryFn: ({ signal }) =>
            caseTypesApi.findAll(
                { lan, status: 'active', limit: 100 },
                { ...options, signal },
            ),
        enabled: !!account && step === 1,
    })
    const cases = useQuery({
        queryKey: ['case-catalog', lan, type],
        queryFn: ({ signal }) =>
            casesApi.findAll(
                { lan, status: 'active', typeId: type, limit: 100 },
                { ...options, signal },
            ),
        enabled: !!account && step === 2 && !!type,
    })
    const create = useMutation({
        mutationFn: () =>
            userCasesApi.create({ templateCaseId: selected! }, options),
        onSuccess: async (data) => {
            await client.invalidateQueries({ queryKey: ['my-cases'] })
            router.replace(`/cases/${data.id}`)
        },
    })
    return (
        <DetailScreen
            title={t('workspace.newCase')}
            onBack={() => {
                if (create.isPending) return
                if (step) setStep(step - 1)
                else router.back()
            }}
        >
            <QueryState
                loading={!!params.template && direct.isPending}
                error={direct.error}
                retry={() => {
                    void direct.refetch()
                }}
            />
            <PaginationDots
                count={3}
                index={step}
                label={t('workspace.stageCount', {
                    current: step + 1,
                    total: 3,
                })}
            />
            {step === 0 ? (
                <>
                    <FeatureArtwork feature="legalization" active />
                    <Text style={s.heading}>{t('workspace.caseWelcome')}</Text>
                    <Text style={s.body}>{t('workspace.caseWelcomeBody')}</Text>
                    <LightButton onPress={() => setStep(1)}>
                        {t('workspace.continue')}
                    </LightButton>
                </>
            ) : null}
            {step === 1 ? (
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
                            title={item.title}
                            icon={item.icon?.url}
                            onPress={() => {
                                setType(item.id)
                                setSelected(undefined)
                                setStep(2)
                            }}
                        />
                    ))}
                </>
            ) : null}
            {step === 2 ? (
                <>
                    <Text style={s.heading}>{t('workspace.chooseCase')}</Text>
                    <QueryState
                        loading={cases.isPending}
                        error={cases.error}
                        retry={() => {
                            void cases.refetch()
                        }}
                        empty={
                            !cases.data?.rows.length
                                ? t('workspace.empty')
                                : undefined
                        }
                    />
                    {cases.data?.rows.map((item) => (
                        <ContentRow
                            key={item.id}
                            title={item.title}
                            subtitle={item.subtitle}
                            icon={item.icon?.url}
                            selected={selected === item.id}
                            onPress={() => {
                                if (!create.isPending) setSelected(item.id)
                            }}
                        />
                    ))}
                    <QueryState error={create.error} />
                    <LightButton
                        disabled={!selected}
                        loading={create.isPending}
                        onPress={() => create.mutate()}
                    >
                        {t('workspace.startCase')}
                    </LightButton>
                </>
            ) : null}
        </DetailScreen>
    )
}
