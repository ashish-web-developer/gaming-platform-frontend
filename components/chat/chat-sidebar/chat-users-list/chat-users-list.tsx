// types
import type { FC } from "react";

// styled components
import { StyledUsersList } from "@/styles/components/chat/chat-sidebar/chat-users-list/chat-users-list.style";

// local components
import ChatUserProfile from "@/components/chat/chat-sidebar/chat-users-list/chat-user-profile";

// redux
import { useAppSelector } from "@/hooks/redux";
import { default_users } from "@/store/slice/chat.slice";

const ChatUsersList: FC = () => {
  const _default_users = useAppSelector(default_users);
  return (
    <StyledUsersList>
      {_default_users.map(
        ({ id, name, username, sent_messages, received_messages }) => {
          return (
            <ChatUserProfile
              key={`default-user-${id}`}
              name={name}
              username={username}
              sent_messsages={sent_messages}
              received_messages={received_messages}
            />
          );
        }
      )}
    </StyledUsersList>
  );
};

export default ChatUsersList;
