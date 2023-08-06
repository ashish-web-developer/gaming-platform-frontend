// local components
import ChatMessage from "./chat-message";

// mui
import { Stack } from "@mui/material";

// styled components
import { StyledChatWrapper } from "@/styles/components/chat/chat-wrapper.style";

// redux
import { useAppSelector } from "@/hooks/redux";
import { active_user_conversation } from "@/store/slice/chat.slice";

const ChatWrapper = () => {
  const _active_user_conversation = useAppSelector(active_user_conversation);
  console.log(_active_user_conversation);
  return (
    <StyledChatWrapper>
      <Stack spacing={2}>
        {_active_user_conversation.map((conversation) => {
          return <ChatMessage message={conversation.message} />;
        })}
      </Stack>
    </StyledChatWrapper>
  );
};

export default ChatWrapper;
