import { useRef } from "react";
// types
import type { FC } from "react";
import type { IUsersWithConversation } from "@/types/store/slice/chat";

// styled components
import { StyledMobileChatMessageContainer } from "@/styles/components/chat/chat-message-container/mobile/mobile-chat-message-container.style";

// local components
import ChatMessage from "@/components/chat/chat-message-container/chat-message";

// redux
import { useAppSelector } from "@/hooks/redux";
import { user } from "@/store/slice/user.slice";
import {
  active_user,
  active_user_conversation,
} from "@/store/slice/chat.slice";

const MobileChatMessageContainer: FC = () => {
  const _active_user_conversation = useAppSelector(active_user_conversation);
  const _active_user = useAppSelector(active_user) as IUsersWithConversation;
  const _user = useAppSelector(user);
  const root_ref = useRef<HTMLDivElement>(null);
  return (
    <StyledMobileChatMessageContainer>
      {_active_user_conversation.map((conversation) => (
        <ChatMessage
          key={conversation.id}
          conversation={conversation}
          user={_user}
          active_user={_active_user}
          ref={root_ref}
        />
      ))}
    </StyledMobileChatMessageContainer>
  );
};
export default MobileChatMessageContainer;
