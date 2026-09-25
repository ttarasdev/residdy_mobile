export type AnnouncementLanguage = 'UA' | 'PL' | 'EN' | 'RU'

export type AnnouncementAction =
    | { type: 'external_url'; url: string }
    | {
          type: 'screen'
          key:
              | 'home'
              | 'subscription_plans'
              | 'consultations'
              | 'blog'
              | 'legalization'
              | 'partners'
              | 'documents'
      }
    | {
          type: 'case' | 'blog_post' | 'consultation' | 'partner_company'
          id: number
      }

export interface ActiveAppAnnouncement {
    id: number
    lan: AnnouncementLanguage
    imageUrl: string
    endsAt: string
    frequency: 'once_per_day' | 'interval'
    intervalMinutes?: number
    action?: AnnouncementAction
}

export interface ActiveAppAnnouncementResponse {
    announcement: ActiveAppAnnouncement | null
}

export interface AnnouncementRequestOptions {
    baseUrl: string
    token: string
    lan?: AnnouncementLanguage
    signal?: AbortSignal
}
