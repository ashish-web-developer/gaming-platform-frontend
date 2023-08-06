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

// redux
import { useAppSelector } from "@/hooks/redux";
import { user } from "@/store/slice/user.slice";
import { active_user } from "@/store/slice/chat.slice";

interface Props {
  message: string;
}
const ChatMessage: FC<Props> = ({ message }) => {
  const _user = useAppSelector(user);
  const _active_user = useAppSelector(active_user);
  return (
    <StyledChatMessageContainer>
      <StyledChatMessageUserName>{_user.name}</StyledChatMessageUserName>
      <StyledChatMessage>{message}</StyledChatMessage>
      <StyledChatBottom>
        <StyledChatTime>08:50</StyledChatTime>
      </StyledChatBottom>
    </StyledChatMessageContainer>
  );
};

export default ChatMessage;
