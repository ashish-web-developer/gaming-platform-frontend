// local components
import ChatMessage from "./chat-message";

// mui
import { Stack } from "@mui/material";

// styled components
import { StyledChatWrapper } from "@/styles/components/chat/chat-wrapper.style";

// redux
import { useAppSelector } from "@/hooks/redux";
import {
  active_user_conversation,
  active_user,
} from "@/store/slice/chat.slice";
import { user } from "@/store/slice/user.slice";

// helpers
import { readableFormatDate } from "@/helpers/common";

// helpers package
import { v4 as uuidv4 } from "uuid";

const ChatWrapper = () => {
  const _user = useAppSelector(user);
  const _active_user = useAppSelector(active_user);
  const _active_user_conversation = useAppSelector(active_user_conversation);
  return (
    <StyledChatWrapper>
      {_active_user_conversation.map((conversation) => {
        return (
          <ChatMessage
            align={
              conversation.sender_id == _user.id ? "flex-end" : "flex-start"
            }
            username={
              conversation.sender_id == _user.id
                ? _user.name
                : _active_user?.name
            }
            key={uuidv4()}
            message={conversation.message}
            date={readableFormatDate(conversation.created_at)}
          />
        );
      })}
    </StyledChatWrapper>
  );
};

export default ChatWrapper;
