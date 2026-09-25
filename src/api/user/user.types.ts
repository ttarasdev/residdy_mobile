import type * as Models from '../models'

export type UserRegisterBody = {
    parentId?: number
    legalVersionIds: Array<number>
    email: string
    password: string
    name?: string
    surname?: string
    phone?: string
    location?: string
    lan?: 'UA' | 'PL' | 'EN' | 'RU'
}

export type UserRegisterResponse = Models.User

export type UserGetMeResponse = Models.User

export type UserUpdateMeBody = {
    name?: string
    surname?: string
    phone?: string
    location?: string
    lan?: 'UA' | 'PL' | 'EN' | 'RU'
}

export type UserUpdateMeResponse = Models.User

export type UserRemoveMeResponse = void

export type UserUploadMyAvatarResponse = Models.Account
