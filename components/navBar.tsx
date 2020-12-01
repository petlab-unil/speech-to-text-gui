import React from "react";
import Styled from "styled-components";
import Link from "next/link";
import Router from 'next/router';

const Bar = Styled.div`
    width: 100%;
    height: 80px;
    text-align: center;
    padding-top: 30px;
    font-family: 'Major Mono Display', monospace;
`;

const Anchor = Styled.a`
    text-decoration: none;
    padding-top: 20px;
    font-size: 25px;
    color: #aeb0b3;
    transition: .5s;
    margin: 0px 30px;

    
    & :hover {
        color: white;
        background-color: black;
    }
    
    @media only screen and (min-width: 850px) {
        margin: 0px 120px;
    }
`;

const LogOutButton = Styled.a`
    float: right;
    font-size: 18px;
    color: #aeb0b3;
    display: inline;
    cursor: pointer;
    margin: 0;
    transition: .5s;
    
    & :hover {
        color: white;
        background-color: black;
    }
    
`;

export const NavBar = () => {
    const logout = async () => {
        document.cookie = "Authorization=";
        await Router.push("/login");
    }

    return <Bar>
        <Link href="/">
            <Anchor href="/">Transcribe</Anchor>
        </Link>
        <Link href="/transcriptions">
            <Anchor href="/transcriptions">Transcriptions</Anchor>
        </Link>
        <LogOutButton onClick={logout}>
            Log out
        </LogOutButton>
    </Bar>;
};