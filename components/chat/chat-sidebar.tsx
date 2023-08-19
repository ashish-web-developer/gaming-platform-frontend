// types
import type { FC } from "react";
import type { User } from "@/types/user";

// Local components
import Profile from "@/components/chat/profile";
import ChatSearchbar from "@/components/chat/chat-searchbar";

// styled components
import {
  StyledSidebarContainer,
  StyledSideBarSearchContainer,
  StyledProfileContainer,
} from "@/styles/components/chat/chat-sidebar.style";

// styled theme
import { useTheme } from "styled-components";

// Redux
import { useAppSelector } from "@/hooks/redux";
import { users as default_users } from "@/store/slice/chat.slice";

const ChatSidebar: FC<{ users: User[] }> = ({ users }) => {
  const theme = useTheme();
  const _default_users = useAppSelector(default_users);
  return (
    <StyledSidebarContainer>
      <StyledSideBarSearchContainer>
        <ChatSearchbar />
      </StyledSideBarSearchContainer>
      <StyledProfileContainer>
        {(users.length < _default_users.length ? _default_users : users).map(
          (user, index) => {
            return (
              <Profile
                key={index}
                user={user}
                width={60}
                height={60}
                backgroundColor={theme.palette.primary.main}
                disableElevation={true}
              />
            );
          }
        )}
      </StyledProfileContainer>
    </StyledSidebarContainer>
  );
};

export default ChatSidebar;
