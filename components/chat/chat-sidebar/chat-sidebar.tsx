import { useRef } from "react";
// types
import type { FC } from "react";

// styled components
import { StyledChatSidebar } from "@/styles/components/chat/chat-sidebar/chat-sidebar.style";

// local components
import ChatSearchInput from "@/components/chat/chat-sidebar/chat-search-input";
import ChatSearchResult from "@/components/chat/chat-sidebar/chat-search-result";
import ChatUsersList from "@/components/chat/chat-sidebar/chat-users-list/chat-users-list";
import ChatGroupList from "@/components/chat/chat-sidebar/chat-group-list/chat-group-list";

// redux
import { useAppSelector } from "@/hooks/redux.hook";
import { fetchedUserResult, fetchType } from "@/store/slice/chat.slice";

const ChatSidebar: FC = () => {
  const fetched_user_result = useAppSelector(fetchedUserResult);
  const fetch_type = useAppSelector(fetchType);
  const search_container_ref = useRef<HTMLDivElement>(null);
  const search_input_ref = useRef<HTMLInputElement>(null);
  return (
    <StyledChatSidebar>
      <ChatSearchInput
        ref={search_input_ref}
        search_container_ref={search_container_ref}
      />
      {!!fetched_user_result.length && fetch_type == "chat" && (
        <ChatSearchResult
          type="user_search"
          ref={search_input_ref}
          search_container_ref={search_container_ref}
        />
      )}
      <ChatGroupList />
      <ChatUsersList />
    </StyledChatSidebar>
  );
};

export default ChatSidebar;
