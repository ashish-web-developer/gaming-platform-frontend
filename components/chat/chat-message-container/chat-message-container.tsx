import { useRef, forwardRef } from "react";
// types
import type { FC } from "react";
// styled components
import {
  StyledMessageContainer,
  StyledDetailsWrapper,
  StyledWrapper,
  StyledName,
  StyledMessageCount,
  StyledGroupAvatar,
  StyledChatMessageContentContainer,
} from "@/styles/components/chat/chat-message-container/chat-message-container.style";
// local components
import ChatMessage from "@/components/chat/chat-message-container/chat-message";
import ChatAvatar from "@/components/chat/chat-sidebar/chat-group-list/chat-avatar";
// redux
import { useAppSelector } from "@/hooks/redux.hook";
import { user } from "@/store/slice/user.slice";
import {
  // state
  active_user,
  active_group,
  active_conversation,
} from "@/store/slice/chat.slice";
import { mode } from "@/store/slice/common.slice";
import { IUsersWithConversation } from "@/types/store/slice/chat";

const ChatMessageContainer: FC = () => {
  const _mode = useAppSelector(mode);
  const _user = useAppSelector(user);
  const _active_user = useAppSelector(active_user);
  const _active_group = useAppSelector(active_group);
  const _active_conversation = useAppSelector(active_conversation);
  const root_ref = useRef<HTMLDivElement>(null);
  return (
    <>
      {_active_group && (
        <StyledMessageContainer>
          <StyledDetailsWrapper>
            <StyledWrapper $gap="6px">
              <StyledName>{_active_group.group_name}</StyledName>
              <StyledMessageCount>
                ({_active_conversation.length} messages)
              </StyledMessageCount>
            </StyledWrapper>
            <StyledGroupAvatar>
              {_active_group.user_group.slice(0, 4).map((user_group, index) => {
                return (
                  <ChatAvatar
                    key={`chat-avatar-${index}`}
                    left_count={
                      _active_group.user_group.length > 4
                        ? _active_group.user_group.length - 3
                        : 0
                    }
                    user={user_group.user as IUsersWithConversation}
                  />
                );
              })}
            </StyledGroupAvatar>
          </StyledDetailsWrapper>
          <StyledChatMessageContentContainer ref={root_ref}>
            {_active_conversation.map((conversation) => (
              <ChatMessage
                key={conversation.id}
                conversation={conversation}
                user={_user}
                active_user={conversation.sender as IUsersWithConversation}
                ref={root_ref}
              />
            ))}
          </StyledChatMessageContentContainer>
        </StyledMessageContainer>
      )}
      {_active_user && (
        <StyledMessageContainer>
          <StyledDetailsWrapper>
            <StyledWrapper $gap="6px">
              <StyledName>{_active_user.name}</StyledName>
              <StyledMessageCount>(24 messages)</StyledMessageCount>
            </StyledWrapper>
            <ChatAvatar user={_active_user} />
          </StyledDetailsWrapper>
          <StyledChatMessageContentContainer ref={root_ref}>
            {_active_conversation.map((conversation) => (
              <ChatMessage
                key={conversation.id}
                conversation={conversation}
                user={_user}
                active_user={conversation.sender as IUsersWithConversation}
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
