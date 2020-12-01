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
export const PlusLabel = Styled.label`
    background-color: white;
    width: 80px;
    height: 80px;
    line-height: 72px;
    border-radius: 80px;
    text-align: center;
    padding: 0;
    margin: auto;
    font-size: 72px;
    font-weight: normal;
    color: #636c78;
    -webkit-box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.75);
    box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.75);
    display: block;
    transition: .5s;
    cursor: pointer;
    font-family: 'Major Mono Display', monospace;
    
    :hover {
        background-color: grey;
        color: white;
    }
`;

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
    float: ${(props: {right: boolean}) => props.right ? "right" : "none"};
`;

export const FormEntry = Styled.span`
    color: white;
    max-width: 40%;
    display: inline-block;
`;

export const FormSection = Styled.section`
    width: 100%;
`;

export const ParamGrid = Styled.div`
    width: calc(100% - 60px);
    padding: 80px 30px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto auto auto;
    grid-row-gap: 2em;
    grid-column-gap: 4em;
    border-radius: 40px;
    background-color: #838792;
    margin: auto;
    
    @media only screen and (min-width: 850px) {
        width: 70%;
    }
`;

export const SmallParamGrid = Styled.div`
    width: 280px;
    height: 160px;
    padding: 40px 30px;
    background-color: #838792;
    border-radius: 40px;
    text-align: center;
`;

export const Surrounding = Styled.div`
   border-radius: 60px;
   border: 3px dashed rgba(0, 0, 0, .2);
   padding: 20px;
   margin: 100px auto;
   display: table;
`;

export const AddFileText = Styled.p`
    margin-top: 30px;
`;