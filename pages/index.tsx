import React from 'react';
import Head from "next/head";
import {FileStream} from "@components/fileStream";
import {Api} from "../services/api";
import {IndexGrid} from "@components/global/indexGrid";

interface IndexProps {
    authorization: string,
}

const Index = ({authorization}: IndexProps) => (
    <>
        <Head>
            <title>Upload file</title>
        </Head>
        <IndexGrid>
            <FileStream auth={authorization}/>
        </IndexGrid>
    </>
);

Index.getInitialProps = async (ctx): Promise<IndexProps> => {
    try {
        const api = new Api();
        await api.getInitialToken(ctx);
        api.removeCtx();
        return {authorization: api.authorization};
    } catch (e) {
        return {authorization: ""};
    }
};

export default Index;