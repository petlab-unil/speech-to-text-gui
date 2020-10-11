export interface Alternative {
    confidence: number,
    transcript: string
}

export interface TranscriptionEvent {
    alternatives: Alternative[],
    isfinal: boolean,
    resultendtime: {
        nanos: number,
        seconds: number
    }
}