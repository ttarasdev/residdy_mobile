import { useEffect, useRef, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import type { PartnerBanner } from '../../api/models'
import PaginationDots from '../shared/pagination/PaginationDots'
import SmallBannerCard from './SmallBannerCard'
import useAccessibilityPreferences from '../../shared/hooks/useAccessibilityPreferences'

export default function BannerSlider({ banners, onPress, onChange, active = true }: {
    active?: boolean
    banners: PartnerBanner[]
    onPress: (banner: PartnerBanner) => void
    onChange: (index: number) => void
}) {
    const { t } = useTranslation()
    const { reduceMotion } = useAccessibilityPreferences()
    const [interacting, setInteracting] = useState(false)
    const scroll = useRef<ScrollView>(null)
    const [width, setWidth] = useState(0)
    const [index, setIndex] = useState(0)
    const ids = banners.map(banner => banner.id).join(',')
    useEffect(() => {
        setIndex(0)
        onChange(0)
        scroll.current?.scrollTo({ x: 0, animated: false })
    }, [ids, onChange])
    useEffect(() => { scroll.current?.scrollTo({ x: index * width, animated: false }) }, [width])
    useEffect(() => {
        if (!active || interacting || width <= 0 || banners.length < 2) return
        const timer = setTimeout(() => {
            const next = (index + 1) % banners.length
            scroll.current?.scrollTo({ x: next * width, animated: !reduceMotion })
            setIndex(next)
            onChange(next)
        }, 5000)
        return () => clearTimeout(timer)
    }, [active, interacting, width, index, ids, onChange, reduceMotion])
    if (!banners.length) return null
    return <View style={styles.container} onLayout={event => setWidth(event.nativeEvent.layout.width)}>
        {width > 0 && <ScrollView ref={scroll} horizontal pagingEnabled directionalLockEnabled
            showsHorizontalScrollIndicator={false} bounces={false}
            onTouchStart={() => setInteracting(true)}
            onTouchEnd={() => setInteracting(false)}
            onTouchCancel={() => setInteracting(false)}
            onScrollBeginDrag={() => setInteracting(true)}
            onScrollEndDrag={() => setInteracting(false)}
            onMomentumScrollEnd={event => {
                const next = Math.max(0, Math.min(banners.length - 1, Math.round(event.nativeEvent.contentOffset.x / width)))
                setIndex(next)
                onChange(next)
            }}>
            {banners.map((banner, page) => <View key={banner.id} style={{ width }}
                accessibilityElementsHidden={page !== index} importantForAccessibility={page === index ? 'auto' : 'no-hide-descendants'}>
                <SmallBannerCard banner={banner} onPress={() => onPress(banner)} />
            </View>)}
        </ScrollView>}
        {banners.length > 1 && <PaginationDots count={banners.length} index={index}
            label={t('advertising.progress', { current: index + 1, total: banners.length })} />}
    </View>
}
const styles = StyleSheet.create({ container: { gap: 6 } })
