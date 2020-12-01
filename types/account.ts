export interface SessionSchema {
    _id: string,
    created_at: string
}

export interface AccountSchema {
    name: string,
    password: string
}

export interface LoginState {
    isHidden: boolean,
    imgSrc: string,
    login: AccountSchema,
    loadingDisplay: string,
    err: string
}