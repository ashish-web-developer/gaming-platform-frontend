import dynamic from "next/dynamic";
import { useRef } from "react";
// types
import type { FC } from "react";

// styled components
import { StyledChatSidebar } from "@/styles/components/chat/chat-sidebar/chat-sidebar.style";

// local components
import ChatSearchInput from "@/components/chat/chat-sidebar/chat-search-input";
import ChatSearchResult from "@/components/chat/chat-sidebar/chat-search-result";
import ChatUsersList from "@/components/chat/chat-sidebar/chat-users-list/chat-users-list";

// redux
import { useAppSelector } from "@/hooks/redux";
import { fetched_user_result } from "@/store/slice/chat.slice";

const ChatSidebar: FC = () => {
  const _fetched_user_result = useAppSelector(fetched_user_result);
  const search_input_ref = useRef<HTMLDivElement>(null);
  return (
    <StyledChatSidebar>
      <ChatSearchInput ref={search_input_ref} />
      {!!_fetched_user_result.length && (
        <ChatSearchResult ref={search_input_ref} />
      )}
      <ChatUsersList />
    </StyledChatSidebar>
  );
};

export default ChatSidebar;
