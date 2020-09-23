import React from 'react';
import Head from "next/head";
import {Manager} from "@components/fileStream";
import {Api} from "../services/api";

const Index = ({authorization}: {authorization: string}) => (
    <>
        <Head>
            <title>Upload file</title>
        </Head>
        <Manager auth={authorization}/>
    </>
);

Index.getInitialProps = async ctx => {
    try {
        const api = new Api();
        await api.getInitialToken(ctx);
        api.removeCtx();
        return api;
    } catch (e) {
        return {};
    }
};

export default Index;