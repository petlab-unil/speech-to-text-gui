import React from 'react';
import Head from "next/head";
import {FileStream} from "@components/fileStream";
import {Api} from "../services/api";
import {IndexGrid} from "@components/global/indexGrid";
import {createEmptyUser, User} from "../types/user";
import {UserInfo} from "@components/userInfo/userInfo";

interface IndexProps {
    authorization: string,
    account: User
}

const Index = ({authorization, account}: IndexProps) => (
    <>
        <Head>
            <title>Upload file</title>
        </Head>
        <IndexGrid>
            <UserInfo user={account} api={new Api(authorization)} />
            <div><FileStream auth={authorization}/></div>
        </IndexGrid>
    </>
);

Index.getInitialProps = async (ctx): Promise<IndexProps> => {
    try {
        const api = new Api();
        await api.getInitialToken(ctx);
        const account: User = await api.me();
        api.removeCtx();
        return {authorization: api.authorization, account};
    } catch (e) {
        return {authorization: "", account: createEmptyUser()};
    }
};

export default Index;