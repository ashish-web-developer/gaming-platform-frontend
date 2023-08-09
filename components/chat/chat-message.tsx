//types
import type { FC } from "react";

// styled components
import {
  StyledChatMessageContainer,
  StyledChatMessageUserName,
  StyledChatMessage,
  StyledChatBottom,
  StyledChatTime,
} from "@/styles/components/chat/chat-message.style";


interface Props {
  message: string;
  date:string;
  username:string
  align:string
}
const ChatMessage: FC<Props> = ({ message , date, username,align}) => {
  return (
    <StyledChatMessageContainer $align = {align}>
      <StyledChatMessageUserName>{username}</StyledChatMessageUserName>
      <StyledChatMessage>{message}</StyledChatMessage>
      <StyledChatBottom>
        <StyledChatTime>{date}</StyledChatTime>
      </StyledChatBottom>
    </StyledChatMessageContainer>
  );
};

export default ChatMessage;
