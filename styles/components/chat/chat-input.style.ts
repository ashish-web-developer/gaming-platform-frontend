import styled from "styled-components";

type IStyledButton = {
  $left?: string;
  $right?: string;
};

const StyledChatInputContainer = styled.div`
  width: 400px;
  height: 100%;
  position: relative;
`;

const StyledChatInput = styled.input`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.palette.primary.main};
  border: 3px solid ${({ theme }) => theme.palette.primary.green};
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
`;

const StyledEmojiContainer = styled.div`
  position: absolute;
  z-index: 2;
  bottom: 80px;
`;

export {
  StyledChatInputContainer,
  StyledChatInput,
  StyledButton,
  StyledEmojiContainer,
};
