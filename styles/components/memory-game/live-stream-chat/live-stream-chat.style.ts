import Image from "next/image";
import styled from "styled-components";

type IStyledContainer = {
  $show_background?: boolean;
  $show_gray_background?: boolean;
};

type IStyledAvatar = {
  $size: string;
  $border: string;
};

type IStyledSpan = {
  $color: string;
};

type IStyledHeader = {
  $show_border?: boolean;
};

const StyledContainer = styled.div<IStyledContainer>`
  width: 400px;
  height: 534px;
  background: ${({ theme }) => theme.palette.live_stream_chat.background};
  border-radius: 25px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border: 2px solid ${({ theme }) => theme.palette.live_stream_chat.border};
  position: relative;
  z-index: 3;
  overflow: hidden;
  ${(props) =>
    props.$show_background &&
    `
        &::after{
            content:"";
            position:absolute;
            width:100%;
            height:100%;
            top:0px;
            left:0px;
            background:${
              props.theme.palette.live_stream_chat.banner.background_image
            };
            filter:${props.$show_gray_background ? "grayscale(1)" : "none"}; 
            background-size:cover;
            background-repeat:no-repeat;
            border-radius:25px;
            opacity:80%;
            z-index:1;
        }
    `}
`;
const StyledHeader = styled.div<IStyledHeader>`
  width: 100%;
  height: 70px;
  border-bottom: ${(props) =>
    props.$show_border
      ? `2px solid ${props.theme.palette.live_stream_chat.border}`
      : ""};
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const StyledMainText = styled.h4`
  font-family: ${({ theme }) => theme.palette.fontFamily.poppins};
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: ${({ theme }) => theme.palette.live_stream_chat.border};
`;

const StyledAvatarGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const StyledAvatar = styled.div<IStyledAvatar>`
  width: ${(props) => props.$size};
  height: ${(props) => props.$size};
  border: ${(props) => props.$border};
  border-radius: 50%;
  &:not(:first-child) {
    margin-left: -10px;
  }
`;

const StyledInstructAvatar = styled.div`
  width: 30px;
  height: 30px;
  border: 2px solid #fff;
  border-radius: 50%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;
const StyledImage = styled(Image)`
  object-fit: contain;
`;
const StyledChatMainContainer = styled.div`
  width: 100%;
  height: calc(100% - 70px);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
const StyledMessageContainer = styled.div`
  width: 100%;
  height: calc(100% - 74px);
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow: scroll;
`;

const StyledInputContainer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;

const StyledInput = styled.input`
  width: calc(100% - 60px);
  height: 100%;
  border: 2px solid ${({ theme }) => theme.palette.live_stream_chat.border};
  background: transparent;
  border-radius: 8px;
  color: #fff;
  font-family: ${({ theme }) => theme.palette.fontFamily.poppins};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding: 0px 18px;
  &::placeholder {
    color: #fff;
  }
`;
const StyledSentCta = styled.button`
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  cursor: pointer;
`;
const StyledMessage = styled.div`
  width: 100%;
  height: auto;
  border: 2px solid ${({ theme }) => theme.palette.live_stream_chat.border};
  border-radius: 16px;
`;
const StyledMessageHeader = styled.div`
  width: 100%;
  height: 50px;
  border-bottom: 2px solid
    ${({ theme }) => theme.palette.live_stream_chat.border};
  padding: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StyledUserName = styled.span`
  color: #fff;
  font-family: ${({ theme }) => theme.palette.fontFamily.poppins};
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-transform: capitalize;
`;
const StyledMessageText = styled.p`
  color: #d5cece;
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding: 16px;
`;

const StyledBannerContent = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledLogo = styled.p`
  color: ${({ theme }) => theme.palette.live_stream_chat.banner.logo_color};
  text-align: center;
  font-family: ${({ theme }) => theme.palette.fontFamily.poppins};
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: capitalize;
  position: absolute;
  transform: rotate(-90deg);
  left: -40px;
  top: 70px;
`;

const StyledSpan = styled.span<IStyledSpan>`
  color: ${(props) => props.$color};
`;

const StyledBannerMainContent = styled.div`
  width: 100%;
  height: calc(100% - 160px);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledBannerMainText = styled.h3`
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: #fff;
  color: transparent;
  font-size: 45px;
  font-family: ${({ theme }) => theme.palette.fontFamily.poppins};
  font-weight: 700;
  text-transform: uppercase;
  transform: rotate(-10deg);
  text-align: center;
`;
const StyledOutlinedSpan = styled.span`
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: ${({ theme }) =>
    theme.palette.live_stream_chat.banner.versus_color};
`;

const StyledChatNowCta = styled.button`
  background: ${({ theme }) =>
    theme.palette.live_stream_chat.banner.cta_background};
  color: ${({ theme }) => theme.palette.live_stream_chat.banner.cta_color};
  text-align: center;
  font-family: ${({ theme }) => theme.palette.fontFamily.poppins};
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  padding: 14px 18px;
  border-radius: 16px;
  border: 3px solid #fff;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  &::after {
    content: "";
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 1;
    width: 100%;
    height: 100%;
    background: url("/memory-game/live-stream-chat/cta-background.png");
  }
`;
const StyledCtaContent = styled.div`
  position: absolute;
  z-index: 2;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
`;

export {
  StyledContainer,
  StyledHeader,
  StyledMainText,
  StyledAvatarGroup,
  StyledAvatar,
  StyledInstructAvatar,
  StyledImage,
  StyledChatMainContainer,
  StyledMessageContainer,
  StyledInputContainer,
  StyledInput,
  StyledSentCta,
  StyledMessage,
  StyledMessageHeader,
  StyledUserName,
  StyledMessageText,
  StyledBannerContent,
  StyledLogo,
  StyledSpan,
  StyledBannerMainContent,
  StyledBannerMainText,
  StyledOutlinedSpan,
  StyledChatNowCta,
  StyledCtaContent,
};
