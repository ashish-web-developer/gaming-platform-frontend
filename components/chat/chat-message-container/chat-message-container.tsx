// types
import type { FC } from "react";
import type { IUsersWithConversation } from "@/types/store/slice/chat";

// styled components
import {
  StyledMessageContainer,
  StyledActiveUserName,
  StyledMessagesCount,
} from "@/styles/components/chat/chat-message-container/chat-message-container.style";
// redux
import { useAppSelector } from "@/hooks/redux";
import { active_user } from "@/store/slice/chat.slice";

const getMessageCount = (active_user: IUsersWithConversation | null) => {
  if (active_user?.received_messages && active_user.sent_messages) {
    return (
      active_user?.received_messages.length + active_user.sent_messages.length
    );
  }
  if (active_user?.received_messages) {
    return active_user?.received_messages.length;
  }
  if (active_user?.sent_messages) {
    return active_user?.sent_messages.length;
  }
  return 0;
};
const ChatMessageContainer: FC = () => {
  const _active_user = useAppSelector(active_user);
  const message_count = getMessageCount(_active_user);
  return (
    <>
      {_active_user && (
        <StyledMessageContainer>
          <StyledActiveUserName>{_active_user.name}</StyledActiveUserName>
          <StyledMessagesCount>{message_count} messages </StyledMessagesCount>
        </StyledMessageContainer>
      )}
    </>
  );
};

export default ChatMessageContainer;
