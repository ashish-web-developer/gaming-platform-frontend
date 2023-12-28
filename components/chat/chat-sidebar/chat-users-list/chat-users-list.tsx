// types
import type { FC } from "react";

// styled components
import { StyledUsersList } from "@/styles/components/chat/chat-sidebar/chat-users-list/chat-users-list.style";

// local components
import ChatUserProfile from "@/components/chat/chat-sidebar/chat-users-list/chat-user-profile";

// redux
import { useAppSelector } from "@/hooks/redux.hook";
import { default_users } from "@/store/slice/chat.slice";

const ChatUsersList: FC = () => {
  const _default_users = useAppSelector(default_users);
  return (
    <>
      <StyledUsersList>
        {_default_users.map((user) => {
          return (
            <ChatUserProfile key={`default-user-${user.id}`} user={user} />
          );
        })}
      </StyledUsersList>
    </>
  );
};

export default ChatUsersList;
