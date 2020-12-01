import React, {useState} from "react";
import {createEmptyUser, User} from "../types/user";
import {UserContainer} from "@components/userInfo/container";
import {TranslationContainer} from "@components/userInfo/translation";
import {SectionTitle, SubSectionTitle} from "@components/global/sectionTitle";
import {Api} from "../services/api";
import Index from "@pages/index";
import Head from "next/head";

interface Props {
    account: User,
    authorization: string,
    allAccounts: User[]
}

const Transcriptions = ({account, authorization, allAccounts}: Props) => {
    const [userState, setUser] = useState<User>(account);
    return <>
        <Head>
            <title>Speechtool</title>
        </Head>
        <UserContainer>
            <SectionTitle>
                Welcome, {account.name}
                <br/>
                <SubSectionTitle>Your transcriptions</SubSectionTitle>
            </SectionTitle>
            {userState.translations.map(tr =>
                <TranslationContainer
                    key={JSON.stringify(tr)}
                    translationId={tr._id}
                    name={tr.file_name}
                    api={new Api(authorization)}
                    setUser={setUser}
                    allAccounts={allAccounts}
                />)}
        </UserContainer>
    </>;
};

Transcriptions.getInitialProps = async (ctx): Promise<Props> => {
    try {
        const api = new Api();
        await api.getInitialToken(ctx);
        const [account, allUsers] = await Promise.all([api.me(), api.allAccounts()]);
        api.removeCtx();
        const allAccounts = allUsers.filter(user => user.name !== account.name);
        return {authorization: api.authorization, account, allAccounts};
    } catch (e) {
        return {authorization: "", account: createEmptyUser(), allAccounts: []};
    }
};

export default Transcriptions;