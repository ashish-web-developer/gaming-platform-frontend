// types
import type { FC } from "react";

// styled components
import {
  StyledUsersListWrapper,
  StyledTag,
  StyledUserList,
} from "@/styles/components/chat/chat-sidebar/chat-users-list/chat-users-list.style";

// local components
import ChatUserProfile from "@/components/chat/chat-sidebar/chat-users-list/chat-user-profile";

// redux
import { useAppSelector } from "@/hooks/redux.hook";
import { defaultUsers } from "@/store/slice/chat.slice";

const ChatUsersList: FC = () => {
  const default_users = useAppSelector(defaultUsers);
  return (
    <>
      <StyledUsersListWrapper>
        <StyledTag>Recent Chat</StyledTag>
        <StyledUserList>
          {default_users.map((user) => {
            return (
              <ChatUserProfile key={`default-user-${user.id}`} user={user} />
            );
          })}
        </StyledUserList>
      </StyledUsersListWrapper>
    </>
  );
};

export default ChatUsersList;
