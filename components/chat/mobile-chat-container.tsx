import dynamic from "next/dynamic";
import { useState } from "react";
// types
import type { FC } from "react";
import type { IUsersWithConversation } from "@/types/store/slice/chat";

// local components
import {
  StyledMobileChatContainer,
  StyledTabWrapper,
  StyledTabCta,
  StyledMainContent,
  StyledUserList,
  StyledMessageWrapper,
  StyledChatInputWrapper,
  StyledGroupAvatarWrapper,
  StyledSpan,
  StyledGroupAvatar,
} from "@/styles/components/chat/mobile-chat-container.style";

// local components
import MobileChatHeader from "@/components/chat/chat-header/mobile/mobile-chat-header";
import MobileActionNav from "@/components/chat/mobile-action-nav";
import ChatUserProfile from "@/components/chat/chat-sidebar/chat-users-list/chat-user-profile";

const ChatAvatar = dynamic(
  () => import("@/components/chat/chat-sidebar/chat-group-list/chat-avatar"),
  {
    ssr: false,
  }
);
const ChatGroup = dynamic(
  () => import("@/components/chat/chat-sidebar/chat-group-list/chat-group"),
  {
    ssr: false,
  }
);

const ChatMessageContainer = dynamic(
  () =>
    import("@/components/chat/chat-message-container/chat-message-container"),
  {
    ssr: false,
  }
);

const ChatInput = dynamic(
  () => import("@/components/chat/chat-input/chat-input"),
  {
    ssr: false,
  }
);

const ChatProfile = dynamic(
  () => import("@/components/common/user-profile/user-profile"),
  {
    ssr: false,
  }
);

// redux
import { useAppSelector } from "@/hooks/redux.hook";
import { show_chat, default_users } from "@/store/slice/chat.slice";
import { active_group, default_groups } from "@/store/slice/group.slice";
import { show_mobile_profile } from "@/store/slice/common.slice";

const MobileChatContainer: FC = () => {
  const [active_tab, set_active_tab] = useState<1 | 2>(1);
  const _default_users = useAppSelector(default_users);
  const _default_groups = useAppSelector(default_groups);
  const _active_group = useAppSelector(active_group);
  const _show_chat = useAppSelector(show_chat);
  const _show_mobile_profile = useAppSelector(show_mobile_profile);

  return (
    <StyledMobileChatContainer>
      {_show_mobile_profile && <ChatProfile />}
      <div id="chat-search-container"></div>
      <MobileActionNav active_tab={active_tab} />
      <MobileChatHeader />
      {!_show_chat && (
        <>
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
                    <ChatUserProfile
                      key={`default-user-${user.id}`}
                      user={user}
                    />
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
        </>
      )}
      {_show_chat && (
        <>
          {_active_group && (
            <StyledGroupAvatarWrapper>
              <StyledSpan>Members</StyledSpan>
              <StyledGroupAvatar>
                {_active_group.user_group
                  .slice(0, 4)
                  .map((user_group, index) => {
                    return (
                      <ChatAvatar
                        key={`chat-avatar-${index}`}
                        left_count={
                          _active_group.user_group.length > 4
                            ? _active_group.user_group.length - 3
                            : 0
                        }
                        user={user_group.user as IUsersWithConversation}
                      />
                    );
                  })}
              </StyledGroupAvatar>
            </StyledGroupAvatarWrapper>
          )}

          <StyledMessageWrapper type={_active_group ? "group" : "chat"}>
            <ChatMessageContainer />
          </StyledMessageWrapper>
          <StyledChatInputWrapper>
            <ChatInput />
          </StyledChatInputWrapper>
        </>
      )}
    </StyledMobileChatContainer>
  );
};

export default MobileChatContainer;
