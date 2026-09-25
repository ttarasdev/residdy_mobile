import { publicAssetUrl } from '../../shared/utils/public-asset-url'
import { getApiUrl } from '../../shared/config/api'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import type { UserCaseStage } from '../../api/models'
import Text from '../shared/typography/Text'

/** The same three-stage timeline is used in case cards and case details. */
export default function StageTrack({
    stages,
    selectedId,
    onSelect,
}: {
    stages: UserCaseStage[]
    selectedId?: number
    onSelect?: (id: number) => void
}) {
    return (
        <View style={styles.track}>
            <View style={styles.line} />
            {stages.map((stage) => {
                const selected = stage.id === selectedId
                const done = stage.status === 'done'
                const content = (
                    <>
                        <View
                            style={[
                                styles.circle,
                                done && styles.done,
                                selected && styles.selected,
                            ]}
                        >
                            {stage.template?.icon?.url && (
                                <Image
                                    source={{
                                        uri: publicAssetUrl(
                                            stage.template.icon.url,
                                            getApiUrl(),
                                        ),
                                    }}
                                    style={[
                                        styles.icon,
                                        stage.status === 'locked' && {
                                            opacity: 0.55,
                                        },
                                    ]}
                                />
                            )}
                        </View>
                        <Text
                            numberOfLines={2}
                            style={[
                                styles.label,
                                selected && styles.selectedLabel,
                            ]}
                        >
                            {stage.template?.title}
                        </Text>
                    </>
                )
                return onSelect ? (
                    <Pressable
                        key={stage.id}
                        accessibilityRole="button"
                        accessibilityState={{ selected }}
                        accessibilityLabel={stage.template?.title}
                        onPress={() => onSelect(stage.id)}
                        style={styles.step}
                    >
                        {content}
                    </Pressable>
                ) : (
                    <View key={stage.id} style={styles.step}>
                        {content}
                    </View>
                )
            })}
        </View>
    )
}
const styles = StyleSheet.create({
    track: { flexDirection: 'row', paddingTop: 4, minHeight: 88 },
    line: {
        position: 'absolute',
        height: 1,
        backgroundColor: 'rgba(199,216,230,0.28)',
        top: 26,
        left: 12,
        right: 12,
    },
    step: { flex: 1, alignItems: 'center', gap: 10, paddingHorizontal: 3 },
    circle: {
        height: 44,
        width: 44,
        borderRadius: 22,
        borderWidth: 1,
        borderColor: '#63798B',
        backgroundColor: '#344958',
        alignItems: 'center',
        justifyContent: 'center',
    },
    done: { backgroundColor: '#587083', borderColor: '#587083' },
    selected: { backgroundColor: '#71889A', borderColor: '#C4D4DF' },
    icon: { height: 23, width: 23, resizeMode: 'contain' },
    label: {
        color: '#ABBECD',
        fontSize: 11,
        lineHeight: 16,
        fontFamily: 'Manrope_400Regular',
        textAlign: 'center',
    },
    selectedLabel: { color: '#FFFFFF', fontFamily: 'Manrope_600SemiBold' },
})
