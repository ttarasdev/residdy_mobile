import { useIsFocused, useRouter } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import useApi from '../../shared/hooks/useApi'
import { userNotificationsApi } from '../../api/user-notifications/user-notifications.api'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import Text from '../shared/typography/Text'
import SearchButton from '../shared/buttons/SearchButton'
import IconButton from '../shared/buttons/IconButton'
import GlobalSearchModal from '../search/GlobalSearchModal'

interface TabHeaderProps {
    title: string
    hasUnreadNotifications?: boolean
    onNotificationsPress?: () => void
}

export default function TabHeader({
    title,
    hasUnreadNotifications,
    onNotificationsPress,
}: TabHeaderProps) {
    const { t } = useTranslation()
    const router = useRouter()
    const focused = useIsFocused()
    const { account, options } = useApi()
    const unread = useQuery({
        queryKey: ['notifications-unread', account?.account.id],
        enabled: !!account && focused,
        queryFn: ({ signal }) =>
            userNotificationsApi.getMyUnreadCount({ ...options, signal }),
        refetchInterval: focused ? 60_000 : false,
    })
    const hasUnread = hasUnreadNotifications ?? (unread.data?.unread ?? 0) > 0

    const [searchOpen, setSearchOpen] = useState(false)
    return (
        <>
            <View style={styles.header}>
                <Text
                    accessibilityRole="header"
                    numberOfLines={1}
                    style={styles.title}
                >
                    {title}
                </Text>
                <SearchButton
                    iconSize={36}
                    accessibilityLabel={t('search.open')}
                    backgroundColor="transparent"
                    onPress={() => setSearchOpen(true)}
                />
                <View>
                    <IconButton
                        icon={require('../../../assets/system_icons/multi/onboarding-bell-white.png')}
                        accessibilityLabel={t(
                            hasUnread
                                ? 'search.notificationsUnread'
                                : 'search.notifications',
                        )}
                        iconSize={36}
                        backgroundColor="transparent"
                        onPress={
                            onNotificationsPress ??
                            (() => router.push('/profile/notifications'))
                        }
                    />
                    {hasUnread && (
                        <View pointerEvents="none" style={styles.dot} />
                    )}
                </View>
            </View>
            {searchOpen && (
                <GlobalSearchModal onClose={() => setSearchOpen(false)} />
            )}
        </>
    )
}
const styles = StyleSheet.create({
    header: {
        height: 56,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        flex: 1,
        color: '#FFFFFF',
        fontFamily: 'Manrope_400Regular',
        fontSize: 16,
        lineHeight: 24,
        marginRight: 12,
    },
    dot: {
        position: 'absolute',
        right: 8,
        top: 7,
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: '#F49A55',
    },
})
