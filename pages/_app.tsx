import React, {Component} from "react";
import {scrollbar} from "@components/global/scrollbar";
import Head from "next/head";

const MyApp = ({Component, pageProps}) => {
    return (
        <>
            <Head>
                <title>{Component.title}</title>
                <meta property="og:title" content={Component.title} key="title"/>
            </Head>
            <Component {...pageProps} />
            <style jsx global>{`
              ${scrollbar}
              body {
                margin: 0;
                font-family: Roboto, sans-serif;
                background: #636c78;
                color: rgb(230, 232, 234);
              }
            `}
            </style>
        </>
    );
};

export default MyApp;