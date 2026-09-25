import { publicAssetUrl } from '../../shared/utils/public-asset-url'
import { getApiUrl } from '../../shared/config/api'
import { useState } from 'react'
import {
    ActivityIndicator,
    Image,
    Pressable,
    StyleSheet,
    View,
} from 'react-native'
import { useRouter } from 'expo-router'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import type { UserCaseTask } from '../../api/models'
import { userCaseTasksApi } from '../../api/user-case-tasks/user-case-tasks.api'
import useApi from '../../shared/hooks/useApi'
import Card from '../shared/cards/Card'
import Button from '../shared/buttons/Button'
import Text from '../shared/typography/Text'
import QueryState from '../shared/content/QueryState'
import TaskDateModal from './TaskDateModal'
export default function CaseTask({
    task,
    editable,
    last,
    refresh,
}: {
    task: UserCaseTask
    editable: boolean
    last: boolean
    refresh: () => Promise<unknown>
}) {
    const { options } = useApi()
    const { t, i18n } = useTranslation()
    const router = useRouter()
    const [dateOpen, setDateOpen] = useState(false)
    const done = task.status === 'done'
    const dated = task.template?.type === 'with_date'
    const paper = !done && !dated
    const mutation = useMutation({
        mutationFn: (date?: string) =>
            date
                ? userCaseTasksApi.setDate(
                      task.id,
                      { selectedDate: date },
                      options,
                  )
                : userCaseTasksApi.toggle(task.id, options),
        onSuccess: async () => {
            await refresh()
            setDateOpen(false)
        },
    })
    const iconUrl = task.template?.icon?.url
    return (
        <View style={styles.row}>
            <View style={styles.rail}>
                {!last && <View style={styles.connector} />}
                <View
                    style={[
                        styles.node,
                        paper && { backgroundColor: '#E8EEF4' },
                    ]}
                >
                    {iconUrl && (
                        <Image
                            source={{
                                uri: publicAssetUrl(iconUrl, getApiUrl()),
                            }}
                            style={[
                                styles.icon,
                                paper && { tintColor: '#253B4C' },
                            ]}
                        />
                    )}
                </View>
            </View>
            <Card
                padding={18}
                radius={22}
                backgroundColor={
                    done ? '#293F50' : paper ? '#E8EEF4' : '#182A38'
                }
                style={styles.card}
            >
                <View style={styles.titleRow}>
                    <Text
                        style={[
                            styles.title,
                            {
                                color: paper ? '#111D25' : '#DCE6EE',
                                fontFamily: paper
                                    ? 'Manrope_600SemiBold'
                                    : 'Manrope_400Regular',
                            },
                        ]}
                    >
                        {task.template?.title}
                    </Text>
                    {editable && !dated && (
                        <Pressable
                            accessibilityRole="checkbox"
                            accessibilityState={{
                                checked: done,
                                disabled: mutation.isPending,
                            }}
                            accessibilityLabel={t(
                                done ? 'workspace.undo' : 'workspace.markDone',
                            )}
                            disabled={mutation.isPending}
                            onPress={() => mutation.mutate(undefined)}
                            hitSlop={10}
                            style={styles.checkHit}
                        >
                            {mutation.isPending ? (
                                <ActivityIndicator
                                    size="small"
                                    color={paper ? '#253B4C' : '#FFFFFF'}
                                />
                            ) : (
                                <View
                                    style={[
                                        styles.check,
                                        done && { backgroundColor: '#587083' },
                                    ]}
                                >
                                    {done && (
                                        <Image
                                            source={require('../../../assets/system_icons/multi/check-white.png')}
                                            style={{ width: 15, height: 15 }}
                                        />
                                    )}
                                </View>
                            )}
                        </Pressable>
                    )}
                </View>
                <Text
                    style={[
                        styles.body,
                        { color: paper ? '#607386' : '#AABCCB' },
                    ]}
                >
                    {task.template?.subtitle}
                </Text>
                {task.selectedDate && (
                    <Text style={styles.body}>
                        {new Date(task.selectedDate).toLocaleString(
                            i18n.language,
                        )}
                    </Text>
                )}
                {done && (
                    <Text style={styles.status}>{t('workspace.done')}</Text>
                )}
                <View style={styles.actions}>
                    {!done && !!task.template?.instructionId && (
                        <Button
                            backgroundColor={paper ? '#111D25' : '#344958'}
                            height={38}
                            padding={18}
                            textStyle={styles.buttonText}
                            onPress={() =>
                                router.push(
                                    `/instructions/${task.template!.instructionId}`,
                                )
                            }
                        >
                            {t('workspace.instruction')}
                        </Button>
                    )}
                    {dated && editable && (
                        <Button
                            height={38}
                            padding={16}
                            backgroundColor="#344958"
                            textStyle={styles.buttonText}
                            startIcon={
                                <Image
                                    source={require('../../../assets/system_icons/multi/onboarding-calendar-white.png')}
                                    style={{ width: 18, height: 18 }}
                                />
                            }
                            onPress={() => {
                                mutation.reset()
                                setDateOpen(true)
                            }}
                        >
                            {t('casesUi.chooseDate')}
                        </Button>
                    )}
                </View>
                {!dateOpen && <QueryState error={mutation.error} />}
            </Card>
            {dateOpen && (
                <TaskDateModal
                    title={task.template?.title ?? ''}
                    initialDate={task.selectedDate}
                    pending={mutation.isPending}
                    error={mutation.error}
                    onClose={() => setDateOpen(false)}
                    onSave={(value) => mutation.mutate(value)}
                />
            )}
        </View>
    )
}
const styles = StyleSheet.create({
    row: { flexDirection: 'row', gap: 10 },
    rail: { width: 36, alignItems: 'center' },
    connector: {
        position: 'absolute',
        top: 32,
        bottom: -18,
        width: 1,
        backgroundColor: '#526778',
    },
    node: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#3D5567',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 14,
    },
    icon: { width: 21, height: 21, resizeMode: 'contain' },
    card: { flex: 1, gap: 9, marginBottom: 18 },
    titleRow: { flexDirection: 'row', gap: 8, alignItems: 'flex-start' },
    title: { flex: 1, fontSize: 15, lineHeight: 22 },
    body: {
        color: '#AABCCB',
        fontFamily: 'Manrope_400Regular',
        fontSize: 12,
        lineHeight: 19,
    },
    checkHit: {
        width: 26,
        height: 26,
        alignItems: 'center',
        justifyContent: 'center',
    },
    check: {
        width: 19,
        height: 19,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#8B9CAB',
        alignItems: 'center',
        justifyContent: 'center',
    },
    status: { color: '#DCE6EE', fontSize: 11 },
    actions: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 4 },
    buttonText: { fontSize: 12, fontFamily: 'Manrope_400Regular' },
})
