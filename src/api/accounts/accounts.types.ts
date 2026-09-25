export interface AvatarRequestOptions {
    baseUrl: string
    token: string
    signal?: AbortSignal
}

export interface AvatarFile {
    uri: string
    name: string
    type: string
}

export interface AccountAvatar {
    id: number
    avatarId: number | null
}

export interface AvatarVariant {
    id: number
    ownerAccountId: number
    visibility: 'all_accounts'
    smallAssetId: number
    mediumAssetId: number
    largeAssetId: number
}
