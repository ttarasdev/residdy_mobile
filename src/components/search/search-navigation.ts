import type { SearchItem } from '../../api/search/search.types'
const screens: Record<string, string> = {
    language: '/profile/language',
    plans: '/profile/plans',
    profile_edit: '/profile/edit',
    legal: '/profile/legal',
    security: '/profile/security',
    my_consultations: '/consultations/mine',
    home: '/home',
    legalization: '/legalization',
    blog: '/blog',
    profile: '/profile',
    partners: '/partners',
    documents: '/documents/new',
    user_documents: '/legalization?section=documents',
    user_cases: '/legalization?section=cases',
    consultations: '/consultations',
}
export function searchDestination(item: SearchItem): string | null {
    switch (item.type) {
        case 'screen':
            return screens[item.key] ?? null
        case 'case':
            return `/cases/new?template=${item.id}`
        case 'document_template':
            return `/documents/new?template=${item.id}`
        case 'user_case':
            return `/cases/${item.id}`
        case 'blog_post':
            return `/blog/${item.id}`
        case 'partner_company':
            return `/partners/${item.id}`
        case 'consultation':
            return `/consultations/service?id=${item.id}`
        case 'user_consultation':
            return `/consultations/booking?id=${item.id}`
        case 'user_document':
            return null
    }
}
