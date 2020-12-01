import Styled from "styled-components";

export const DeleteButton = Styled.div`
    color: black;
    border-radius: 50px;
    background-color: #636c78;
    height: 50px;
    width: 50px;
    cursor: pointer;
    line-height: 50px;
    text-align: center;
    transition: 1s;
    
    & :hover {
        background-color: black;
        color: white;
    }
    position: absolute;
    top: 10px;
    right: 10px;
`;