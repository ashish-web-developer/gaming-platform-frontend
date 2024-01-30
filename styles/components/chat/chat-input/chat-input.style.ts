import styled from "styled-components";

const StyledChatInputContainer = styled.div`
  width: 400px;
  height: 100%;
  position: relative;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: calc(100% - 62px);
    height: 100%;
  }
`;

const StyledChatInput = styled.input<{
  $mode: "light" | "dark";
}>`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.palette.primary.main};
  border: 2px solid ${({ theme }) => theme.palette.primary.dark};
  border-radius: 16px;
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 1;
  padding-left: 60px;
  padding-right: 110px;
  color: ${(props) =>
    props.$mode == "light"
      ? props.theme.palette.primary.dark
      : props.theme.palette.primary.light};
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  font-size: 16px;
  &::placeholder {
    color: ${(props) =>
      props.$mode == "light"
        ? props.theme.palette.primary.dark
        : props.theme.palette.primary.light};
  }
  &:focus {
    outline: none;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    border-radius: 25px;
  }
`;

const StyledButton = styled.button<{
  $left?: string;
  $right?: string;
}>`
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
  border: 2px solid ${({ theme }) => theme.palette.primary.dark};
  border-radius: 10px;
`;

export {
  StyledChatInputContainer,
  StyledChatInput,
  StyledButton,
  StyledEmojiContainer,
};
