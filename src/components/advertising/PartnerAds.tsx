import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import {
    Alert,
    AppState,
    Linking,
    View,
    type LayoutRectangle,
} from 'react-native'
import { useFocusEffect } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { partnerBannersApi } from '../../api/partner-banners/partner-banners.api'
import type { PartnerBanner } from '../../api/models'
import { useSession } from '../../shared/providers/SessionProvider'
import { getApiUrl, withApi } from '../../shared/config/api'
import Skeleton, { SkeletonGroup } from '../shared/loading/Skeleton'
import BannerSlider from './BannerSlider'
import BigBannerCard from './BigBannerCard'
import { bannerLink, isBannerVisible } from './banner-content'
import { ApiError } from '../../api/http'

/** Placement coordinates are relative to the containing vertical ScrollView. */
export default function PartnerAds({
    offset,
    viewportHeight,
    children,
    showBig = true,
}: {
    offset: number
    viewportHeight: number
    children?: ReactNode
    showBig?: boolean
}) {
    const { session } = useSession()
    const account = session.status === 'authenticated' ? session : null
    const { t } = useTranslation()
    const [focused, setFocused] = useState(false)
    const [active, setActive] = useState(AppState.currentState === 'active')
    const [top, setTop] = useState(0)
    const [smallLayout, setSmallLayout] = useState<LayoutRectangle | null>(null)
    const [bigLayout, setBigLayout] = useState<LayoutRectangle | null>(null)
    const [index, setIndex] = useState(0)
    const counted = useRef(new Set<number>())
    const opening = useRef(false)
    useFocusEffect(
        useCallback(() => {
            setFocused(true)
            return () => setFocused(false)
        }, []),
    )
    useEffect(() => {
        const listener = AppState.addEventListener('change', (state) =>
            setActive(state === 'active'),
        )
        return () => listener.remove()
    }, [])
    const small = useQuery({
        queryKey: ['partner-banners', account?.account.id, 'small'],
        queryFn: ({ signal }) =>
            partnerBannersApi.getSmall({
                baseUrl: getApiUrl(),
                token: account!.token,
                signal,
            }),
        enabled: !!account && focused,
        staleTime: 60_000,
        retry: 1,
    })
    const big = useQuery({
        queryKey: ['partner-banners', account?.account.id, 'big'],
        queryFn: ({ signal }) =>
            partnerBannersApi.getBig({
                baseUrl: getApiUrl(),
                token: account!.token,
                signal,
            }),
        enabled: !!account && focused && showBig,
        staleTime: 60_000,
        retry: 1,
    })
    useEffect(() => {
        if (__DEV__ && (small.error || big.error)) {
            console.warn(
                'Advertising request failed',
                [small.error, big.error].map((error) =>
                    error instanceof ApiError
                        ? { status: error.status, code: error.code }
                        : error
                          ? 'Network error'
                          : null,
                ),
            )
        }
    }, [small.error, big.error])
    const visibleSmall =
        smallLayout &&
        isBannerVisible(
            top + smallLayout.y,
            smallLayout.height,
            offset,
            viewportHeight,
        )
            ? small.data?.[index]?.id
            : undefined
    const visibleBig =
        bigLayout &&
        isBannerVisible(
            top + bigLayout.y,
            bigLayout.height,
            offset,
            viewportHeight,
        )
            ? big.data?.id
            : undefined
    useEffect(() => {
        counted.current.clear()
    }, [account?.account.id])
    useEffect(() => {
        if (!account || !focused || !active) return
        const ids = [visibleSmall, visibleBig].filter(
            (id): id is number => !!id && !counted.current.has(id),
        )
        if (!ids.length) return
        // Count only ads visible for a second, once per placement visit.
        const timer = setTimeout(() => {
            ids.forEach((id) => counted.current.add(id))
            void withApi((options) =>
                partnerBannersApi.addImpressions(
                    { ids },
                    { ...options, token: account.token },
                ),
            ).catch(() => {
                ids.forEach((id) => counted.current.delete(id))
            })
        }, 1000)
        return () => clearTimeout(timer)
    }, [visibleSmall, visibleBig, focused, active, account?.token])

    async function open(banner: PartnerBanner) {
        if (opening.current || !account) return
        const url = bannerLink(banner.linkUrl)
        if (!url) {
            Alert.alert(t('advertising.linkError'))
            return
        }
        opening.current = true
        try {
            await Linking.openURL(url)
            void withApi((options) =>
                partnerBannersApi.addClick(banner.id, {
                    ...options,
                    token: account.token,
                }),
            ).catch(() => {})
        } catch {
            Alert.alert(t('advertising.linkError'))
        } finally {
            opening.current = false
        }
    }

    return (
        <View
            style={{ gap: 24 }}
            onLayout={(event) => setTop(event.nativeEvent.layout.y)}
        >
            {small.isLoading ? (
                <SkeletonGroup>
                    <Skeleton height={120} radius={25} />
                </SkeletonGroup>
            ) : (
                !!small.data?.length && (
                    <View
                        onLayout={(event) =>
                            setSmallLayout(event.nativeEvent.layout)
                        }
                    >
                        <BannerSlider
                            active={focused && active && !!visibleSmall}
                            banners={small.data}
                            onPress={open}
                            onChange={setIndex}
                        />
                    </View>
                )
            )}
            {children}
            {showBig &&
                (big.isLoading ? (
                    <SkeletonGroup>
                        <Skeleton height={420} radius={28} />
                    </SkeletonGroup>
                ) : (
                    big.data && (
                        <View
                            onLayout={(event) =>
                                setBigLayout(event.nativeEvent.layout)
                            }
                        >
                            <BigBannerCard
                                banner={big.data}
                                onPress={() => {
                                    void open(big.data!)
                                }}
                            />
                        </View>
                    )
                ))}
        </View>
    )
}
