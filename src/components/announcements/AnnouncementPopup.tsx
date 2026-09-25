import { useEffect, useRef, useState } from 'react'
import {
    AppState,
    Image,
    Linking,
    Pressable,
    View,
    useWindowDimensions,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { usePathname, useRouter, type Href } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import useApi from '../../shared/hooks/useApi'
import { appAnnouncementsApi } from '../../api/app-announcements/app-announcements.api'
import type { ActiveAppAnnouncement } from '../../api/app-announcements/app-announcements.types'
import { publicAssetUrl } from '../../shared/utils/public-asset-url'
import Popup from '../shared/feedback/Popup'
import { usePopupBusy } from '../shared/feedback/PopupActivity'
import CloseButton from '../shared/buttons/CloseButton'
import { announcementDestination, announcementDue } from './announcement-policy'

const tabs = new Set([
    '/home',
    '/legalization',
    '/blog',
    '/partners',
    '/profile',
])
export default function AnnouncementPopup() {
    const { account, options, lan } = useApi()
    const { t } = useTranslation()
    const path = usePathname()
    const router = useRouter()
    const busy = usePopupBusy()
    const { width, height } = useWindowDimensions()
    const [foreground, setForeground] = useState(
        AppState.currentState === 'active',
    )
    const [tick, setTick] = useState(0)
    const [shown, setShown] = useState<ActiveAppAnnouncement | null>(null)
    const [ratio, setRatio] = useState(0.75)
    const memory = useRef(new Map<string, number>())
    const enabled = !!account && foreground && tabs.has(path) && !busy
    const query = useQuery({
        queryKey: ['app-announcement', account?.account.id, lan],
        enabled,
        queryFn: ({ signal }) =>
            appAnnouncementsApi.getActive({ ...options, lan, signal }),
        staleTime: 30_000,
        refetchInterval: enabled ? 30_000 : false,
        retry: false,
    })
    useEffect(() => {
        const subscription = AppState.addEventListener('change', (state) =>
            setForeground(state === 'active'),
        )
        return () => subscription.remove()
    }, [])
    useEffect(() => {
        if (!foreground) return
        const timer = setInterval(() => setTick((value) => value + 1), 15_000)
        return () => clearInterval(timer)
    }, [foreground])
    useEffect(() => {
        setShown(null)
    }, [path, foreground, account?.account.id, lan, busy])
    useEffect(() => {
        const item = query.data?.announcement
        if (!enabled || shown || !item || query.isError || query.isFetching)
            return
        let cancelled = false
        const key = `announcement-shown:${account!.account.id}:${item.id}`
        const timer = setTimeout(() => {
            void (async () => {
                const saved =
                    memory.current.get(key) ??
                    Number(await AsyncStorage.getItem(key))
                if (
                    !announcementDue(item, saved || null, Date.now()) ||
                    cancelled
                )
                    return
                const uri = publicAssetUrl(item.imageUrl, options.baseUrl)
                const dimensions = await new Promise<{
                    width: number
                    height: number
                }>((resolve, reject) =>
                    Image.getSize(
                        uri,
                        (width, height) => resolve({ width, height }),
                        reject,
                    ),
                )
                await Image.prefetch(uri)
                if (
                    cancelled ||
                    !announcementDue(item, saved || null, Date.now())
                )
                    return
                const now = Date.now()
                // Persist before presenting so navigation/restarts cannot trigger a duplicate popup.
                await AsyncStorage.setItem(key, String(now))
                if (cancelled) return
                memory.current.set(key, now)
                setRatio(dimensions.width / dimensions.height)
                setShown(item)
            })().catch(() => {
                /* Optional promotions never block the user's work. */
            })
        }, 2000)
        return () => {
            cancelled = true
            clearTimeout(timer)
        }
    }, [
        enabled,
        shown,
        query.data,
        query.isError,
        query.isFetching,
        tick,
        account?.account.id,
        options.baseUrl,
    ])
    useEffect(() => {
        if (
            shown &&
            (Date.parse(shown.endsAt) <= Date.now() ||
                query.data?.announcement?.id !== shown.id)
        )
            setShown(null)
    }, [shown, tick, query.data])
    if (!shown || !enabled) return null
    const destination = announcementDestination(shown.action)
    const cardWidth = Math.min(
        width - 40,
        420,
        Math.max(120, height - 200) * ratio,
    )
    return (
        <Popup visible onClose={() => setShown(null)} blocksPromotions={false}>
            <View style={{ gap: 12, alignItems: 'center' }}>
                <View style={{ width: cardWidth, alignItems: 'flex-end' }}>
                    <CloseButton
                        accessibilityLabel={t('feedback.close')}
                        onPress={() => setShown(null)}
                    />
                </View>
                <Pressable
                    disabled={!destination}
                    accessibilityRole={destination ? 'link' : 'image'}
                    accessibilityLabel={t(
                        destination
                            ? 'announcementUi.open'
                            : 'announcementUi.offer',
                    )}
                    onPress={() => {
                        setShown(null)
                        if (!destination) return
                        if (shown.action?.type === 'external_url')
                            void Linking.openURL(destination).catch(() => {})
                        else router.push(destination as Href)
                    }}
                    style={{
                        width: cardWidth,
                        aspectRatio: ratio,
                        borderRadius: 26,
                        overflow: 'hidden',
                        backgroundColor: '#20394D',
                    }}
                >
                    <Image
                        source={{
                            uri: publicAssetUrl(
                                shown.imageUrl,
                                options.baseUrl,
                            ),
                        }}
                        resizeMode="contain"
                        onError={() => setShown(null)}
                        style={{ width: '100%', height: '100%' }}
                    />
                </Pressable>
            </View>
        </Popup>
    )
}
