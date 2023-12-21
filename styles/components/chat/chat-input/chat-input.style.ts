import styled from "styled-components";

type IStyledButton = {
  $left?: string;
  $right?: string;
};

const StyledChatInputContainer = styled.div`
  width: 400px;
  height: 100%;
  position: relative;
  @media (max-width: ${({ theme }) => theme.palette.breakpoints.mobile}) {
    width: calc(100% - 62px);
    height: 100%;
  }
`;

const StyledChatInput = styled.input`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.palette.primary.main};
  border: ${({ theme }) => theme.palette.chat_input.border};
  border-radius: 16px;
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 1;
  padding-left: 60px;
  padding-right: 110px;
  color: ${({ theme }) => theme.palette.primary.info};
  font-family: ${({ theme }) => theme.palette.fontFamily.lobster};
  font-size: 16px;
  &::placeholder {
    color: ${({ theme }) => theme.palette.primary.info};
  }
  &:focus {
    outline: none;
  }
  @media (max-width: ${({ theme }) => theme.palette.breakpoints.mobile}) {
    border-radius: 25px;
  }
`;

const StyledButton = styled.button<IStyledButton>`
  position: absolute;
  z-index: 2;
  background: transparent;
  border: none;
  left: ${(props) => props.$left ?? "auto"};
  right: ${(props) => props.$right ?? "auto"};
  top: 50%;
  transform: translateY(-50%);
  font-size: 30px;
  cursor: pointer;
`;

const StyledEmojiContainer = styled.div`
  position: absolute;
  z-index: 2;
  bottom: 80px;
  border: ${({ theme }) => theme.palette.emoji_container.border};
  border-radius: 10px;
`;

export {
  StyledChatInputContainer,
  StyledChatInput,
  StyledButton,
  StyledEmojiContainer,
};
