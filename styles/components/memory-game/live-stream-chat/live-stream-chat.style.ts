
import styled from "styled-components";


type IStyledAvatar = {
    $size:string;
    $border:string;
}

const StyledContainer = styled.div`
    width:400px;
    height:534px;
    background:${({theme})=>theme.palette.live_stream_chat.background};
    border-radius:25px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    border:2px solid ${({theme})=>theme.palette.live_stream_chat.border};
    position:relative;
    z-index:3;
`
const StyledHeader = styled.div`
    width:100%;
    height:70px;
    border-bottom:2px solid ${({theme})=>theme.palette.live_stream_chat.border};
    padding:24px;
    display:flex;
    justify-content:space-between;
    align-items:center;
`
const StyledMainText = styled.h4`
    font-family: ${({theme})=> theme.palette.fontFamily.poppins};
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    color:${({theme})=>theme.palette.live_stream_chat.border};
`

const StyledAvatarGroup = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`

const StyledAvatar = styled.div<IStyledAvatar>`
    width:${(props)=>props.$size};
    height:${(props)=>props.$size};
    border:${(props)=>props.$border};
    border-radius:50%;
    &:not(:first-child){
        margin-left:-10px;
    }
`
const StyledChatMainContainer = styled.div`
    width:100%;
    height:calc(100% - 70px);
    padding:24px;
    display:flex;
    flex-direction:column;
    gap:24px;
`
const StyledMessageContainer = styled.div`
    width:100%;
    height:calc(100% - 74px);
    display:flex;
    flex-direction:column;
    gap:24px;
    overflow:scroll;
`

const StyledInputContainer = styled.div`
    width:100%;
    height:50px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    gap:20px;
`

const StyledInput = styled.input`
    width:calc(100% - 60px);
    height:100%;
    border:2px solid ${({theme})=>theme.palette.live_stream_chat.border};
    background:transparent;
    border-radius:8px;
    color: #FFF;
    font-family: ${({theme})=>theme.palette.fontFamily.poppins};
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding:0px 18px;
    &::placeholder{
        color:#fff;
    }
`
const StyledSentCta = styled.button`
    width:40px;
    height:40px;
    background:transparent;
    border:none;
    cursor:pointer;
`
const StyledMessage = styled.div`
    width:100%;
    height:auto;
    border:2px solid ${({theme})=>theme.palette.live_stream_chat.border};
    border-radius:16px;
`
const StyledMessageHeader = styled.div`
    width:100%;
    height:50px;
    border-bottom:2px solid ${({theme})=>theme.palette.live_stream_chat.border};
    padding:14px;
    display:flex;
    align-items:center;
    gap:8px;
`

const StyledUserName = styled.span`
    color: #FFF;
    font-family: ${({theme})=>theme.palette.fontFamily.poppins};
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-transform: capitalize;
`
const StyledMessageText = styled.p`
    color: #D5CECE;
    font-family: Poppins;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    padding:16px;
`


export {
    StyledContainer,
    StyledHeader,
    StyledMainText,
    StyledAvatarGroup,
    StyledAvatar,
    StyledChatMainContainer,
    StyledMessageContainer,
    StyledInputContainer,
    StyledInput,
    StyledSentCta,
    StyledMessage,
    StyledMessageHeader,
    StyledUserName,
    StyledMessageText
}