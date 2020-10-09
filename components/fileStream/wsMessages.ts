export enum MsgType {
    data = "data",
    error = "error"
}

export interface WsMessage {
    msg_type: MsgType,
    msg: string
}