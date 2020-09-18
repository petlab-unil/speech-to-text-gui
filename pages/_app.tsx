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
                            color: rgb(20, 20, 20);
                            
                            font-size: 16px; 
                            font-style: normal; 
                            font-variant: normal; 
                            font-weight: 400; 
                            line-height: 35px;                        
                        }
                    `}
            </style>
        </>
    );
};

export default App;