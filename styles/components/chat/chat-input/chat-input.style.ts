import styled from "styled-components";
import Image from "next/image";

const StyledChatInputContainer = styled.div<{
  $mode: "light" | "dark";
}>`
  background: ${({ theme }) => theme.palette.secondary.main};
  width: 100%;
  height: 100%;
  overflow: hidden;
  border: 2px solid
    ${(props) =>
      props.$mode == "light"
        ? props.theme.palette.primary.dark
        : props.theme.palette.primary.main};
  border-radius: 25px;
  padding: 1.125rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledChatInputWrapper = styled.div`
  position: relative;
`;

const StyledUserProfileWrapper = styled.span`
  display: inline-block;
  width: 40px;
  height: 40px;
  position: absolute;
  left: 5px;
  top: 50%;
  transform: translateY(-50%);
  border: 2px solid #000;
  border-radius: 50%;
  overflow: hidden;
`;

const StyledEmojiCta = styled.button`
  border: none;
  cursor: pointer;
  position: absolute;
  right: 0px;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  background: none;
`;
const StyledEmojiImage = styled(Image)`
  object-fit: cover;
`;
const StyledUserProfileImage = styled(Image)`
  object-fit: cover;
`;

const StyledChatInput = styled.input`
  width: 100%;
  height: 50px;
  border-radius: 25px;
  border: 2px solid #000;
  background: #fff;
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  font-size: 0.875rem;
  padding-left: 50px;
  &::placeholder {
    color: #000;
  }
`;

const StyledBottomWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const StyledIconWrapper = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;
`;

const StyledIconCta = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  position: relative;
  width: 30px;
  height: 30px;
`;

const StyledIconImage = styled(Image)`
  object-fit: cover;
`;

const StyledSendCta = styled.button`
  height: 40px;
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  font-size: 1.2rem;
  color: #a2f263;
  background: #000;
  padding: 0px 2rem;
  border: none;
  border-radius: 25px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;

export {
  StyledChatInputContainer,
  StyledChatInputWrapper,
  StyledUserProfileWrapper,
  StyledUserProfileImage,
  StyledEmojiCta,
  StyledEmojiImage,
  StyledChatInput,
  StyledBottomWrapper,
  StyledIconWrapper,
  StyledIconCta,
  StyledIconImage,
  StyledSendCta,
};
