import React from 'react';
import {TranscriptionEvent} from "../types/transcriptionEvent";

export const TranscriptionText = ({transcriptions}:
                                      { transcriptions: TranscriptionEvent[] }) => (
    <table>
        <tbody>
        <tr>
            <th>Best transcription</th>
            <th>Confidence</th>
            <th>End time</th>
        </tr>
        {transcriptions.sort((a, b) =>
            a.resultendtime.seconds * 1e9 + a.resultendtime.nanos -
            b.resultendtime.seconds * 1e9 + b.resultendtime.nanos)
            .map(t =>
                <tr key={t.alternatives[0].transcript}>
                    <td>{t.alternatives[0].transcript}</td>
                    <td>{t.alternatives[0].confidence}</td>
                    <td>{t.resultendtime.seconds} seconds, {t.resultendtime.nanos} nanos</td>
                </tr>)}
        </tbody>
    </table>
);