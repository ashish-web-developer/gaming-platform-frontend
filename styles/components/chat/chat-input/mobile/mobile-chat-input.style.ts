import styled from "styled-components";

type IStyledButton = {
  $left?: string;
  $right?: string;
};

const StyledContainer = styled.div`
  width: 100%;
  flex-basis: 50px;
  display: flex;
  justify-content: space-between;
`;

const StyledMobileChatInputContainer = styled.div`
  width: calc(100% - 62px);
  height: 100%;
  position: relative;
`;
const StyledButton = styled.button<IStyledButton>`
  position: absolute;
  z-index: 2;
  background: transparent;
  border: none;
  top: 50%;
  transform: translateY(-50%);
  font-size: 30px;
  cursor: pointer;
  left: ${(props) => props.$left ?? "auto"};
  right: ${(props) => props.$right ?? "auto"};
`;

const StyledMobileChatInput = styled.input`
  width: 100%;
  height: 100%;
  border: ${({ theme }) => theme.palette.chat_input.border};
  border-radius: 25px;
  position: absolute;
  z-index: 1;
  font-family: ${({ theme }) => theme.palette.fontFamily.lobster};
  font-size: 16px;
  color: ${({ theme }) => theme.palette.primary.info};
  padding-left: 50px;
  background: transparent;
  &::placeholder {
    color: ${({ theme }) => theme.palette.primary.info};
  }
`;
const StyledGamingInvitationCta = styled.button`
  width: 50px;
  height: 50px;
  border: none;
  background: #000;
  border-radius: 50%;
`;

export {
  StyledContainer,
  StyledMobileChatInputContainer,
  StyledMobileChatInput,
  StyledGamingInvitationCta,
  StyledButton,
};
