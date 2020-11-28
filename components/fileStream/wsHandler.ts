import {TranscriptionEvent} from "../../types/transcriptionEvent";
import {MsgType, WsMessage} from "@components/fileStream/wsMessages";

export const wsHandler = (kb: number,
                          sampleRateHertz: number,
                          audioType: number,
                          language: string,
                          model: string,
                          auth: string,
                          fileName: string,
                          rawFile: Uint8Array,
                          cbUpdateBar: (size: number) => void,
                          cb: (transcription: TranscriptionEvent) => void,
                          cbErr: (errMsg: string) => void,
                          cbClose: (msg: number) => void) => {
        const {length} = rawFile;
        const rate = kb * 1000;

        let closed = false;

        const ws = new WebSocket(
            `ws://${process.env.NEXT_PUBLIC_API_URL}/upload?size=${length}&Authorization=${auth}&name=${fileName}&language=${language}&packetSize=${rate}&sampleRateHertz=${sampleRateHertz}&audioType=${audioType}&model=${model}`);
        ws.onerror = (e: MessageEvent) => console.error(e);
        ws.onclose = (e) => {
            cbClose(e.code);
            closed = true;
        }
        ws.onmessage = (e: MessageEvent) => {
            const deserializedMsg: WsMessage = JSON.parse(e.data);
            if (deserializedMsg.msgType === MsgType.data) {
                const transcription: TranscriptionEvent = JSON.parse(deserializedMsg.msg);
                cb(transcription);
            } else if (deserializedMsg.msgType === MsgType.error) cbErr(deserializedMsg.msg);
            else throw new Error("Invalid msg type");
        };


        ws.onopen = () => {
            const sendCb = (i: number) => {
                if(i >= length || closed) return;
                const until = (i + rate < length) ? i + rate : length;
                const slice = rawFile.slice(i, until);
                ws.send(slice);
                cbUpdateBar(100 * (i + rate) / length);
                setTimeout(() => sendCb(i + rate), 24);
            }
            sendCb(0);
        };
    }
;