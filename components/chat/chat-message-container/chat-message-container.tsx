// types
import type { FC } from "react";

// styled components
import {
  StyledMessageContainer,
  StyledUserDetailsContainer,
  StyledActiveUserName,
  StyledMessagesCount,
  StyledChatMessageContentContainer,
  StyledMessageContent,
  StyledUserProfile,
  StyledMessage,
} from "@/styles/components/chat/chat-message-container/chat-message-container.style";
// redux
import { useAppSelector } from "@/hooks/redux";
import { user } from "@/store/slice/user.slice";
import {
  active_user,
  active_user_conversation,
} from "@/store/slice/chat.slice";

// hooks
import useAvatar from "@/hooks/profile";

const ChatMessageContainer: FC = () => {
  const _user = useAppSelector(user);
  const _active_user = useAppSelector(active_user);
  const _active_user_avatar = useAvatar(_active_user?.username ?? "");
  const _active_user_conversation = useAppSelector(active_user_conversation);
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
          <StyledChatMessageContentContainer>
            {_active_user_conversation.map((conversation) => {
              if (conversation.receiver_id == _user.id) {
                return (
                  <StyledMessageContent
                    key={conversation.id}
                    $justifyContent="flex-start"
                  >
                    <StyledUserProfile
                      $borderColor="#E7E08B"
                      $order={1}
                      dangerouslySetInnerHTML={{
                        __html: _active_user_avatar,
                      }}
                    />
                    <StyledMessage $borderColor="#E7E08B" $order={2}>
                      {conversation.message}
                    </StyledMessage>
                  </StyledMessageContent>
                );
              }
              if (conversation.sender_id == _user.id) {
                return (
                  <StyledMessageContent
                    key={conversation.id}
                    $justifyContent="flex-end"
                  >
                    <StyledUserProfile
                      $borderColor="#AFA2FF"
                      $order={2}
                      dangerouslySetInnerHTML={{
                        __html: _active_user_avatar,
                      }}
                    />
                    <StyledMessage $borderColor="#AFA2FF" $order={1}>
                      {conversation.message}
                    </StyledMessage>
                  </StyledMessageContent>
                );
              }
            })}
            {/* <StyledMessageContent>
              <StyledUserProfile
                dangerouslySetInnerHTML={{
                  __html: avatar,
                }}
              >
              </StyledUserProfile>
              <StyledMessage>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
              </StyledMessage>
            </StyledMessageContent> */}
          </StyledChatMessageContentContainer>
        </StyledMessageContainer>
      )}
    </>
  );
};

export default ChatMessageContainer;
