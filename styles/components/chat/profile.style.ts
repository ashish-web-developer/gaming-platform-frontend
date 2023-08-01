import styled from "styled-components";
import { Box } from "@mui/material";
import Colors from "@/types/data/colors";

interface StyledProfileContainerProps {
    $width:number;
    $height:number;
}

interface StyledAvatarContainerProps  {
    $color:Colors["colors"][number];
    $width:number;
    $height:number;
}

interface StyledProfileAvatarProps {
    $width:number;
    $height:number;
}

const StyledProfileContainer = styled(Box)<StyledProfileContainerProps>`
    height:${(props)=>props.$height*1.2}px;
    width:100%;
`

const StyledAvatarContainer = styled(Box)<StyledAvatarContainerProps>`
    width:${(props)=>props.$width*1.1}px;
    height:${(props)=>props.$height*1.1}px;
    background-color:${(props)=>props.$color["background-color"]};
    background-image:${(props)=>props.$color["background-image"]};
    display:flex;
    justify-content:center;
    align-items:center;
    border-radius:12px;
`




const StyledProfileAvatar  = styled.div<StyledProfileAvatarProps>`
    width:${(props)=>props.$width}px;
    height:${(props)=>props.$height}px;
`

const StyledAvatarName = styled.h3`
    color:#fff;
    font-family: "Poppins", sans-serif;
    font-size:14px;
    font-weight:400;
`


export {
    StyledProfileContainer,
    StyledAvatarContainer,
    StyledProfileAvatar,
    StyledAvatarName
}