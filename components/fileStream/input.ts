import Styled from "styled-components";

const formOptionStyle = `
    width: calc(60% - 52px);
    padding: 10px;
    border-radius: 5px;
    border: 1px solid transparent;
    margin: auto;
    :focus {
        outline-width: 0;
    }
    display: inline-block;
    background-color: white;
    color: black;
    right: 10px;
    float: right;
`;

const buttonStyle = `
    ${formOptionStyle}
    transition: .5s;
    cursor: pointer;
    
    :hover {
        background-color: grey;
        color: white;
    }    
`;

export const Input = Styled.input`${formOptionStyle}`;
export const Label = Styled.label`${buttonStyle}`;
export const Button = Styled.button`
    ${buttonStyle}
   
    grid-column-start: 1;
    grid-column-end: 3;
    width: 90%;
`;
export const StyledSelect = Styled.select`
    ${formOptionStyle}
    cursor: pointer;
    background-color: white;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: calc(60% - 30px);
`;

export const FormEntry = Styled.span`
    color: white;
    max-width: 40%;
    display: inline-block;
`;

export const FormSection = Styled.section`
    width: 100%;
`;