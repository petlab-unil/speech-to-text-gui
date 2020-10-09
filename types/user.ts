export interface Translation {}

export interface User {
    _id: string,
    name: string,
    translations: Translation[]
}

export const createEmptyUser = (): User => {
    return {
        _id: "",
        name: "",
        translations: []
    }
}