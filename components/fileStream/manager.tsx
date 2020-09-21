import React, {ChangeEvent, Component} from "react";
import {TranscriptionEvent} from "@components/fileStream/transcriptionEvent";

const wsHandler = (rawFile: Uint8Array, cb: (transcription: TranscriptionEvent) => void) => {
    const {length} = rawFile;
    const ws = new WebSocket(`ws://localhost:8080/upload?size=${length}`); // TODO: Create .env
    ws.onerror = (e: MessageEvent) => console.error(e);
    ws.onclose = (e) => console.log(e);
    ws.onmessage = (e: MessageEvent) => {
        const deserialized: TranscriptionEvent = JSON.parse(e.data);
        cb(deserialized);
    };

    ws.onopen = () => {
        for (let i = 0; i < length; i += 32000) {
            const until = (i + 32000 < length) ? i + 32000 : length;
            const slice = rawFile.slice(i, until);
            ws.send(slice);
        }
    };
};

interface ManagerState {
    file: File,
    transcriptions: TranscriptionEvent[]
}

export class Manager extends Component<{}, ManagerState> {
    public state: ManagerState = {
        file: null,
        transcriptions: []
    };

    uploadFile = () => {
        const reader = new FileReader();
        const self = this;
        reader.onload = function () {
            const arrayBuffer: string | ArrayBuffer = this.result;
            const array = new Uint8Array(arrayBuffer as ArrayBuffer);
            wsHandler(array, (newTranscription: TranscriptionEvent) => {
                console.log(self.state.transcriptions);
                const transcriptions = self.state.transcriptions.concat(newTranscription);
                console.log(transcriptions);
                self.setState({transcriptions});
            });
        };

        reader.readAsArrayBuffer(this.state.file);
    };

    updateFile = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({file: e.target.files[0]});
    };

    render() {
        return (

            <>
                <input type="file"
                       onChange={this.updateFile}
                />
                <button onClick={this.uploadFile}>Translate</button>
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