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

// helpers
import { readableFormatDate } from "@/helpers/common";

const ChatMessageContainer: FC = () => {
  const _user = useAppSelector(user);
  const _user_avatar = useAvatar(_user.username ?? "");
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
              const created_at = readableFormatDate(conversation.created_at);
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
                    <StyledMessage
                      $showDoubleTick={false}
                      $content={created_at}
                      $right={10}
                      $borderRadius="0px 20px 20px 20px"
                      $borderColor="#E7E08B"
                      $order={2}
                    >
                      {conversation.message}
                    </StyledMessage>
                  </StyledMessageContent>
                );
              }
              if (conversation.sender_id == _user.id) {
                console.log(conversation);
                return (
                  <StyledMessageContent
                    key={conversation.id}
                    $justifyContent="flex-end"
                  >
                    <StyledUserProfile
                      $borderColor="#AFA2FF"
                      $order={2}
                      dangerouslySetInnerHTML={{
                        __html: _user_avatar,
                      }}
                    />
                    <StyledMessage
                      $showDoubleTick={true && conversation.viewed}
                      $content={created_at}
                      $left={10}
                      $borderRadius="20px 0px 20px 20px"
                      $borderColor="#AFA2FF"
                      $order={1}
                    >
                      {conversation.message}
                    </StyledMessage>
                  </StyledMessageContent>
                );
              }
            })}
          </StyledChatMessageContentContainer>
        </StyledMessageContainer>
      )}
    </>
  );
};

export default ChatMessageContainer;
