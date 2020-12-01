import React, {Component} from "react";
import {scrollbar} from "@components/global/scrollbar";
import Head from "next/head";
import {NavBar} from "@components/navBar";

const MyApp = ({Component, pageProps}) => {
    return (
        <>
            <Head>
                <title>{Component.title}</title>
                <meta property="og:title" content={Component.title} key="title"/>
            </Head>
            <NavBar />
            <Component {...pageProps} />
            <style jsx global>{`
                        ${scrollbar}
                        body {
                            margin: 0;
                            font-family: Roboto;
                            background: #636c78;
                            color: rgb(230, 232, 234);                        
                        }
                    `}
            </style>
        </>
    );
};

export default MyApp;