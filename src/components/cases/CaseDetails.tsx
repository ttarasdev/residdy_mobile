import { useState } from 'react'
import { Modal, Pressable, StyleSheet, View } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import useApi from '../../shared/hooks/useApi'
import { userCasesApi } from '../../api/user-cases/user-cases.api'
import { userCaseStagesApi } from '../../api/user-case-stages/user-case-stages.api'
import DetailScreen from '../shared/layout/DetailScreen'
import ScreenBackground from '../shared/layout/ScreenBackground'
import Card from '../shared/cards/Card'
import Text from '../shared/typography/Text'
import LightButton from '../shared/buttons/LightButton'
import QueryState from '../shared/content/QueryState'
import ContentRow from '../shared/content/ContentRow'
import StageTrack from './StageTrack'
import { visibleStages } from './stage-window'
import CaseTask from './CaseTask'
export default function CaseDetails() {
    const { id } = useLocalSearchParams<{ id: string }>()
    const { account, options } = useApi()
    const { t } = useTranslation()
    const client = useQueryClient()
    const [selected, setSelected] = useState<number>()
    const [allStages, setAllStages] = useState(false)
    const query = useQuery({
        queryKey: ['my-case', account?.account.id, id],
        queryFn: ({ signal }) =>
            userCasesApi.getOneFull(Number(id), { ...options, signal }),
        enabled: !!account && Number(id) > 0,
    })
    const item = query.data
    const stages = [...(item?.stages ?? [])].sort(
        (a, b) => (a.template?.stageNo ?? 0) - (b.template?.stageNo ?? 0),
    )
    const stage =
        stages.find((value) => value.id === selected) ??
        stages.find((value) => value.status === 'active') ??
        stages[stages.length - 1]
    async function refresh() {
        await Promise.all([
            query.refetch(),
            client.invalidateQueries({ queryKey: ['my-cases'] }),
            client.invalidateQueries({ queryKey: ['user-reminders'] }),
        ])
    }
    const next = useMutation({
        mutationFn: () => userCaseStagesApi.goNext(stage!.id, options),
        onSuccess: async () => {
            setSelected(undefined)
            await refresh()
        },
    })
    const tasks = stage?.tasks ?? []
    const done = tasks.filter((task) => task.status === 'done').length
    return (
        <DetailScreen title={t('workspace.case')}>
            <QueryState
                loading={query.isPending}
                error={query.error}
                retry={() => {
                    void query.refetch()
                }}
            />
            {item && (
                <>
                    <View style={styles.hero}>
                        <Text style={styles.title}>{item.template?.title}</Text>
                        <View style={styles.badge}>
                            <Text style={styles.badgeLabel}>
                                {t(
                                    item.status === 'completed'
                                        ? 'workspace.completed'
                                        : item.status === 'archived'
                                          ? 'casesUi.archived'
                                          : 'casesUi.inProgress',
                                )}
                            </Text>
                        </View>
                    </View>
                    <Card
                        padding={18}
                        radius={24}
                        backgroundColor="rgba(172,194,213,0.13)"
                        style={{ gap: 14 }}
                    >
                        <View style={styles.between}>
                            <Text style={styles.small}>
                                {t('workspace.stageCount', {
                                    current:
                                        stage?.template?.stageNo ??
                                        item.activeStageNo,
                                    total: stages.length,
                                })}
                            </Text>
                            <Pressable
                                accessibilityRole="button"
                                hitSlop={12}
                                onPress={() => setAllStages(true)}
                            >
                                <Text style={styles.all}>
                                    {t('casesUi.allStages')} ›
                                </Text>
                            </Pressable>
                        </View>
                        <StageTrack
                            stages={visibleStages(stages, stage?.id)}
                            selectedId={stage?.id}
                            onSelect={setSelected}
                        />
                    </Card>
                    {stage && (
                        <View style={{ gap: 18 }}>
                            <View style={styles.between}>
                                <Text style={styles.stageTitle}>
                                    {stage.template?.title}
                                </Text>
                                <Text style={styles.count}>
                                    {t('casesUi.taskCount', {
                                        done,
                                        total: tasks.length,
                                    })}
                                </Text>
                            </View>
                            <View>
                                {tasks.map((task, index) => (
                                    <CaseTask
                                        key={task.id}
                                        task={task}
                                        last={index === tasks.length - 1}
                                        editable={
                                            stage.status === 'active' &&
                                            item.status === 'active' &&
                                            !next.isPending
                                        }
                                        refresh={refresh}
                                    />
                                ))}
                            </View>
                            <QueryState error={next.error} />
                            {stage.status === 'active' &&
                                item.status === 'active' && (
                                    <View style={styles.next}>
                                        <LightButton
                                            height={48}
                                            disabled={done !== tasks.length}
                                            loading={next.isPending}
                                            onPress={() => next.mutate()}
                                        >
                                            {t(
                                                stage.template?.stageNo ===
                                                    stages[stages.length - 1]
                                                        ?.template?.stageNo
                                                    ? 'workspace.finishCase'
                                                    : 'workspace.nextStage',
                                            )}
                                        </LightButton>
                                        {done !== tasks.length && (
                                            <Text
                                                style={[
                                                    styles.small,
                                                    { textAlign: 'center' },
                                                ]}
                                            >
                                                {t('workspace.finishTasks')}
                                            </Text>
                                        )}
                                    </View>
                                )}
                        </View>
                    )}
                    {allStages && (
                        <Modal
                            animationType="slide"
                            onRequestClose={() => setAllStages(false)}
                        >
                            <ScreenBackground>
                                <DetailScreen
                                    title={t('casesUi.allStages')}
                                    onBack={() => setAllStages(false)}
                                >
                                    {stages.map((value) => (
                                        <ContentRow
                                            key={value.id}
                                            title={`${value.template?.stageNo}. ${value.template?.title}`}
                                            subtitle={t(
                                                `workspace.${value.status}`,
                                            )}
                                            icon={value.template?.icon?.url}
                                            selected={stage?.id === value.id}
                                            onPress={() => {
                                                setSelected(value.id)
                                                setAllStages(false)
                                            }}
                                        />
                                    ))}
                                </DetailScreen>
                            </ScreenBackground>
                        </Modal>
                    )}
                </>
            )}
        </DetailScreen>
    )
}
const styles = StyleSheet.create({
    hero: { alignItems: 'center', gap: 12, paddingBottom: 10 },
    title: {
        color: '#FFFFFF',
        fontFamily: 'Manrope_600SemiBold',
        fontSize: 27,
        lineHeight: 37,
        textAlign: 'center',
        maxWidth: 310,
    },
    badge: {
        backgroundColor: 'rgba(188,209,225,0.16)',
        paddingHorizontal: 18,
        paddingVertical: 6,
        borderRadius: 16,
    },
    badgeLabel: {
        color: '#FFFFFF',
        fontSize: 12,
        fontFamily: 'Manrope_400Regular',
    },
    between: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 14,
    },
    small: {
        color: '#AABCCB',
        fontSize: 11,
        lineHeight: 17,
        fontFamily: 'Manrope_400Regular',
    },
    all: { color: '#FFFFFF', fontSize: 12, fontFamily: 'Manrope_400Regular' },
    stageTitle: {
        flex: 1,
        color: '#FFFFFF',
        fontSize: 21,
        fontFamily: 'Manrope_600SemiBold',
        lineHeight: 29,
    },
    count: {
        color: '#C0CDD7',
        fontSize: 11,
        maxWidth: 100,
        textAlign: 'right',
    },
    next: { marginLeft: 46, gap: 10, marginTop: -12 },
})
