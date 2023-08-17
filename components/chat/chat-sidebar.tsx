// types
import type { FC } from "react";

// Local components
import Profile from "@/components/chat/profile";
import ChatSearchbar from "@/components/chat/chat-searchbar";

// styled components
import {
  StyledSidebarContainer,
  StyledProfileContainer,
} from "@/styles/components/chat/chat-sidebar.style";

// helpers

import { v4 as uuidv4 } from "uuid";

// Redux
import { useAppSelector } from "@/hooks/redux";
import { users } from "@/store/slice/chat.slice";

const ChatSidebar: FC = () => {
  const _users = useAppSelector(users);
  return (
    <StyledSidebarContainer>
      <ChatSearchbar />
      <StyledProfileContainer>
        {_users.map((user) => {
          return (
            <Profile
              key={uuidv4()}
              user={user}
              width={60}
              height={60}
              backgroundColor="#212328"
              disableElevation={true}
            />
          );
        })}
      </StyledProfileContainer>
    </StyledSidebarContainer>
  );
};

export default ChatSidebar;
