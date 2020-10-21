import React, {useState} from "react";
import {Translation} from "../../types/user";
import Styled from "styled-components";
import {TranscriptionText} from "@components/transcriptionText";
import {GoogleTime, TranscriptionEvent, Word} from "../../types/transcriptionEvent";

const TranslationWrapper = Styled.div`
    width: calc(100% - 2px);
    margin: 20px 0;
    border: 1px solid white;
    min-height: 100px;
`;

const FileName = Styled.div`
    cursor: pointer;
    font-size: 25px;
    display: block;
    margin-bottom: 20px;
`;

const DownloadButton = Styled.a`
    color: black;
    background-color: white;
    margin: 10px;
    padding: 5px;
    border-radius: 5px;
    text-decoration: none;
    display: block;
    margin-bottom: 20px;
`;


const extractSentences = (transcriptionEvents: TranscriptionEvent[]): string => {
    const wordsExist = transcriptionEvents[0] &&
        transcriptionEvents[0].alternatives[0] && transcriptionEvents[0].alternatives[0].words.length;
    if (!wordsExist) return "";
    let currentSpeaker = transcriptionEvents[0].alternatives[0].words[0].speakertag;
    let currentSentence = `- Speaker ${currentSpeaker}: `;

    let currentWords: Word[] = [];

    // Insert empty so we don't skip last transcript
    transcriptionEvents.push({
        alternatives: [{
            confidence: 0,
            transcript: "",
            words: []
        }],
        isfinal: false,
        resultendtime: {
            nanos: 0,
            seconds: 0
        }
    })

    transcriptionEvents.forEach(({alternatives}) =>
        alternatives.forEach(({words}) => {
            if (currentWords.length > words.length) {
                currentWords = words;
                return;
            }
            currentWords.forEach(({speakertag, word}) => {
                if (speakertag === currentSpeaker) currentSentence += `${word} `;
                else {
                    currentSpeaker = speakertag;
                    currentSentence += `${"\n"}- Speaker ${currentSpeaker}: ${word} `
                }
            })
            currentWords = words;
        }));

    return currentSentence;
}

export const TranslationContainer = ({file_name, transcripts}: Translation) => {
    const [toggled, setToggled] = useState<boolean>(false);

    const btoa: (s: string) => string =
        process.browser ? window.btoa : (u8str: string) => Buffer.from(u8str).toString("base64");

    const b64 = btoa(JSON.stringify(transcripts));
    const hrefDlJson = `data:application/octet-stream;charset=utf-8;base64,${b64}`;

    const txt = transcripts.map(t => t.alternatives.map(({transcript}) => transcript).join(" ")).join(" ");
    const hrefDlTxt = `data:application/octet-stream;charset=utf-8;base64,${btoa(txt)}`;

    const withSpeaker = extractSentences(transcripts);
    const hrefDlWithSpeaker = `data:application/octet-stream;charset=utf-8;base64,${btoa(withSpeaker)}`;

    return <TranslationWrapper>
        <FileName onClick={() => setToggled(!toggled)}>{file_name}</FileName>
        <DownloadButton download={`${file_name}.json`} href={hrefDlJson}>Download json</DownloadButton>
        <DownloadButton download={`${file_name}.txt`} href={hrefDlTxt}>Download text</DownloadButton>
        {withSpeaker.length > 0 &&
        <DownloadButton download={`${file_name}.txt`} href={hrefDlWithSpeaker}>Download text with speaker
            tags <b>(BETA)</b></DownloadButton>}
        {toggled && <TranscriptionText transcriptions={transcripts}/>}
    </TranslationWrapper>;
};