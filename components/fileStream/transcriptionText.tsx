import React from 'react';
import {TranscriptionEvent} from "../../types/transcriptionEvent";

export const TranscriptionText = ({transcriptions}:
                                      { transcriptions: TranscriptionEvent[] }) => (
    <table>
        <tbody>
        <tr>
            <th>Best transcription</th>
            <th>Confidence</th>
            <th>End time</th>
        </tr>
        {transcriptions.map(t =>
            <tr key={t.alternatives[0].transcript}>
                <td>{t.alternatives[0].transcript}</td>
                <td>{t.alternatives[0].confidence}</td>
                <td>{t.result_end_time.seconds} seconds, {t.result_end_time.nanos} nanos</td>
            </tr>)}
        </tbody>
    </table>
)