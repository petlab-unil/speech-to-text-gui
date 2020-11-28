import React from 'react';
import Head from "next/head";
import {FileStream} from "@components/fileStream";
import {Api} from "../services/api";
import {IndexGrid} from "@components/global/indexGrid";
import {createEmptyUser, User} from "../types/user";
import {UserInfo} from "@components/userInfo/userInfo";

interface IndexProps {
    authorization: string,
    account: User,
    allAccounts: User[]
}

const Index = ({authorization, account, allAccounts}: IndexProps) => (
    <>
        <Head>
            <title>Upload file</title>
        </Head>
        <IndexGrid>
            <UserInfo user={account} api={new Api(authorization)} allAccounts={allAccounts}/>
            <div><FileStream auth={authorization}/></div>
        </IndexGrid>
    </>
);

Index.getInitialProps = async (ctx): Promise<IndexProps> => {
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

export default Index;