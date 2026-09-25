import { useState } from 'react'
import { Modal, Pressable, StyleSheet, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import ScreenBackground from '../shared/layout/ScreenBackground'
import DetailScreen from '../shared/layout/DetailScreen'
import Card from '../shared/cards/Card'
import Text from '../shared/typography/Text'
import Input from '../shared/inputs/Input'
import LightButton from '../shared/buttons/LightButton'
import QueryState from '../shared/content/QueryState'
import { parseTaskDate } from './task-date'
const pad = (n: number) => String(n).padStart(2, '0')
export default function TaskDateModal({
    title,
    initialDate,
    onClose,
    onSave,
    pending,
    error,
}: {
    title: string
    initialDate?: string | null
    onClose: () => void
    onSave: (iso: string) => void
    pending: boolean
    error: unknown
}) {
    const { t, i18n } = useTranslation()
    const initial = initialDate ? new Date(initialDate) : new Date()
    const [month, setMonth] = useState(
        new Date(initial.getFullYear(), initial.getMonth(), 1),
    )
    const [day, setDay] = useState(initial)
    const [time, setTime] = useState(
        initialDate
            ? `${pad(initial.getHours())}:${pad(initial.getMinutes())}`
            : '12:00',
    )
    const [invalid, setInvalid] = useState(false)
    const offset =
        (new Date(month.getFullYear(), month.getMonth(), 1).getDay() + 6) % 7
    const count = new Date(
        month.getFullYear(),
        month.getMonth() + 1,
        0,
    ).getDate()
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const cells = Array.from(
        { length: Math.ceil((offset + count) / 7) * 7 },
        (_, i) => i - offset + 1,
    )
    return (
        <Modal
            animationType="slide"
            onRequestClose={() => {
                if (!pending) onClose()
            }}
        >
            <ScreenBackground>
                <DetailScreen
                    title={t('casesUi.chooseDate')}
                    onBack={() => {
                        if (!pending) onClose()
                    }}
                >
                    <Text style={styles.heading}>
                        {t('casesUi.saveYourDate')}
                    </Text>
                    <Text style={styles.body}>{title}</Text>
                    <Card backgroundColor="#344B5D" padding={18} radius={24}>
                        <View style={styles.month}>
                            <Text style={styles.monthTitle}>
                                {month.toLocaleDateString(i18n.language, {
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </Text>
                            {[-1, 1].map((direction) => (
                                <Pressable
                                    key={direction}
                                    accessibilityRole="button"
                                    accessibilityLabel={t(
                                        direction === -1
                                            ? 'casesUi.previousMonth'
                                            : 'casesUi.nextMonth',
                                    )}
                                    onPress={() =>
                                        setMonth(
                                            new Date(
                                                month.getFullYear(),
                                                month.getMonth() + direction,
                                                1,
                                            ),
                                        )
                                    }
                                    style={styles.arrow}
                                >
                                    <Text style={styles.heading}>
                                        {direction === -1 ? '‹' : '›'}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>
                        <View style={styles.grid}>
                            {Array.from({ length: 7 }, (_, i) => (
                                <Text key={i} style={styles.weekday}>
                                    {new Date(
                                        2026,
                                        8,
                                        21 + i,
                                    ).toLocaleDateString(i18n.language, {
                                        weekday: 'short',
                                    })}
                                </Text>
                            ))}
                            {cells.map((n, i) => {
                                const valid = n > 0 && n <= count
                                const date = new Date(
                                    month.getFullYear(),
                                    month.getMonth(),
                                    n,
                                )
                                const past = date < today
                                const selected =
                                    valid &&
                                    date.toDateString() === day.toDateString()
                                return (
                                    <View key={i} style={styles.cell}>
                                        {valid && (
                                            <Pressable
                                                accessibilityRole="button"
                                                accessibilityState={{
                                                    selected,
                                                    disabled: past,
                                                }}
                                                accessibilityLabel={date.toLocaleDateString(
                                                    i18n.language,
                                                )}
                                                disabled={past || pending}
                                                onPress={() => {
                                                    setDay(date)
                                                    setInvalid(false)
                                                }}
                                                style={[
                                                    styles.day,
                                                    selected && styles.selected,
                                                    past && { opacity: 0.25 },
                                                ]}
                                            >
                                                <Text style={styles.dayText}>
                                                    {n}
                                                </Text>
                                            </Pressable>
                                        )}
                                    </View>
                                )
                            })}
                        </View>
                    </Card>
                    <Input
                        label={t('casesUi.time')}
                        placeholder="12:30"
                        value={time}
                        maxLength={5}
                        keyboardType="numbers-and-punctuation"
                        editable={!pending}
                        onChangeText={(value) => {
                            setTime(value)
                            setInvalid(false)
                        }}
                        error={invalid ? t('workspace.invalidDate') : undefined}
                    />
                    <Text style={styles.body}>
                        {day.toLocaleDateString(i18n.language, {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                        })}{' '}
                        · {time}
                    </Text>
                    <QueryState error={error} />
                    <LightButton
                        loading={pending}
                        onPress={() => {
                            const iso = parseTaskDate(
                                `${day.getFullYear()}-${pad(day.getMonth() + 1)}-${pad(day.getDate())} ${time}`,
                            )
                            if (!iso) {
                                setInvalid(true)
                                return
                            }
                            onSave(iso)
                        }}
                    >
                        {t('workspace.saveDate')}
                    </LightButton>
                </DetailScreen>
            </ScreenBackground>
        </Modal>
    )
}
const styles = StyleSheet.create({
    heading: {
        color: '#FFFFFF',
        fontFamily: 'Manrope_600SemiBold',
        fontSize: 27,
    },
    body: {
        color: '#AABCCB',
        fontSize: 13,
        lineHeight: 21,
        fontFamily: 'Manrope_400Regular',
    },
    month: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
    monthTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: 'Manrope_600SemiBold',
        flex: 1,
    },
    arrow: {
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
    },
    grid: { flexDirection: 'row', flexWrap: 'wrap' },
    weekday: {
        width: '14.2857%',
        textAlign: 'center',
        color: '#AABCCB',
        fontSize: 11,
        marginBottom: 10,
    },
    cell: {
        width: '14.2857%',
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
    },
    day: {
        width: 38,
        height: 38,
        borderRadius: 19,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selected: { backgroundColor: '#8498A9' },
    dayText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'Manrope_400Regular',
    },
})
