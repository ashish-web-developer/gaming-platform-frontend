import styled from "styled-components";
import { Box } from "@mui/material";
import Colors from "@/types/data/colors";


interface StyledAvatarContainerProps  {
    $color:Colors["colors"][number]
}

const StyledProfileContainer = styled(Box)`
    height:100px;
    width:100%;
    border:1px solid red;
`

const StyledAvatarContainer = styled(Box)<StyledAvatarContainerProps>`
    width:120px;
    height:120px;
    background-color:${(props)=>props.$color["background-color"]};
    background-image:${(props)=>props.$color["background-image"]};
    display:flex;
    justify-content:center;
    align-items:center;
    border-radius:10px;
`

const StyledProfileAvatar  = styled.div`
    width:100px;
    height:100px;
`


export {
    StyledProfileContainer,
    StyledAvatarContainer,
    StyledProfileAvatar
}