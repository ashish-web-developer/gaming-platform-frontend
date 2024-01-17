import { useRef, forwardRef, useMemo } from "react";
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
import { useIsMobile } from "@/hooks/common.hook";

// redux
import { useAppDispatch } from "@/hooks/redux.hook";
import { updateView } from "@/store/slice/chat.slice";

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
  const dispatch = useAppDispatch();
  const theme = useTheme() as CustomChatTheme;
  const is_mobile = useIsMobile();
  const target_ref = useRef<HTMLDivElement>(null);
  const created_at = readableFormatDate(conversation.created_at);
  const user_avatar = useAvatar(user.username ?? "");
  const active_user_avatar = useAvatar(active_user?.username ?? "");
  const intersection_observer_options = useMemo(() => {
    return is_mobile
      ? {
          root: typeof root_ref !== "function" ? root_ref?.current : null,
          threshold: 1,
          rootMargin: "0px 0px 1px 0px",
        }
      : {
          root: typeof root_ref !== "function" ? root_ref?.current : null,
          threshold: 1,
          rootMargin: "0px",
        };
  }, [is_mobile]);
  useMessageView({
    target_ref,
    callback: (entries, observer) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          !conversation.viewed &&
          user.id == conversation.receiver_id
        ) {
          dispatch(updateView({ conversation_id: conversation.id }));
          observer.unobserve(target_ref.current as HTMLDivElement);
        }
      });
    },
    options: intersection_observer_options,
  });

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
