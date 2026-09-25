export type SearchSearchQuery = {
    q?: string
    lan?: 'UA' | 'PL' | 'EN' | 'RU'
    type?:
        | 'screen'
        | 'case'
        | 'user_case'
        | 'document_template'
        | 'user_document'
        | 'blog_post'
        | 'consultation'
        | 'user_consultation'
        | 'partner_company'
    limit?: number
    offset?: number
}

export type SearchSearchResponse = {
    query: string
    lan: string
    mode: 'suggestions' | 'results'
    groups: Array<{
        type:
            | 'screen'
            | 'case'
            | 'user_case'
            | 'document_template'
            | 'user_document'
            | 'blog_post'
            | 'consultation'
            | 'user_consultation'
            | 'partner_company'
        items: Array<
            | {
                  type: 'user_consultation'
                  id: number
                  title: string
                  status: string
                  avatarId: number | null
                  startsAt: string
                  durationMinutes: number
              }
            | {
                  type: 'user_case'
                  id: number
                  title: string
                  status: string
                  activeStageNo: number
                  iconUrl?: string | null
              }
            | {
                  type: 'case'
                  id: number
                  title: string
                  subtitle: string
                  iconUrl: null | string
              }
            | {
                  type: 'document_template'
                  id: number
                  title: string
                  iconUrl: null | string
              }
            | {
                  type: 'user_document'
                  id: number
                  title: string
                  createdAt: string
                  available: boolean
                  iconUrl?: string | null
              }
            | {
                  type: 'blog_post'
                  id: number
                  title: string
                  publishedAt: null | string
                  thumbnail: null | {
                      assetId: number
                      urlEndpoint: string
                  }
              }
            | {
                  type: 'consultation'
                  id: number
                  title: string
                  durationMinutes: number
                  price: string
                  specialist: null | {
                      id: number
                      name: string
                  }
              }
            | {
                  type: 'partner_company'
                  id: number
                  title: string
                  description: null | string
                  thumbnail: null | {
                      assetId: number
                      urlEndpoint: string
                  }
              }
            | {
                  type: 'screen'
                  key: string
                  title: string
              }
        >
        hasMore: boolean
        nextOffset: null | number
    }>
}

export type SearchGroup = SearchSearchResponse['groups'][number]
export type SearchItem = SearchGroup['items'][number]
export type SearchType = SearchGroup['type']
