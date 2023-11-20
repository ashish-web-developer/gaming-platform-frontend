import dynamic from "next/dynamic";
// types
import type { FC } from "react";

// styled components
import { StyledChatSidebar } from "@/styles/components/chat/chat-sidebar/chat-sidebar.style";

// local components
import ChatSearchInput from "@/components/chat/chat-sidebar/chat-search-input";
const ChatSearchResult = dynamic(
  import("@/components/chat/chat-sidebar/chat-search-result"),
  {
    ssr: false,
  }
);

// redux
import { useAppSelector } from "@/hooks/redux";
import { fetched_user_result } from "@/store/slice/chat.slice";

const ChatSidebar: FC = () => {
  const _fetched_user_result = useAppSelector(fetched_user_result);
  return (
    <StyledChatSidebar>
      <ChatSearchInput />
      {_fetched_user_result.length && <ChatSearchResult />}
    </StyledChatSidebar>
  );
};

export default ChatSidebar;
