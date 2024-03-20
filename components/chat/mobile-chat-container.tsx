import { useState } from "react";
// types
import type { FC } from "react";

// local components
import {
  StyledMobileChatContainer,
  StyledTabWrapper,
  StyledTabCta,
  StyledMainContent,
  StyledUserList,
} from "@/styles/components/chat/mobile-chat-container.style";

// local components
import MobileChatHeader from "@/components/chat/chat-header/mobile/mobile-chat-header";
import MobileActionNav from "@/components/chat/mobile-action-nav";
import ChatUserProfile from "@/components/chat/chat-sidebar/chat-users-list/chat-user-profile";
import ChatGroup from "@/components/chat/chat-sidebar/chat-group-list/chat-group";

// redux
import { useAppSelector } from "@/hooks/redux.hook";
import { default_users } from "@/store/slice/chat.slice";
import { default_groups } from "@/store/slice/group.slice";

const MobileChatContainer: FC = () => {
  const [active_tab, set_active_tab] = useState<1 | 2>(1);
  const _default_users = useAppSelector(default_users);
  const _default_groups = useAppSelector(default_groups);
  return (
    <StyledMobileChatContainer>
      <MobileActionNav />
      <MobileChatHeader />
      <StyledTabWrapper>
        <StyledTabCta
          $active={active_tab == 1}
          onClick={() => {
            set_active_tab(1);
          }}
        >
          Recent
        </StyledTabCta>
        <StyledTabCta
          $active={active_tab == 2}
          onClick={() => {
            set_active_tab(2);
          }}
        >
          Group Chat
        </StyledTabCta>
      </StyledTabWrapper>

      <StyledMainContent>
        <StyledUserList>
          {active_tab == 1 &&
            _default_users.map((user) => {
              return (
                <ChatUserProfile key={`default-user-${user.id}`} user={user} />
              );
            })}
          {active_tab == 2 &&
            _default_groups.map((group, index) => {
              return (
                <ChatGroup
                  is_clickable={true}
                  key={`chat-group-${index}`}
                  {...group}
                />
              );
            })}
        </StyledUserList>
      </StyledMainContent>
    </StyledMobileChatContainer>
  );
};

export default MobileChatContainer;
