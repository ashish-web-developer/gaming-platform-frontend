import dynamic from "next/dynamic";
import { useState } from "react";
// types
import type { FC } from "react";
import type { IUser } from "@/types/store/slice/login";

// theme
import { Theme } from "@/theme/poker.theme";

// theme provider
import { ThemeProvider } from "styled-components";

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
  StyledInviteDialogWrapper,
} from "@/styles/components/chat/mobile-chat-container.style";

// local components
import MobileChatHeader from "@/components/chat/chat-header/mobile/mobile-chat-header";
import MobileActionNav from "@/components/chat/mobile-action-nav";
import ChatUserProfile from "@/components/chat/chat-sidebar/chat-users-list/chat-user-profile";
import PokerInviteDialog from "@/components/chat/invite-dialog/poker-invite-dialog";

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

const MobileUserProfile = dynamic(
  () => import("@/components/common/user-profile/mobile/mobile-user-profile"),
  {
    ssr: false,
  }
);

const NotificationModal = dynamic(
  () => import("@/components/common/notification-modal/notification-modal"),
  {
    ssr: false,
  }
);

const CogniMatchInviteDialog = dynamic(
  () => import("@/components/chat/invite-dialog/cognimatch-invite-dialog"),
  {
    ssr: false,
  }
);

// redux
import { useAppSelector } from "@/hooks/redux.hook";
import {
  showChat,
  defaultUsers,
  showCognimatchInviteDialog,
  showPokerInviteDialog,
} from "@/store/slice/chat.slice";
import { activeGroup, defaultGroups } from "@/store/slice/group.slice";
import {
  mode,
  showMobileProfile,
  showNotificationModal,
} from "@/store/slice/common.slice";

// hooks
import { useIsMobile } from "@/hooks/common.hook";

const MobileChatContainer: FC = () => {
  const _mode = useAppSelector(mode);
  const [active_tab, set_active_tab] = useState<1 | 2>(1);
  const default_user = useAppSelector(defaultUsers);
  const default_groups = useAppSelector(defaultGroups);
  const active_group = useAppSelector(activeGroup);
  const show_chat = useAppSelector(showChat);
  const show_mobile_profile = useAppSelector(showMobileProfile);
  const show_notification_modal = useAppSelector(showNotificationModal);
  const show_cognimatch_invite_dialog = useAppSelector(
    showCognimatchInviteDialog
  );
  const show_poker_invite_dialog = useAppSelector(showPokerInviteDialog);
  const is_mobile = useIsMobile();

  return (
    <StyledMobileChatContainer $mode={_mode}>
      {show_poker_invite_dialog && (
        <ThemeProvider theme={Theme}>
          <PokerInviteDialog />
        </ThemeProvider>
      )}

      {show_cognimatch_invite_dialog && (
        <StyledInviteDialogWrapper>
          <CogniMatchInviteDialog />
        </StyledInviteDialogWrapper>
      )}

      {show_mobile_profile && <MobileUserProfile />}
      {show_notification_modal && <NotificationModal is_mobile={is_mobile} />}
      <div id="chat-search-container"></div>
      <MobileActionNav active_tab={active_tab} />
      <MobileChatHeader />
      {!show_chat && (
        <>
          <StyledTabWrapper>
            <StyledTabCta
              $mode={_mode}
              $active={active_tab == 1}
              onClick={() => {
                set_active_tab(1);
              }}
            >
              Recent
            </StyledTabCta>
            <StyledTabCta
              $mode={_mode}
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
                default_user.map((user) => {
                  return (
                    <ChatUserProfile
                      key={`default-user-${user.id}`}
                      user={user}
                    />
                  );
                })}
              {active_tab == 2 &&
                default_groups.map((group, index) => {
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
      {show_chat && (
        <>
          {active_group && (
            <StyledGroupAvatarWrapper>
              <StyledSpan>Members</StyledSpan>
              <StyledGroupAvatar>
                {active_group.user_group
                  .slice(0, 4)
                  .map((user_group, index) => {
                    return (
                      <ChatAvatar
                        key={`chat-avatar-${index}`}
                        left_count={
                          active_group.user_group.length > 4
                            ? active_group.user_group.length - 3
                            : 0
                        }
                        user={user_group.user as IUser}
                      />
                    );
                  })}
              </StyledGroupAvatar>
            </StyledGroupAvatarWrapper>
          )}

          <StyledMessageWrapper type={active_group ? "group" : "chat"}>
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
