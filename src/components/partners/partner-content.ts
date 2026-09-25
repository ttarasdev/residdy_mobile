import type { PartnerCompanyInfo } from '../../api/models'

export function partnerText(info: Partial<PartnerCompanyInfo> | null | undefined, field: 'shortDescription' | 'description', lan: 'PL' | 'UA' | 'EN' | 'RU') {
    const suffix = { PL: 'Pl', UA: 'Ua', EN: 'En', RU: 'Ru' } as const
    return info?.[`${field}${suffix[lan]}`]?.trim() || info?.[`${field}Pl`]?.trim() || ''
}

export function partnerWebUrl(value?: string | null) {
    if (!value?.trim()) return null
    try {
        const url = new URL(/^https?:\/\//i.test(value.trim()) ? value.trim() : `https://${value.trim()}`)
        return ['https:', 'http:'].includes(url.protocol) && url.hostname.includes('.') && !url.username && !url.password ? url.href : null
    } catch { return null }
}
