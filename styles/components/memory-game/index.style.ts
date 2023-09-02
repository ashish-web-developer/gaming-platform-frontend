import {styled} from "styled-components";

const StyledMemoryGameContainer = styled.div`
    background-color:${({theme})=>theme.palette.primary.main};
    background: url('/memory-game/background.png'),  #3F88C5;
    width:100%;
    height:100vh;
    max-height:900px;
    display:flex;
    justify-content:center;
    align-items:center;
`

const StyledMainText = styled.h1`
    position:absolute;
    top:70px;
    left:100px;
    color: #140F2D;
    font-family: ${({theme})=>theme.palette.fontFamily.primary.bangers};
    font-size: 24px;
    font-weight: 800;
    line-height: normal;
    text-transform: uppercase;
`


export {StyledMemoryGameContainer, StyledMainText};