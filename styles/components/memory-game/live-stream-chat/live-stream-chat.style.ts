import Image from "next/image";
import styled from "styled-components";

const StyledContainer = styled.div`
  width: 400px;
  height: 534px;
  background: ${({ theme }) => theme.palette.primary.dark};
  border-radius: 25px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border: 2px solid ${({ theme }) => theme.palette.primary.light};
  position: relative;
  z-index: 3;
  overflow: hidden;
  &::after {
    content: "";
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: url("/memory-game/live-stream-chat/background-texture.png");
    background-size: cover;
    background-repeat: no-repeat;
  }
`;

const StyledContent = styled.div`
  position: absolute;
  z-index: 1;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
`;
const StyledHeader = styled.div`
  width: 100%;
  height: 70px;
  border-bottom: 2px solid ${({ theme }) => theme.palette.primary.light};
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const StyledMainText = styled.h4`
  font-family: ${({ theme }) => theme.fontFamily.poppins};
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: ${({ theme }) => theme.palette.primary.light};
`;

const StyledBannerAvatarContainer = styled.div`
  position: absolute;
  left: 10px;
  top: 10px;
`;

const StyledBannerTextPatternContainer = styled.div`
  display: inline;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%);
`;

const StyledPlayButtonContainer = styled.div`
  display: inline;
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
`;
const StyledAvatarGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const StyledAvatar = styled.div<{
  $size: string;
  $border: string;
}>`
  width: ${(props) => props.$size};
  height: ${(props) => props.$size};
  border: ${(props) => props.$border};
  border-radius: 50%;
  position: relative;
  &:not(:first-child) {
    margin-left: -10px;
  }
`;

const StyledAvatarImage = styled(Image)`
  border-radius: 50%;
  object-fit: cover;
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
  border: 2px solid ${({ theme }) => theme.palette.primary.light};
  background: transparent;
  border-radius: 8px;
  color: #fff;
  font-family: ${({ theme }) => theme.fontFamily.poppins};
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
  border: 2px solid ${({ theme }) => theme.palette.primary.light};
  border-radius: 16px;
`;
const StyledMessageHeader = styled.div`
  width: 100%;
  height: 50px;
  border-bottom: 2px solid ${({ theme }) => theme.palette.primary.light};
  padding: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StyledUserName = styled.span`
  color: #fff;
  font-family: ${({ theme }) => theme.fontFamily.poppins};
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
  StyledContent,
  StyledHeader,
  StyledMainText,
  StyledBannerAvatarContainer,
  StyledBannerTextPatternContainer,
  StyledPlayButtonContainer,
  StyledAvatarGroup,
  StyledAvatar,
  StyledAvatarImage,
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
  StyledCtaContent,
};
