import React, {useState} from "react";
import {Translation} from "../../types/user";
import Styled from "styled-components";
import {TranscriptionText} from "@components/transcriptionText";

const TranslationWrapper = Styled.div`
    width: calc(100% - 2px);
    margin: 20px 0;
    border: 1px solid white;
    height: 100%;
`;

const FileName = Styled.div`
    cursor: pointer;
    font-size: 25px;
`;

const DownloadButton = Styled.a`
    color: black;
    background-color: white;
    margin: 10px;
    padding: 5px;
    border-radius: 5px;
    text-decoration: none;
`;


export const TranslationContainer = ({file_name, transcripts}: Translation) => {
    const [toggled, setToggled] = useState<boolean>(false);

    const btoa: (s: string) => string =
        process.browser ? window.btoa : (u8str: string) => Buffer.from(u8str).toString("base64");

    const b64 = btoa(JSON.stringify(transcripts));

    const hrefDlJson = `data:application/octet-stream;charset=utf-8;base64,${b64}`;

    const txt = transcripts.map(t => t.alternatives.map(({transcript}) => transcript).join(" ")).join(" ");

    const hrefDlTxt = `data:application/octet-stream;charset=utf-8;base64,${btoa(txt)}`;

    return <TranslationWrapper>
        <FileName onClick={() => setToggled(!toggled)}>{file_name}</FileName>
        <DownloadButton download={`${file_name}.json`} href={hrefDlJson}>Download json</DownloadButton>
        <DownloadButton download={`${file_name}.txt`} href={hrefDlTxt}>Download text</DownloadButton>
        {toggled && <TranscriptionText transcriptions={transcripts}/>}
    </TranslationWrapper>;
};