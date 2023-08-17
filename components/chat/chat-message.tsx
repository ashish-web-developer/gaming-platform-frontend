//types
import type { FC } from "react";

// styled components
import {
  StyledChatParentContainer,
  StyledChatMessageContainer,
  StyledChatMessageUserName,
  StyledChatMessage,
  StyledChatBottom,
  StyledChatTime,
} from "@/styles/components/chat/chat-message.style";

// local components
import ChatAvatar from "@/components/chat/chat-avatar";

interface Props {
  message: string;
  date: string;
  username: string;
  name: string;
  align: string;
  flexDirection: "row" | "row-reverse";
  backgroundColor: string;
  chatTimeColor: string;
}
const ChatMessage: FC<Props> = ({
  message,
  date,
  username,
  name,
  align,
  flexDirection,
  backgroundColor,
  chatTimeColor,
}) => {
  return (
    <StyledChatParentContainer $flexDirection={flexDirection} $align={align}>
      <ChatAvatar width={60} height={60} username={username} />
      <StyledChatMessageContainer $backgroundColor={backgroundColor}>
        <StyledChatMessageUserName>{name}</StyledChatMessageUserName>
        <StyledChatMessage>{message}</StyledChatMessage>
        <StyledChatBottom>
          <StyledChatTime $color={chatTimeColor}>{date}</StyledChatTime>
        </StyledChatBottom>
      </StyledChatMessageContainer>
    </StyledChatParentContainer>
  );
};

export default ChatMessage;
