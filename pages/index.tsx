import React from 'react';
import Head from "next/head";
import {Manager} from "@components/fileStream";

const Index = () => (
    <>
        <Head>
            <title>Upload file</title>
        </Head>
        <Manager/>
    </>
);

export default Index;