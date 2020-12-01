import React from 'react';
import {TranscriptionEvent} from "../types/transcriptionEvent";
import Styled from "styled-components";

const Table = Styled.table`
    width: 100%;
`;

export const TranscriptionText = ({transcriptions}:
                                      { transcriptions: TranscriptionEvent[] }) => (
    <Table>
        <tbody>
        <tr>
            <th>Best transcription</th>
            <th>Confidence</th>
            <th>End time</th>
        </tr>
        {transcriptions
            .map(t =>
                <tr key={t.alternatives[0].transcript}>
                    <td>{t.alternatives[0].transcript}</td>
                    <td>{t.alternatives[0].confidence}</td>
                </tr>)}
        </tbody>
    </Table>
);