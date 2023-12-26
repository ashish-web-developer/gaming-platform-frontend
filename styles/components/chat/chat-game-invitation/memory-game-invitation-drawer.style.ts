import styled from "styled-components";

type IStyledUserAvatar = {
  $width: string;
  $height: string;
  $top: string;
  $left: string;
  $border: string;
};

const StyledBackground = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: #000000;
  z-index: 10;
  &::before {
    content: "";
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: url("/chat/chat-game-invitation/background.jpg");
    display: block;
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 0.2;
  }
`;
const StyledContainer = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  padding: 1.7rem;
  width: 100%;
  height: 100%;
`;

const StyledHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const StyledLogoContainer = styled.h6`
  color: #ffffff;
  font-family: Poppins;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
const StyledLogoSpan = styled.span`
  color: #f42c04;
`;

const StyledCloseCta = styled.button`
  border: none;
  background: none;
`;
const StyledMessageContainer = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
const StyledTopMessage = styled.div`
  color: #fff;
  font-family: Poppins;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
const StyledBottomMessage = styled.div`
  color: #f5e960;
  font-family: Poppins;
  font-size: 28px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
const StyledUserName = styled.span`
  color: #e7e08b;
  text-decoration: underline;
`;

const StyledDrawerImageContainer = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 555px;
  background-image: url("/chat/chat-game-invitation/background-blob.svg");
  background-repeat: no-repeat;
  background-position: -25px 170px;
`;

const StyledPlayCta = styled.button`
  position: absolute;
  height: 60px;
  right: 28px;
  bottom: 28px;
  background: #000;
  z-index: 2;
  color: #fff;
  font-family: ${({ theme }) => theme.palette.fontFamily.poppins};
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  padding: 0px 28px;
  border: 3.5px solid #f42c04;
  border-radius: 16px;
  transform: skewX(-20deg);
`;

const StyledVsContainer = styled.p`
  color: #fff;
  font-family: ${({ theme }) => theme.palette.fontFamily.poppins};
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
const StyledVsSpan = styled.span`
  color: #f42c04;
`;
const StyledUserAvatar = styled.div<IStyledUserAvatar>`
  position: absolute;
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  top: ${(props) => props.$top};
  left: ${(props) => props.$left};
  border: ${(props) => props.$border};
  background: transparent;
  border-radius: 50%;
`;

export {
  StyledBackground,
  StyledContainer,
  StyledHeaderContainer,
  StyledLogoContainer,
  StyledLogoSpan,
  StyledCloseCta,
  StyledMessageContainer,
  StyledTopMessage,
  StyledBottomMessage,
  StyledUserName,
  StyledDrawerImageContainer,
  StyledPlayCta,
  StyledVsContainer,
  StyledVsSpan,
  StyledUserAvatar,
};
