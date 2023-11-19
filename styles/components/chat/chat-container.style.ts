import styled, {createGlobalStyle} from "styled-components";


const GlobalStyles = createGlobalStyle`
    body {
        background:${({theme})=>theme.palette.primary.main};
        background-repeat:no-repeat;
        background-size:cover;
        display:flex;
        justify-content:center;
    }
`

const StyledChatContainer = styled.div`
    width:70rem;
    height:auto;
`


export default GlobalStyles;

export {
    StyledChatContainer
}