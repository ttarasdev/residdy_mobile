import type {
    ActiveAppAnnouncement,
    AnnouncementAction,
} from '../../api/app-announcements/app-announcements.types'

export function announcementDue(
    item: ActiveAppAnnouncement,
    lastShown: number | null,
    now: number,
) {
    if (
        !Number.isFinite(Date.parse(item.endsAt)) ||
        Date.parse(item.endsAt) <= now
    )
        return false
    if (lastShown === null) return true
    if (!Number.isFinite(lastShown) || lastShown > now) return false
    if (item.frequency === 'once_per_day')
        return (
            new Date(lastShown).toDateString() !== new Date(now).toDateString()
        )
    const minutes = item.intervalMinutes ?? 1440
    return (
        Number.isInteger(minutes) &&
        minutes >= 1 &&
        minutes <= 43200 &&
        now - lastShown >= minutes * 60_000
    )
}

export function announcementDestination(
    action?: AnnouncementAction,
): string | null {
    if (!action) return null
    if (action.type === 'external_url') {
        try {
            const url = new URL(action.url)
            return url.protocol === 'https:' && !url.username && !url.password
                ? url.href
                : null
        } catch {
            return null
        }
    }
    if (action.type === 'screen')
        return (
            {
                home: '/home',
                subscription_plans: '/profile/plans',
                consultations: '/consultations',
                blog: '/blog',
                legalization: '/legalization',
                partners: '/partners',
                documents: '/profile/documents',
            }[action.key] ?? null
        )
    if (!Number.isSafeInteger(action.id) || action.id < 1) return null
    switch (action.type) {
        case 'case':
            return `/cases/new?template=${action.id}`
        case 'blog_post':
            return `/blog/${action.id}`
        case 'consultation':
            return `/consultations/service?id=${action.id}`
        case 'partner_company':
            return `/partners/${action.id}`
        default:
            return null
    }
}
