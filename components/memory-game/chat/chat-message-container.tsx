// types
import type { FC } from "react";
import type { IConversation } from "@/types/store/slice/chat";
import type CustomMemoryGameThemePalette from "@/types/theme/memory-game";

// styled components
import {
  StyledChatContentContainer,
  StyledMessageContainer,
  StyledProfile,
  StyledMessage,
} from "@/styles/components/memory-game/chat/chat-message-container.style";

// styled theme
import { useTheme } from "styled-components";

// redux
import { useAppSelector } from "@/hooks/redux";
import {
  active_user,
  active_user_conversation,
} from "@/store/slice/chat.slice";
import { user } from "@/store/slice/user.slice";

// hooks
import useAvatar from "@/hooks/profile";

const ChatMessage: FC<{ conversation: IConversation }> = ({ conversation }) => {
  const theme = useTheme() as CustomMemoryGameThemePalette;
  const _user = useAppSelector(user);
  const _active_user = useAppSelector(active_user);
  const user_avatar = useAvatar(_user.username ?? "");
  const active_user_avatar = useAvatar(_active_user?.username ?? "");
  if (conversation.sender_id == _user.id) {
    return (
      <StyledMessageContainer $justifyContent="flex-end">
        <StyledProfile
          dangerouslySetInnerHTML={{
            __html: user_avatar,
          }}
          $order={2}
        ></StyledProfile>
        <StyledMessage
          $background={theme.palette.chat.sender_messages_background}
          $order={1}
          $border="10px 0px 10px 10px"
        >
          {conversation.message}
        </StyledMessage>
      </StyledMessageContainer>
    );
  }
  return (
    <StyledMessageContainer $justifyContent="flex-start">
      <StyledProfile
        dangerouslySetInnerHTML={{
          __html: active_user_avatar,
        }}
        $order={1}
      ></StyledProfile>
      <StyledMessage
        $background={theme.palette.chat.receiver_messages_background}
        $order={2}
        $border={"0px 10px 10px 10px"}
      >
        {conversation.message}
      </StyledMessage>
    </StyledMessageContainer>
  );
};

const ChatMessagesContainer: FC = () => {
  const _active_user_conversation = useAppSelector(active_user_conversation);
  return (
    <StyledChatContentContainer>
      {_active_user_conversation.map((conversation) => (
        <ChatMessage key={conversation.id} conversation={conversation} />
      ))}
    </StyledChatContentContainer>
  );
};
export default ChatMessagesContainer;
