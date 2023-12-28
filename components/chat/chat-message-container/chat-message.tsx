import { useRef, forwardRef } from "react";
// types
import type CustomChatTheme from "@/types/theme/chat";
import type {
  IConversation,
  IUsersWithConversation,
} from "@/types/store/slice/chat";
import { User } from "@/types/user";

// styled components
import {
  StyledMessageContent,
  StyledUserProfile,
  StyledMessage,
} from "@/styles/components/chat/chat-message-container/chat-message.style";
// styled theme
import { useTheme } from "styled-components";

// hooks
import useAvatar from "@/hooks/profile.hook";
import { useMessageView } from "@/hooks/chat/chat.hook";

// helpers
import { readableFormatDate } from "@/helpers/common";

const ChatMessage = forwardRef<
  HTMLDivElement,
  {
    conversation: IConversation;
    user: User;
    active_user: IUsersWithConversation;
  }
>(({ conversation, user, active_user }, root_ref) => {
  const target_ref = useRef<HTMLDivElement>(null);
  const created_at = readableFormatDate(conversation.created_at);
  const user_avatar = useAvatar(user.username ?? "");
  const active_user_avatar = useAvatar(active_user?.username ?? "");
  const theme = useTheme() as CustomChatTheme;
  useMessageView({ root_ref, target_ref, conversation });

  if (conversation.receiver_id == user.id) {
    return (
      <StyledMessageContent $justifyContent="flex-start">
        <StyledUserProfile
          $borderColor={theme.palette.messages.received_message_border}
          $order={1}
          dangerouslySetInnerHTML={{
            __html: active_user_avatar,
          }}
        />
        <StyledMessage
          ref={target_ref}
          $showDoubleTick={false}
          $content={created_at}
          $right={10}
          $borderRadius="0px 20px 20px 20px"
          $borderColor={theme.palette.messages.received_message_border}
          $order={2}
        >
          {conversation.message}
        </StyledMessage>
      </StyledMessageContent>
    );
  }
  if (conversation.sender_id == user.id) {
    return (
      <StyledMessageContent $justifyContent="flex-end">
        <StyledUserProfile
          $borderColor={theme.palette.messages.send_message_border}
          $order={2}
          dangerouslySetInnerHTML={{
            __html: user_avatar,
          }}
        />
        <StyledMessage
          ref={target_ref}
          $showDoubleTick={conversation.viewed}
          $content={created_at}
          $left={10}
          $borderRadius="20px 0px 20px 20px"
          $borderColor={theme.palette.messages.send_message_border}
          $order={1}
        >
          {conversation.message}
        </StyledMessage>
      </StyledMessageContent>
    );
  }
});

export default ChatMessage;
