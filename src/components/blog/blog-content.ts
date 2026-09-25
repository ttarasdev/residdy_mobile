import type { BlogCategory } from '../../api/models'

export function categoryName(category: Partial<BlogCategory>, lan: 'PL' | 'UA' | 'EN' | 'RU') {
    const key = { PL: 'name_pl', UA: 'name_ua', EN: 'name_en', RU: 'name_ru' } as const
    return category[key[lan]]?.trim() || category.name_pl?.trim() || ''
}

export function articleDate(value: string | null | undefined, language: string) {
    if (!value) return ''
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return ''
    return date.toLocaleDateString(language, { day: 'numeric', month: 'long', year: 'numeric' })
}
