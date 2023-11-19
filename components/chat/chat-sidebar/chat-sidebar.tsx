// types
import type { FC } from "react";

// styled components
import { StyledChatSidebar } from "@/styles/components/chat/chat-sidebar/chat-sidebar.style";

// local components
import ChatSearchInput from "@/components/chat/chat-sidebar/chat-search-input";

const ChatSidebar: FC = () => {
  return (
    <StyledChatSidebar>
      <ChatSearchInput />
    </StyledChatSidebar>
  );
};

export default ChatSidebar;
