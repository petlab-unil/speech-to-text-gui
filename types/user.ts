import {TranscriptionEvent} from "./transcriptionEvent";

export interface Translation {
    file_name: string,
    transcripts: TranscriptionEvent[]
}

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