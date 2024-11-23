import dynamic from "next/dynamic";
// types
import type { FC } from "react";
// styled components
import {
  StyledPage,
  StyledUploadModalWrapper,
  StyledBackdrop,
  StyledChatContainer,
  StyledChatMainContainer,
  StyledChatMainContentContainer,
  StyledMessageWrapper,
  StyledChatInputWrapper,
  StyledGroupSuggestionContainer,
} from "@/styles/components/chat/chat-container.style";

// local components
import ChatHeader from "@/components/chat/chat-header/chat-header";
import ChatSidebar from "@/components/chat/chat-sidebar/chat-sidebar";
import ChatMessageContainer from "@/components/chat/chat-message-container/chat-message-container";
import GroupSuggestion from "@/components/chat/group-suggestion/group-suggestion";
import ChatInput from "@/components/chat/chat-input/chat-input";

// theme
import { Theme } from "@/theme/poker.theme";
// theme provider
import { ThemeProvider } from "styled-components";

const PokerInviteDialog = dynamic(
  () => import("@/components/chat/invite-dialog/poker-invite-dialog"),
  {
    ssr: false,
  }
);

// redux
import { useAppSelector } from "@/hooks/redux.hook";
import {
  // state
  activeUser,
  showPokerInviteDialog,
} from "@/store/slice/chat.slice";
import { activeGroup } from "@/store/slice/group.slice";
import { mode, showProfileUploadModal } from "@/store/slice/common.slice";

const ChatContainer: FC = () => {
  const _mode = useAppSelector(mode);
  const active_user = useAppSelector(activeUser);
  const active_group = useAppSelector(activeGroup);
  const show_profile_upload_modal = useAppSelector(showProfileUploadModal);
  const show_poker_invite_dialog = useAppSelector(showPokerInviteDialog);
  return (
    <StyledPage $background_image={_mode == "light" ? true : false}>
      {show_poker_invite_dialog && (
        <ThemeProvider theme={Theme}>
          <PokerInviteDialog />
        </ThemeProvider>
      )}
      <StyledUploadModalWrapper
        $is_modal_open={show_profile_upload_modal}
        id="upload-profile-modal-container"
      >
        {show_profile_upload_modal && <StyledBackdrop />}
      </StyledUploadModalWrapper>
      <StyledChatContainer>
        <ChatHeader />
        <StyledChatMainContainer>
          <ChatSidebar />
          <StyledChatMainContentContainer $mode={_mode}>
            <StyledMessageWrapper>
              <ChatMessageContainer />
            </StyledMessageWrapper>
            {(active_group || active_user) && (
              <StyledChatInputWrapper>
                <ChatInput />
              </StyledChatInputWrapper>
            )}
          </StyledChatMainContentContainer>
          <StyledGroupSuggestionContainer>
            <GroupSuggestion />
          </StyledGroupSuggestionContainer>
        </StyledChatMainContainer>
      </StyledChatContainer>
    </StyledPage>
  );
};

export default ChatContainer;
