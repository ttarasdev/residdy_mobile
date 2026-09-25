import { usePopupBlocker } from '../shared/feedback/PopupActivity'
import { useEffect, useRef, useState } from 'react'
import {
    Keyboard,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    View,
    type TextInput as NativeTextInput,
} from 'react-native'
import {
    SafeAreaProvider,
    initialWindowMetrics,
} from 'react-native-safe-area-context'
import { useTranslation } from 'react-i18next'
import ScreenBackground from '../shared/layout/ScreenBackground'
import Screen from '../shared/layout/Screen'
import Input from '../shared/inputs/Input'
import CloseButton from '../shared/buttons/CloseButton'
import Text from '../shared/typography/Text'
import useAccessibilityPreferences from '../../shared/hooks/useAccessibilityPreferences'
import SearchLoading from './SearchLoading'
import { useRouter, type Href } from 'expo-router'
import { useMutation } from '@tanstack/react-query'
import useApi from '../../shared/hooks/useApi'
import useGlobalSearch from './useGlobalSearch'
import SearchResults from './SearchResults'
import SearchResultCard from './SearchResultCard'
import { searchDestination } from './search-navigation'
import type { SearchItem, SearchType } from '../../api/search/search.types'
import { openUserDocument } from '../../shared/utils/open-user-document'
import QueryState from '../shared/content/QueryState'
import OutlineButton from '../shared/buttons/OutlineButton'
import { ApiError } from '../../api/http'

/** Shared full-screen search, opened from every tab header. */
export default function GlobalSearchModal({
    onClose,
}: {
    onClose: () => void
}) {
    usePopupBlocker(true)
    const { t } = useTranslation()
    const [query, setQuery] = useState('')
    const [group, setGroup] = useState<SearchType>()
    const results = useGlobalSearch(query, group)
    const router = useRouter()
    useEffect(() => {
        if (
            results.error instanceof ApiError &&
            results.error.code === 'SUBSCRIPTION_REQUIRED'
        ) {
            onClose()
            router.replace('/profile')
        }
    }, [results.error, onClose, router])
    const { options } = useApi()
    const openFile = useMutation({
        mutationFn: (id: number) => openUserDocument(id, options),
    })
    function select(item: SearchItem) {
        Keyboard.dismiss()
        if (item.type === 'user_document') {
            if (item.available && !openFile.isPending) openFile.mutate(item.id)
            return
        }
        const destination = searchDestination(item)
        if (destination) {
            onClose()
            router.push(destination as Href)
        }
    }
    function changeQuery(value: string) {
        setQuery(value)
        setGroup(undefined)
    }

    const input = useRef<NativeTextInput>(null)
    const { reduceMotion } = useAccessibilityPreferences()
    function close() {
        Keyboard.dismiss()
        onClose()
    }
    return (
        <Modal
            visible
            animationType={reduceMotion ? 'none' : 'fade'}
            presentationStyle="fullScreen"
            onRequestClose={() => (group ? setGroup(undefined) : close())}
            onShow={() => input.current?.focus()}
        >
            <SafeAreaProvider initialMetrics={initialWindowMetrics}>
                <ScreenBackground>
                    <Screen
                        paddingHorizontal={20}
                        paddingTop={13}
                        paddingBottom={0}
                        gap={0}
                    >
                        <KeyboardAvoidingView
                            style={{ flex: 1 }}
                            behavior={
                                Platform.OS === 'ios' ? 'padding' : undefined
                            }
                        >
                            <View style={styles.top}>
                                <Input
                                    ref={input}
                                    label={t('search.open')}
                                    hideLabel
                                    placeholder={t('search.placeholder')}
                                    value={query}
                                    onChangeText={changeQuery}
                                    icon={require('../../../assets/system_icons/nav_icons/search-white.png')}
                                    containerStyle={{ flex: 1 }}
                                    fieldStyle={styles.field}
                                    style={{
                                        paddingVertical: 10,
                                        lineHeight: 20,
                                    }}
                                    returnKeyType="search"
                                    onSubmitEditing={Keyboard.dismiss}
                                    maxLength={120}
                                    right={
                                        query ? (
                                            <CloseButton
                                                size={32}
                                                iconSize={16}
                                                backgroundColor="transparent"
                                                accessibilityLabel={t(
                                                    'search.clear',
                                                )}
                                                onPress={() => {
                                                    changeQuery('')
                                                    input.current?.focus()
                                                }}
                                            />
                                        ) : undefined
                                    }
                                />
                                <CloseButton
                                    accessibilityLabel={t('search.close')}
                                    onPress={close}
                                />
                            </View>
                            <ScrollView
                                keyboardShouldPersistTaps="handled"
                                keyboardDismissMode="on-drag"
                                contentContainerStyle={styles.content}
                            >
                                {group && (
                                    <OutlineButton
                                        height={40}
                                        onPress={() => setGroup(undefined)}
                                    >
                                        {t('search.back')}
                                    </OutlineButton>
                                )}
                                {!query.trim() && !group && (
                                    <View style={{ gap: 12, marginBottom: 26 }}>
                                        <Text style={styles.heading}>
                                            {t('search.heading')}
                                        </Text>
                                        <Text style={styles.hint}>
                                            {t('search.quickActions')}
                                        </Text>
                                        {(
                                            [
                                                'user_cases',
                                                'documents',
                                                'consultations',
                                            ] as const
                                        ).map((key, index) => {
                                            const item: SearchItem = {
                                                type: 'screen',
                                                key:
                                                    index === 0
                                                        ? 'new_case'
                                                        : key,
                                                title: t(
                                                    `search.shortcuts.${index}`,
                                                ),
                                            }
                                            return (
                                                <SearchResultCard
                                                    key={key}
                                                    item={item}
                                                    onPress={() =>
                                                        index === 0
                                                            ? (onClose(),
                                                              router.push(
                                                                  '/cases/new',
                                                              ))
                                                            : select(item)
                                                    }
                                                />
                                            )
                                        })}
                                    </View>
                                )}
                                <QueryState
                                    error={results.error || openFile.error}
                                    retry={() => {
                                        openFile.reset()
                                        void results.refetch()
                                    }}
                                />
                                {results.loading ? (
                                    <SearchLoading />
                                ) : (
                                    <>
                                        <SearchResults
                                            groups={results.groups}
                                            onSelect={select}
                                            onGroup={setGroup}
                                            selectedType={group}
                                            openingId={
                                                openFile.isPending
                                                    ? openFile.variables
                                                    : undefined
                                            }
                                        />
                                        {!results.error &&
                                            !results.groups.length && (
                                                <View
                                                    style={{
                                                        gap: 12,
                                                        paddingVertical: 24,
                                                    }}
                                                >
                                                    <Text
                                                        style={styles.heading}
                                                    >
                                                        {t('search.empty')}
                                                    </Text>
                                                    <Text style={styles.hint}>
                                                        {t('search.emptyHint')}
                                                    </Text>
                                                </View>
                                            )}
                                        {group && results.hasNextPage && (
                                            <OutlineButton
                                                loading={
                                                    results.isFetchingNextPage
                                                }
                                                onPress={() => {
                                                    if (
                                                        !results.isFetchingNextPage
                                                    )
                                                        void results.fetchNextPage()
                                                }}
                                            >
                                                {t('search.more')}
                                            </OutlineButton>
                                        )}
                                    </>
                                )}
                            </ScrollView>
                        </KeyboardAvoidingView>
                    </Screen>
                </ScreenBackground>
            </SafeAreaProvider>
        </Modal>
    )
}
const styles = StyleSheet.create({
    top: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    field: {
        minHeight: 44,
        height: 44,
        borderRadius: 22,
        borderColor: 'rgba(255,255,255,0.12)',
    },
    content: { paddingTop: 26, paddingBottom: 24, gap: 16 },
    heading: {
        color: '#FFFFFF',
        fontFamily: 'Manrope_600SemiBold',
        fontSize: 28,
        lineHeight: 39,
    },
    hint: {
        color: '#A4B6C5',
        fontFamily: 'Manrope_400Regular',
        fontSize: 14,
        lineHeight: 22,
    },
})
