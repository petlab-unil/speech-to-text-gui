import React, {useState} from "react";
import Styled from "styled-components";
import {TranscriptionText} from "@components/transcriptionText";
import {TranscriptionEvent, Word} from "../../types/transcriptionEvent";
import {Api} from "../../services/api";

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


const DeleteButton = Styled.div`
    color: black;
    border-radius: 50px;
    background-color: white;
    height: 50px;
    width: 50px;
    cursor: pointer;
    line-height: 50px;
    text-align: center;
    transition: 1s;
    & :hover {
        background-color: black;
        color: white;
        border: 1px solid white;
    }
    margin: 5px;
`;

const extractSentences = (transcriptionEvents: TranscriptionEvent[]): string => {
    const wordsExist = transcriptionEvents?.[0]?.alternatives?.[0]?.words?.length;
    if (!wordsExist) return "";
    let currentSpeaker = transcriptionEvents[0].alternatives[0].words[0]?.speakertag;
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
    });

    transcriptionEvents.forEach(({alternatives}) =>
        alternatives.forEach(({words}) => {
            if (currentWords.length < words.length) {
                currentWords = words;
                return;
            }
            currentWords.forEach(({speakertag, word}) => {
                if (speakertag === currentSpeaker) currentSentence += `${word} `;
                else {
                    currentSpeaker = speakertag;
                    currentSentence += `${"\n"}- Speaker ${currentSpeaker}: ${word} `;
                }
            });
            currentWords = [];
        }));

    return currentSentence;
};

interface TranslationProps {
    translationId: string,
    name: string,
    api: Api
}

export const TranslationContainer = ({translationId, name, api}: TranslationProps) => {
    const [toggled, setToggled] = useState<boolean>(false);
    const [transcripts, setTranscripts] = useState<TranscriptionEvent[]>([]);
    const [hrefDlJson, setHrefDlJson] = useState<string>("");
    const [hrefDlTxt, setHrefDlTxt] = useState<string>("");
    const [hrefDlWithSpeaker, setHrefDlWithSpeaker] = useState<string>("");

    const deleteThis = async () => {
        await api.deleteTranslation(translationId);
    }


    const btoa: (s: string) => string =
        process.browser ? window.btoa : (u8str: string) => Buffer.from(u8str).toString("base64");

    const toggle = async () => {
        if (transcripts.length === 0) {
            const translation = await api.oneTranslation(translationId);
            const {transcripts} = translation;
            setTranscripts(transcripts);
            const b64 = btoa(JSON.stringify(transcripts));
            setHrefDlJson(`data:application/octet-stream;charset=utf-8;base64,${b64}`);
            const txt = transcripts.map(t => t.alternatives.map(({transcript}) => transcript).join(" ")).join(" ");
            setHrefDlTxt(`data:application/octet-stream;charset=utf-8;base64,${btoa(txt)}`);
            const withSpeaker = extractSentences(transcripts);
            setHrefDlWithSpeaker(`data:application/octet-stream;charset=utf-8;base64,${btoa(withSpeaker)}`);
        }
        setToggled(!toggled);
    };

    return <TranslationWrapper>
        <FileName onClick={toggle}>{name}</FileName>
        {toggled && <><DownloadButton download={`${name.split(".")[0]}.json`} href={hrefDlJson}>Download
            json</DownloadButton>
            <DownloadButton download={`${name.split(".")[0]}.txt`} href={hrefDlTxt}>Download text</DownloadButton>
            {hrefDlWithSpeaker.length > 0 &&
            <DownloadButton download={`${name.split(".")[0]}.txt`} href={hrefDlWithSpeaker}>Download text with speaker
                tags <b>(BETA)</b></DownloadButton>}
            <TranscriptionText transcriptions={transcripts}/>
        </>}
        <DeleteButton onClick={deleteThis}>X</DeleteButton>
    </TranslationWrapper>;
};