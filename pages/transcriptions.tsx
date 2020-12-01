import React, {useState} from "react";
import {createEmptyUser, User} from "../types/user";
import {UserContainer} from "@components/userInfo/container";
import {TranscriptionTitle} from "@components/userInfo/transcriptionTitle";
import {SectionTitle, SubSectionTitle} from "@components/global/sectionTitle";
import {Api} from "../services/api";
import Head from "next/head";
import {NavBar} from "@components/navBar";

interface Props {
    account: User,
    authorization: string,
}

const Transcriptions = ({account, authorization}: Props) => {
    const [userState, setUser] = useState<User>(account);
    return <>
        <Head>
            <title>Speechtool</title>
        </Head>
        <NavBar/>
        <UserContainer>
            <SectionTitle>
                Welcome, {account.name}
                <br/>
                <SubSectionTitle>Your transcriptions</SubSectionTitle>
            </SectionTitle>
            {userState.translations.map(tr =>
                <TranscriptionTitle
                    key={JSON.stringify(tr)}
                    transcriptionId={tr._id}
                    name={tr.file_name}
                    api={new Api(authorization)}
                    setUser={setUser}
                />)}
        </UserContainer>
    </>;
};

Transcriptions.getInitialProps = async (ctx): Promise<Props> => {
    try {
        const api = new Api();
        await api.getInitialToken(ctx);
        const account = await api.me();
        api.removeCtx();
        return {authorization: api.authorization, account};
    } catch (e) {
        return {authorization: "", account: createEmptyUser()};
    }
};

export default Transcriptions;