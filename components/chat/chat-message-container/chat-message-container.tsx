import { useRef, forwardRef } from "react";
// types
import type { FC } from "react";
// styled components
import {
  StyledMessageContainer,
  StyledUserDetailsContainer,
  StyledActiveUserName,
  StyledMessagesCount,
  StyledChatMessageContentContainer,
} from "@/styles/components/chat/chat-message-container/chat-message-container.style";
// local components
import ChatMessage from "@/components/chat/chat-message-container/chat-message";
// redux
import { useAppSelector } from "@/hooks/redux.hook";
import { user } from "@/store/slice/user.slice";
import {
  active_user,
  active_user_conversation,
} from "@/store/slice/chat.slice";

const ChatMessageContainer: FC = () => {
  const _user = useAppSelector(user);
  const _active_user = useAppSelector(active_user);
  const _active_user_conversation = useAppSelector(active_user_conversation);
  const root_ref = useRef<HTMLDivElement>(null);
  return (
    <>
      {_active_user && (
        <StyledMessageContainer>
          <StyledUserDetailsContainer>
            <StyledActiveUserName>{_active_user.name}</StyledActiveUserName>
            <StyledMessagesCount>
              {_active_user_conversation.length} messages{" "}
            </StyledMessagesCount>
          </StyledUserDetailsContainer>
          <StyledChatMessageContentContainer ref={root_ref}>
            {_active_user_conversation.map((conversation) => (
              <ChatMessage
                key={conversation.id}
                conversation={conversation}
                user={_user}
                active_user={_active_user}
                ref={root_ref}
              />
            ))}
          </StyledChatMessageContentContainer>
        </StyledMessageContainer>
      )}
    </>
  );
};

export default ChatMessageContainer;
