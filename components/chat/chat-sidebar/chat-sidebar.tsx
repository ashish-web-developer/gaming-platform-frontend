// types
import type { FC } from "react";

// styled components
import { StyledChatSidebar } from "@/styles/components/chat/chat-sidebar/chat-sidebar.style";

// local components
import ChatSearchInput from "@/components/chat/chat-sidebar/chat-search-input";
import ChatSearchResult from "@/components/chat/chat-sidebar/chat-search-result";

const ChatSidebar: FC = () => {
  return (
    <StyledChatSidebar>
      <ChatSearchInput />
      <ChatSearchResult />
    </StyledChatSidebar>
  );
};

export default ChatSidebar;
