export interface Alternative {
    confidence: number,
    transcript: string
}

export interface TranscriptionEvent {
    alternatives: Alternative[],
    is_final: boolean,
    result_end_time: {
        nanos: number,
        seconds: number
    }
}

export enum MsgType {
    data = "data",
    error = "error"
}

export interface WsMessage {
    msg_type: MsgType,
    msg: string
}