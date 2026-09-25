export type AccountAuthRequestEmailChangeBody = {
    newEmail: string
    currentPassword: string
}

export type AccountAuthRequestEmailChangeResponse = {
    ok: boolean
}

export type AccountAuthConfirmEmailChangeBody = {
    code: string
    newEmail: string
    currentPassword: string
}

export type AccountAuthConfirmEmailChangeResponse = {
    ok: boolean
}

export type AccountAuthConfirmBody = {
    code: string
    email: string
}

export type AccountAuthConfirmResponse = {
    ok: boolean
}

export type AccountAuthResendBody = {
    email: string
}

export type AccountAuthResendResponse = {
    ok: boolean
}

export type AccountAuthRequestPasswordChangeBody = {
    currentPassword: string
}

export type AccountAuthRequestPasswordChangeResponse = {
    ok: boolean
}

export type AccountAuthChangePasswordBody = {
    code: string
    password: string
    currentPassword: string
}

export type AccountAuthChangePasswordResponse = {
    ok: boolean
}

export type AccountAuthLoginBody = {
    password: string
    email: string
}

export type AccountAuthLoginResponse = {
    token: string
    legal: {
        placement:
            | 'registration'
            | 'subscription_checkout'
            | 'consultation_checkout'
            | 'specialist'
            | 'partner'
        documents: Array<{
            code:
                | 'registration_terms'
                | 'privacy_policy'
                | 'subscription_terms'
                | 'consultation_terms'
                | 'specialist_terms'
                | 'partner_terms'
            title: string
            versionId: number
            version: number
            publishedAt?: string
            isPlaceholder: boolean
            sha256: string
            url: string
        }>
        acceptanceRequired: boolean
    }
}

export type AccountAuthForgotPasswordBody = {
    email: string
}

export type AccountAuthForgotPasswordResponse = {
    ok: boolean
}

export type AccountAuthResetPasswordBody = {
    code: string
    password: string
    email: string
}

export type AccountAuthResetPasswordResponse = {
    ok: boolean
}
