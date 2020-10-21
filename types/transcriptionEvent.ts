export interface GoogleTime {
    nanos: number,
    seconds: number
}

export interface Word {
    starttime: GoogleTime,
    endtime: GoogleTime,
    word: string,
    speakertag: number
}

export interface Alternative {
    confidence: number,
    transcript: string
    words: Word[]
}

export interface TranscriptionEvent {
    alternatives: Alternative[],
    isfinal: boolean,
    resultendtime: GoogleTime
}