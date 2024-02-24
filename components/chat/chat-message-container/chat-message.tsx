import { useRef, forwardRef, useMemo } from "react";
// types
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

// hooks
import { useAvatarUrl } from "@/hooks/profile.hook";
import { useMessageView } from "@/hooks/chat/chat.hook";
import { useIsMobile } from "@/hooks/common.hook";

// redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hook";
import { updateView } from "@/store/slice/chat.slice";
import { mode } from "@/store/slice/common.slice";

// helpers
import { readableFormatDate } from "@/helpers/common";

const ChatMessage = forwardRef<
  HTMLDivElement,
  {
    conversation: IConversation;
    user: User;
  }
>(({ conversation, user }, root_ref) => {
  const dispatch = useAppDispatch();
  const _mode = useAppSelector(mode);
  const is_mobile = useIsMobile();
  const target_ref = useRef<HTMLDivElement>(null);
  const created_at = readableFormatDate(conversation.created_at);
  const user_avatar_url = useAvatarUrl(user as IUsersWithConversation);
  const sender_avatar_url = useAvatarUrl(
    conversation.sender as IUsersWithConversation
  );
  const intersection_observer_options = useMemo(() => {
    return is_mobile
      ? {
          root: typeof root_ref !== "function" ? root_ref?.current : null,
          threshold: 1,
          rootMargin: "0px 0px 50px 0px",
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
  if (conversation.sender_id == user.id) {
    return (
      <StyledMessageContent $justifyContent="flex-end">
        <StyledUserProfile
          $border_color={_mode == "dark" ? "#AFA2FF" : "#EE964B"}
          $order={2}
          src={user_avatar_url}
          width={40}
          height={40}
          alt="user-avatar"
          sizes="(max-width: 1400px) 10vw"
        />
        <StyledMessage
          ref={target_ref}
          $show_double_tick={conversation.viewed}
          $content={created_at}
          $left={10}
          $border_radius="20px 0px 20px 20px"
          $border_color={_mode == "dark" ? "#AFA2FF" : "#EE964B"}
          $order={1}
          $mode={_mode}
        >
          {conversation.message}
        </StyledMessage>
      </StyledMessageContent>
    );
  }
  return (
    <StyledMessageContent $justifyContent="flex-start">
      <StyledUserProfile
        $border_color={_mode == "dark" ? "#E7E08B" : "#000000"}
        $order={1}
        src={sender_avatar_url}
        width={40}
        height={40}
        alt="user-avatar"
        sizes="(max-width: 1400px) 10vw"
      />
      <StyledMessage
        ref={target_ref}
        $show_double_tick={false}
        $content={created_at}
        $right={10}
        $border_radius="0px 20px 20px 20px"
        $border_color={_mode == "dark" ? "#E7E08B" : "#000000"}
        $order={2}
        $mode={_mode}
      >
        {conversation.message}
      </StyledMessage>
    </StyledMessageContent>
  );
});

export default ChatMessage;
