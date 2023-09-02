// stlyed
import styled from "styled-components";

// framer motion
import {motion} from "framer-motion";

// mui
import { IconButton } from "@mui/material";


const StyledRoolsTooltipContainer = styled(motion.div)`
    background-color:black;
    max-width:430px;
    min-width:400px;
    height:158px;
    position:absolute;
    bottom:200px;
    right:200px;
    z-index:2;
    background:url('/memory-game/rules-tooltip/background.png'), #FFBB46;
    border-radius:10px;
    box-shadow:0px 4px 4px rgba(0, 0, 0, 0.25);
    padding:16px 24px;
    display:flex;
    flex-direction:column;
    gap:10px;
    &::after {
        position:absolute;
        top:10px;
        right:-40px;
        content:"";
        border:20px solid transparent;
        border-left-color:#FFBB46;
    }
`

const StyledToolTipHeading = styled.h6`
    font-family:${({ theme }) => theme.palette.fontFamily.primary.russo};
    color: #000;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`



const CloseIconButton =  styled(IconButton)`
    position:absolute !important;
    top:14px;
    right:14px;
`

const ChipsContainer = styled.div`
    display:flex;
    position:absolute;
    gap:16px;
    bottom:10px;

`

const StyledActionCtaContainer = styled.div`
    display:flex;
    position:absolute;
    gap:4px;
    bottom:10px;
    right:10px;
`


const StyledWelcomingGirlImage = styled(motion.img)`
    position:absolute;
    bottom:0px;
    right:20px;
`

export {StyledRoolsTooltipContainer,StyledToolTipHeading, CloseIconButton,ChipsContainer,StyledActionCtaContainer,StyledWelcomingGirlImage};