import { useRef } from "react";
// types
import type { FC } from "react";
import type { IUsersWithConversation } from "@/types/store/slice/chat";

// styled components
import { StyledMobileChatMessageContainer } from "@/styles/components/chat/chat-message-container/mobile/mobile-chat-message-container.style";

// local components
import ChatMessage from "@/components/chat/chat-message-container/chat-message";

// redux
import { useAppSelector } from "@/hooks/redux.hook";
import { user } from "@/store/slice/user.slice";
import {
  active_user,
  active_user_conversation,
  show_memory_game_snackbar,
} from "@/store/slice/chat.slice";

const MobileChatMessageContainer: FC = () => {
  const _active_user_conversation = useAppSelector(active_user_conversation);
  const _active_user = useAppSelector(active_user) as IUsersWithConversation;
  const _show_memory_game_snackbar = useAppSelector(show_memory_game_snackbar);
  const _user = useAppSelector(user);
  const root_ref = useRef<HTMLDivElement>(null);
  return (
    <StyledMobileChatMessageContainer
      $show_memory_game={_show_memory_game_snackbar}
      ref={root_ref}
    >
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
