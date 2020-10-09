import {TranscriptionEvent} from "../../types/transcriptionEvent";
import {MsgType, WsMessage} from "@components/fileStream/wsMessages";

export const wsHandler = (kb: number,
                          sampleRateHertz: number,
                          audioType: number,
                          model: string,
                          auth: string,
                          fileName: string,
                          rawFile: Uint8Array,
                          cb: (transcription: TranscriptionEvent) => void,
                          cbErr: (errMsg: string) => void) => {
        const {length} = rawFile;
        const rate = kb * 1000;

        const ws = new WebSocket(
            `ws://localhost:8080/upload?size=${length}&Authorization=${auth}&name=${fileName}&packetSize=${rate}&sampleRateHertz=${sampleRateHertz}&audioType=${audioType}&model=${model}`); // TODO: Create .env
        ws.onerror = (e: MessageEvent) => console.error(e);
        ws.onclose = (e) => console.log(e);
        ws.onmessage = (e: MessageEvent) => {
            const deserializedMsg: WsMessage = JSON.parse(e.data);
            if (deserializedMsg.msg_type === MsgType.data) {
                const transcription: TranscriptionEvent = JSON.parse(deserializedMsg.msg);
                console.log(transcription);
                cb(transcription);
            } else if (deserializedMsg.msg_type === MsgType.error) cbErr(deserializedMsg.msg);
            else throw new Error("Invalid msg type");
        };


        ws.onopen = () => {
            for (let i = 0; i < length; i += rate) {
                const until = (i + rate < length) ? i + rate : length;
                const slice = rawFile.slice(i, until);
                ws.send(slice);
            }
        };
    }
;