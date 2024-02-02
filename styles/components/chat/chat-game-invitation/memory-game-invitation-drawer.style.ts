import Image from "next/image";
import styled from "styled-components";

type IStyledUserAvatar = {
  $width: string;
  $height: string;
  $top: string;
  $left?: string;
  $right?: string;
  $border: string;
};
type IStyledSpan = {
  $color: string;
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
  padding: 1.75rem;
  width: 100%;
  height: 100%;
  @media (max-width: 375px) and (max-height: 850px) {
    padding: 1.25rem;
  }
`;

const StyledHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const StyledLogoContainer = styled.h6`
  color: #ffffff;
  font-family: ${({ theme }) => theme.fontFamily.poppins};
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  @media (max-width: 375px) and (max-height: 850px) {
    font-size: 20px;
  }
`;

const StyledSpan = styled.span<IStyledSpan>`
  color: ${(props) => props.$color};
`;

const StyledCloseCta = styled.button`
  border: none;
  background: none;
`;
const StyledMessageContainer = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const StyledTopMessage = styled.div`
  color: #fff;
  font-family: ${({ theme }) => theme.fontFamily.poppins};
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  @media (max-width: 375px) and (max-height: 850px) {
    font-size: 16px;
  }
`;
const StyledBottomMessage = styled.div`
  color: #f5e960;
  font-family: ${({ theme }) => theme.fontFamily.poppins};
  font-size: 28px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  @media (max-width: 375px) and (max-height: 850px) {
    font-size: 20px;
  }
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
  @media (max-width: 375px) and (max-height: 850px) {
    background-position: -25px 99px;
    height: 357px;
  }
  @media (max-width: 300px) and (max-height: 850px) {
    background-position: -45px 99px;
  }
`;

const StyledDrawerMainImage = styled(Image)`
  object-fit: contain;
`;

const StyledPlayCta = styled.button`
  position: absolute;
  height: 60px;
  right: 28px;
  bottom: 28px;
  background: #000;
  z-index: 2;
  color: #fff;
  font-family: ${({ theme }) => theme.fontFamily.poppins};
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  padding: 0px 28px;
  border: 3.5px solid #f42c04;
  border-radius: 16px;
  transform: skewX(-20deg);
  @media (max-width: 375px) and (max-height: 850px) {
    font-size: 16px;
    height: 40px;
    border-radius: 8px;
    border: 2.5px solid #f42c04;
    transform: skewX(-16deg);
  }
`;

const StyledVsContainer = styled.p`
  color: #fff;
  font-family: ${({ theme }) => theme.fontFamily.poppins};
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  @media (max-width: 375px) and (max-height: 850px) {
    font-size: 16px;
  }
`;
const StyledUserAvatar = styled.div<IStyledUserAvatar>`
  position: absolute;
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  top: ${(props) => props.$top};
  left: ${(props) => props.$left ?? "auto"};
  right: ${(props) => props.$right ?? "auto"};
  border: ${(props) => props.$border};
  background: transparent;
  border-radius: 50%;
`;

const StyledAvatarImage = styled(Image)`
  object-fit: cover;
  border-radius: 50%;
`;

export {
  StyledBackground,
  StyledContainer,
  StyledHeaderContainer,
  StyledLogoContainer,
  StyledSpan,
  StyledCloseCta,
  StyledMessageContainer,
  StyledTopMessage,
  StyledBottomMessage,
  StyledUserName,
  StyledDrawerImageContainer,
  StyledDrawerMainImage,
  StyledPlayCta,
  StyledVsContainer,
  StyledUserAvatar,
  StyledAvatarImage,
};
