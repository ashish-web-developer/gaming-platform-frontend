import styled from "styled-components";

const StyledContainer = styled.div`
  flex-basis: 52px;
  flex-shrink: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  position: relative;
`;

const StyledChatInputContainer = styled.div`
  flex-grow: 1;
  height: 100%;
`;

const StyledChatInput = styled.input`
  width: 100%;
  height: 100%;
  border: 2px solid #8d8181;
  background: ${({ theme }) => theme.palette.chat.main};
  border-radius: 10px;
  font-family: ${({ theme }) => theme.palette.fontFamily.poppins};
  padding: 0px 16px;
  color: #fff;
  &::placeholder {
    color: #8d8181;
  }
  &:focus {
    outline: none;
  }
`;
const StyledSendButton = styled.button`
  position: absolute;
  height: 35px;
  width: 35px;
  background: ${({ theme }) => theme.palette.chat.main};
  top: 50%;
  transform: translateY(-50%);
  right: 60px;
  border: none;
`;

const StyledEmojiButton = styled.button`
  border: none;
  color: ${({ theme }) => theme.palette.chat.icon_color};
  font-size: 30px;
  background: ${({ theme }) => theme.palette.chat.main};
  flex-basis: 40px;
`;

const StyledEmojiContainer = styled.div`
  position: absolute;
  bottom: 80px;
`;

export {
  StyledContainer,
  StyledChatInputContainer,
  StyledChatInput,
  StyledSendButton,
  StyledEmojiButton,
  StyledEmojiContainer,
};
