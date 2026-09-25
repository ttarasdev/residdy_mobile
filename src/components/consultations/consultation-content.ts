export type ApiLanguage = 'PL' | 'UA' | 'EN' | 'RU'
export function localized(
    item: object | null | undefined,
    field: string,
    lan: ApiLanguage,
) {
    const data = (item ?? {}) as Record<string, unknown>
    const suffix = { PL: 'Pl', UA: 'Ua', EN: 'En', RU: 'Ru' }[lan]
    return String(data[field + suffix] || data[field + 'Pl'] || '')
}
export function warsawDay(value = new Date()) {
    return new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Europe/Warsaw',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(value)
}
export function addDays(day: string, count: number) {
    const date = new Date(day + 'T12:00:00Z')
    date.setUTCDate(date.getUTCDate() + count)
    return date.toISOString().slice(0, 10)
}
export function weekStart(day = warsawDay()) {
    const weekday = new Date(day + 'T12:00:00Z').getUTCDay()
    return addDays(day, -((weekday + 6) % 7))
}
export function timeLabel(value: string, locale: string) {
    return new Date(value).toLocaleTimeString(locale, {
        timeZone: 'Europe/Warsaw',
        hour: '2-digit',
        minute: '2-digit',
    })
}
export function dateLabel(value: string, locale: string) {
    return new Date(
        value.length === 10 ? value + 'T12:00:00Z' : value,
    ).toLocaleDateString(locale, {
        timeZone: 'Europe/Warsaw',
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    })
}
export function money(value: string | number, locale: string) {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: 'PLN',
    }).format(Number(value))
}
export async function allPages<T>(
    load: (offset: number) => Promise<{ rows: T[]; total: number }>,
) {
    const rows: T[] = []
    while (true) {
        const page = await load(rows.length)
        rows.push(...page.rows)
        if (!page.rows.length || rows.length >= page.total) return rows
    }
}
