export enum MsgType {
    data = "data",
    error = "error"
}

export interface WsMessage {
    msgType: MsgType,
    msg: string
}