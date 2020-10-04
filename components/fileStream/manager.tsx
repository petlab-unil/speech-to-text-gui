import React, {ChangeEvent, Component} from "react";
import {MsgType, TranscriptionEvent, WsMessage} from "@components/fileStream/transcriptionEvent";

const wsHandler = (kb: number,
                   sampleRateHertz: number,
                   auth: string,
                   fileName: string,
                   rawFile: Uint8Array,
                   cb: (transcription: TranscriptionEvent) => void,
                   cbErr: (errMsg: string) => void) => {
        const {length} = rawFile;
        const rate = kb * 1000;

        const ws = new WebSocket(
            `ws://localhost:8080/upload?size=${length}&Authorization=${auth}&name=${fileName}&packetSize=${rate}&sampleRateHertz=${sampleRateHertz}`); // TODO: Create .env
        ws.onerror = (e: MessageEvent) => console.error(e);
        ws.onclose = (e) => console.log(e);
        ws.onmessage = (e: MessageEvent) => {
            const deserializedMsg: WsMessage = JSON.parse(e.data);
            if (deserializedMsg.msg_type === MsgType.data) {
                const transcription: TranscriptionEvent = JSON.parse(deserializedMsg.msg);
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

interface ManagerProps {
    auth: string
}

interface ManagerState {
    file: File,
    transcriptions: TranscriptionEvent[],
    errors: string[],
    kb: number,
    sampleRateHertz: number,
}

export class Manager extends Component<ManagerProps, ManagerState> {
    private auth: string;

    public state: ManagerState = {
        file: null,
        transcriptions: [],
        errors: [],
        kb: 32,
        sampleRateHertz: 16000
    };

    constructor(props) {
        super(props);

        this.auth = props.auth;
    }

    uploadFile = () => {
        const reader = new FileReader();
        const {name} = this.state.file;
        const self = this;
        reader.onload = function () {
            const arrayBuffer: string | ArrayBuffer = this.result;
            const array = new Uint8Array(arrayBuffer as ArrayBuffer);
            const onData = (newTranscription: TranscriptionEvent) => {
                const transcriptions = self.state.transcriptions.concat(newTranscription);
                self.setState({transcriptions});
            };

            const onError = (error: string) => {
                const errors = self.state.errors.concat(error);
                self.setState({errors});
            };

            wsHandler(self.state.kb, self.state.sampleRateHertz, self.auth, name, array, onData, onError);
        };

        reader.readAsArrayBuffer(this.state.file);
    };

    updateFile = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({file: e.target.files[0]});
    };

    updateKb = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({kb: parseInt(e.target.value)});
    };

    updateHertz = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({sampleRateHertz: parseInt(e.target.value)});
    };

    render() {
        return (
            <>
                <input type="file"
                       onChange={this.updateFile}
                />
                <input type="number"
                       onChange={this.updateKb}
                       placeholder="Number of kb per packet"
                       value={this.state.kb}
                />
                <input type="number"
                       onChange={this.updateHertz}
                       placeholder="Number of hertz in audio code"
                       value={this.state.sampleRateHertz}
                />
                <button onClick={this.uploadFile}>Translate</button>
                {
                    (this.state.errors.length > 0) && (
                        <div>Errors:
                            <div>
                                {this.state.errors.map(e => <div>{JSON.stringify(e)}</div>)}
                            </div>
                        </div>
                    )
                }
                <table>
                    <tbody>
                    <tr>
                        <th>Best transcription</th>
                        <th>Confidence</th>
                        <th>End time</th>
                    </tr>
                    {this.state.transcriptions.map(t => <tr key={t.alternatives[0].transcript}>
                        <td>{t.alternatives[0].transcript}</td>
                        <td>{t.alternatives[0].confidence}</td>
                        <td>{t.result_end_time.seconds} seconds, {t.result_end_time.nanos} nanos</td>
                    </tr>)}
                    </tbody>
                </table>
            </>
        );
    }
}