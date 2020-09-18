import React, {Component} from "react";
import Head from "next/head";
import {MainPadding} from "@components/global/mainPadding";

const App = ({Component, pageProps}) => {
    return (
        <>
            <Head>
                <title>{Component.title}</title>
                <meta property="og:title" content={Component.title} key="title"/>
            </Head>

            <MainPadding>
                <Component {...pageProps} />
            </MainPadding>

            <style jsx global>{`
                        body {
                            margin: 0;
                            font-family: Roboto;
                            background: white;
                            color: rgb(230, 232, 234);                        
                        }
                    `}
            </style>
        </>
    );
};

export default App;