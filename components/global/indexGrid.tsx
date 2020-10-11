import Styled from "styled-components";

export const IndexGrid = Styled.div`
    width: 100%;
    display: grid;
    
    grid-template-columns: 100%;  /* Mobile first */
    grid-template-rows: auto auto;
    
    @media only screen and (min-width: 1000px) {
        grid-template-columns: 50% 50%; 
        grid-template-rows: 100%;
    }
`;