import React, {useState} from "react";
import {TranscriptionEvent, Word} from "../types/transcriptionEvent";
import {TranscriptionText} from "@components/transcriptionText";
import {Select} from "@components/fileStream/select";
import Styled from "styled-components";
import {Api} from "../services/api";
import {Transcription, User} from "../types/user";
import Router from "next/router";
import Head from "next/head";
import {NavBar} from "@components/navBar";
import {Surrounding} from "@components/fileStream/input";
import {SectionTitle, SubSectionTitle} from "@components/global/sectionTitle";

const TranscriptionWrapper = Styled.div`
    width: 500px;
    padding: 40px;
    border-radius: 40px;
    background-color: #838792;
    display: grid;
    grid-template-rows: 1fr auto auto;
    grid-template-columns: 1fr 1fr 1fr;
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
    transition: 1s;
    
    & :hover {
        background-color: black;
        color: white;
    }
`;

const ShareWithWrapper = Styled.div`
    width: 100%;
    text-align: center;
    grid-column-start: 1;
    grid-column-end: 4;
    display: inline-block;
    margin-bottom: 20px;
`;

const DeleteButton = Styled.div`
    width: calc(50% - 10px);
    height: 20px;
    line-height: 20px;
    grid-column-start: 1;
    grid-column-end: 4;
    text-align: center;
    padding: 10px;
    background-color: red;
    border-radius: 10px;
    cursor: pointer;
    transition: 1s;
    margin: auto;
    
    & :hover {
        background-color: black;
    }
`;

const ShareButton = Styled.button`
    display: inline;
    background-color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid transparent;
    float: right;
    
    cursor: pointer;
    transition: 1s;
    
    & :hover {
        background-color: black;
        color: white;
    }
`;

const ShareWithText = Styled.span`
    float: left;
    font-size: 20px;
    height: 100%;
    line-height: 100%;
    position: relative;
    top: .4em;
`;

const extractSentences = (transcriptionEvents: TranscriptionEvent[]): string => {
    const wordsExist = transcriptionEvents?.[0]?.alternatives?.[0]?.words?.length;
    if (!wordsExist) return "";
    let currentSpeaker = transcriptionEvents[0].alternatives[0].words[0]?.speakertag;
    const firstTimeStamp = transcriptionEvents[0].alternatives[0].words[0]?.starttime;
    const firstTimeStampStr = `${Math.floor(firstTimeStamp.seconds / 60)}:${firstTimeStamp.seconds % 60}`;
    let currentSentence = `- ${firstTimeStampStr}, Speaker ${currentSpeaker}: `;

    // Insert empty so we don't skip last transcript
    transcriptionEvents.push({
        alternatives: [{
            confidence: 0,
            transcript: "",
            words: []
        }],
    });

    transcriptionEvents.forEach(({alternatives}) =>
        alternatives.forEach(({words}) => {
            words.forEach(({speakertag, word, starttime}) => {
                if (speakertag === currentSpeaker) currentSentence += `${word} `;
                else {
                    currentSpeaker = speakertag;
                    const timestampStr = `${Math.floor(starttime.seconds / 60)}:${starttime.seconds % 60}`;

                    currentSentence += `\n- ${timestampStr}, Speaker ${currentSpeaker}: ${word} `;
                }
            });
        }));

    return currentSentence;
};


interface TranslationProps {
    transcriptionId: string,
    name: string,
    authorization: string,
    allAccounts: User[],
    transcription: Transcription
}

const TranslationContainer = ({transcriptionId, name, authorization, allAccounts, transcription}: TranslationProps) => {
    const api = new Api(authorization);
    const options = allAccounts.map(account => ({value: account._id, text: account.name}));
    const [accountToShare, setToShare] = useState<string>(options?.[0].value);

    const deleteThis = async () => {
        try {
            await api.deleteTranslation(transcription._id);
            await Router.push("/transcriptions");
        } catch (e) {
            console.error(e);
        }
    };

    const btoa: (s: string) => string =
        process.browser ? window.btoa : (u8str: string) => Buffer.from(u8str).toString("base64");

    const {transcripts} = transcription;
    const b64 = btoa(unescape(encodeURIComponent(JSON.stringify(transcripts))));
    const hrefDlJson = `data:application/octet-stream;charset=utf-8;base64,${b64}`;
    const txt = transcripts.map(t => t.alternatives.map(({transcript}) => transcript).join(" ")).join(" ");
    const hrefDlTxt = `data:application/octet-stream;charset=utf-8;base64,${btoa(unescape(encodeURIComponent(txt)))}`;
    const withSpeaker = extractSentences(transcripts);
    const hrefDlWithSpeaker = `data:application/octet-stream;charset=utf-8;base64,${btoa(unescape(encodeURIComponent(withSpeaker)))}`;

    const updateToShare = (e) => {
        setToShare(e.target.value);
    };

    const share = async () => {
        await api.share(transcriptionId, accountToShare);
    };


    return <>
        <Head>
            <title>{transcription.file_name}</title>
        </Head>
        <NavBar/>
        <SectionTitle>
            {transcription.file_name}
            <SubSectionTitle>View & Manage Your Transcription</SubSectionTitle>
        </SectionTitle>
        <Surrounding>
            <TranscriptionWrapper>
                <DownloadButton download={`${transcription.file_name.split(".")[0]}.json`} href={hrefDlJson}>Download
                    json</DownloadButton>
                <DownloadButton download={`${transcription.file_name.split(".")[0]}.txt`} href={hrefDlTxt}>Download text</DownloadButton>
                {hrefDlWithSpeaker.length > 0 &&
                <DownloadButton download={`${transcription.file_name.split(".")[0]}.txt`} href={hrefDlWithSpeaker}>Download text with
                    speaker
                    tags <b>(BETA)</b></DownloadButton>}
                <ShareWithWrapper>
                    <ShareWithText>
                        Share with:
                    </ShareWithText>
                    <Select
                        options={options}
                        value={accountToShare}
                        onChange={updateToShare}
                        right={false}
                    />
                    <ShareButton onClick={share}>Share</ShareButton>
                </ShareWithWrapper>
                <DeleteButton onClick={deleteThis}>Delete</DeleteButton>
            </TranscriptionWrapper>
        </Surrounding>
        <TranscriptionText transcriptions={transcripts}/>
    </>;
};

TranslationContainer.getInitialProps = async (ctx): Promise<TranslationProps> => {
    try {
        const transcriptionId = ctx.query.id;
        const api = new Api();
        await api.getInitialToken(ctx);
        const [user, transcription, allAccounts] = await Promise.all([api.me(), api.oneTranslation(transcriptionId), api.allAccounts()]);

        api.removeCtx();
        return {
            authorization: api.authorization,
            name: user.name,
            allAccounts,
            transcriptionId,
            transcription
        };
    } catch (e) {
        return {
            authorization: "",
            name: "",
            allAccounts: [],
            transcriptionId: "",
            transcription: null
        };
    }

};

export default TranslationContainer;