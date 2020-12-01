import React from "react";
import {Api} from "../../services/api";
import {User} from "../../types/user";
import {DeleteButton} from "@components/global/deleteButton";
import Styled from "styled-components";
import Link from "next/link";

const Container = Styled.div`
    width: 500px;
    max-width: 80%;
    margin 20px auto;
    border-radius: 5px;
    padding: 20px;
    position: relative;
    background-color: #838792;
`;

const NameHeader = Styled.a`
    font-weight: bold;
    font-size: 25px;
    cursor: pointer;
    text-decoration: none;
    color: white;
`;

interface TranscriptionProps {
    transcriptionId: string,
    name: string,
    api: Api,
    setUser: (user: User) => void
}

export const TranscriptionTitle = ({transcriptionId, name, api, setUser}: TranscriptionProps) => {
    const deleteThis = async () => {
        try {
            await api.deleteTranslation(transcriptionId);
            const updatedUser = await api.me();
            setUser(updatedUser);
        } catch (e) {
            console.error(e);
        }
    };

    return <Container>
        <Link href={`/transcription?id=${transcriptionId}`}>
            <NameHeader href={`/transcription?id=${transcriptionId}`}>{name}</NameHeader>
        </Link>
        <DeleteButton onClick={deleteThis}>X</DeleteButton>
    </Container>
}
