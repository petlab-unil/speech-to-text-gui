import Styled from "styled-components";
import {loading} from "@components/global/loading";

export const Container = Styled.div`
    display: inline-block;
    color: lightblue;
    margin: 20px auto 0 auto;
    width: 400px;
    padding: 40px;
    border-radius: 40px;
    display: block;
    
    font-family: 'Major Mono Display', monospace;
    font-size: 20px; 
    font-style: normal; 
    font-variant: normal; 
    font-weight: 500; 
    line-height: 30px;
    background-color: #838792;
`;

export const Button = Styled.div`
    height: 30px;
    width: 92%;
    background-color: #636c78;
    color: black;
    padding: 5px;
    margin: 2px 2px 2px 10px;
    text-align: center;
    transition: 0.5s;
    border 1px solid grey;
    border-radius: 5px;
    cursor: pointer;
    display: inline-block;
    
    :hover {
        color: white;
        background-color: grey;
        opacity: 0.8;
    }
`;

export const Input = Styled.input`
    display: inline-block;
    height: 30px;
    width: 86%;
    margin: 2px 2px 2px 10px;
    padding: 5px;
    border: 1px solid grey;
    border-radius: 5px;
    display: block;
    opacity: 0.7;
    
    background: lightblue ;
    padding-right:30px;
    
    :focus {
        outline-color: black;
    }
`;

export const ImgEye = Styled.img`
    width: 30px;
    height: 30px;
    position: relative;
    top: -38px;
    right: -350px;
    opacity: 0.7;
    
    :hover {
        cursor: pointer;
        opacity: 0.5;
    }
`;

export const Loading = Styled.div`
    position: absolute;
    margin: 7px 0 0 49%;
    .sk-chase-dot {
        width: 40px;
        height: 40px;
    }
    ${loading}
`;

export const ErrorMessage = Styled.div`
    color: black;
    font-weight: bold;
    background-color: rgba(255, 20, 20, .2);
`