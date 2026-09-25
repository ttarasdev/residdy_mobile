import { StyleSheet, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import type { UserCase } from '../../api/models'
import Card from '../shared/cards/Card'
import Text from '../shared/typography/Text'
import StageTrack from './StageTrack'
import { visibleStages } from './stage-window'
export default function CaseCard({
    item,
    onPress,
}: {
    item: UserCase
    onPress: () => void
}) {
    const { t } = useTranslation()
    const stages = [...(item.stages ?? [])].sort(
        (a, b) => (a.template?.stageNo ?? 0) - (b.template?.stageNo ?? 0),
    )
    const active =
        stages.find((stage) => stage.status === 'active') ??
        stages[stages.length - 1]
    const visible = visibleStages(stages, active?.id)
    return (
        <Card
            radius={24}
            padding={20}
            backgroundColor={
                item.status === 'completed' ? '#293E4E' : '#3B5062'
            }
            onPress={onPress}
            style={styles.card}
        >
            <View style={{ gap: 4 }}>
                <Text style={styles.status}>
                    {t(
                        item.status === 'completed'
                            ? 'workspace.completed'
                            : item.status === 'archived'
                              ? 'casesUi.archived'
                              : 'casesUi.inProgress',
                    ).toLocaleUpperCase()}
                </Text>
                <Text style={styles.title}>{item.template?.title}</Text>
                <Text style={styles.meta}>
                    {t('workspace.stageCount', {
                        current: item.activeStageNo,
                        total: stages.length,
                    })}
                </Text>
            </View>
            <StageTrack stages={visible} selectedId={active?.id} />
            <View style={styles.footer}>
                <Text style={styles.meta}>
                    {stages.length > visible.length
                        ? t('casesUi.moreStages', {
                              count: stages.length - visible.length,
                          })
                        : t('casesUi.allStages')}
                </Text>
                <Text style={styles.link}>{t('workspace.continue')} ›</Text>
            </View>
        </Card>
    )
}
const styles = StyleSheet.create({
    card: { gap: 16 },
    status: {
        color: '#B7C6D2',
        fontSize: 10,
        fontFamily: 'Manrope_400Regular',
    },
    title: {
        color: '#FFFFFF',
        fontFamily: 'Manrope_600SemiBold',
        fontSize: 18,
        lineHeight: 25,
    },
    meta: { color: '#AFBFCD', fontSize: 11, fontFamily: 'Manrope_400Regular' },
    footer: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
    link: { color: '#FFFFFF', fontSize: 12, fontFamily: 'Manrope_400Regular' },
})
