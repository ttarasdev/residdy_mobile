import type { PartnerBanner } from '../../api/models'

export function bannerContent(banner: PartnerBanner, language: string) {
    const suffix = language === 'uk' ? 'Ua' : language === 'en' ? 'En' : language === 'ru' ? 'Ru' : 'Pl'
    return {
        title: banner[`title${suffix}`]?.trim() || banner.titlePl,
        subtitle: banner[`subtitle${suffix}`]?.trim() || banner.subtitlePl,
    }
}

export function bannerLink(value: string): string | null {
    try {
        const url = new URL(value)
        return ['https:', 'http:'].includes(url.protocol) && !url.username && !url.password ? url.toString() : null
    } catch { return null }
}

export function isBannerVisible(top: number, height: number, offset: number, viewport: number) {
    if (height <= 0 || viewport <= 0) return false
    const overlap = Math.max(0, Math.min(top + height, offset + viewport) - Math.max(top, offset))
    return overlap >= height / 2
}
