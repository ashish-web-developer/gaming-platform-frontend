// types
import type { FC } from "react";
import type { Theme } from "@/theme/chat.theme";
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
import ChatInput from "@/components/chat/chat-input/chat-input";
import GroupSuggestion from "@/components/chat/group-suggestion/group-suggestion";

// redux
import { useAppSelector } from "@/hooks/redux.hook";
import {
  // state
  active_user,
} from "@/store/slice/chat.slice";
import { active_group } from "@/store/slice/group.slice";
import { mode, show_profile_upload_modal } from "@/store/slice/common.slice";

const ChatContainer: FC = () => {
  const _mode = useAppSelector(mode);
  const _active_user = useAppSelector(active_user);
  const _active_group = useAppSelector(active_group);
  const _show_profile_upload_modal = useAppSelector(show_profile_upload_modal);
  return (
    <StyledPage $background_image={_mode == "light" ? true : false}>
      <StyledUploadModalWrapper
        $is_modal_open={_show_profile_upload_modal}
        id="upload-profile-modal-container"
      >
        {_show_profile_upload_modal && <StyledBackdrop />}
      </StyledUploadModalWrapper>
      <StyledChatContainer>
        <ChatHeader />
        <StyledChatMainContainer>
          <ChatSidebar />
          <StyledChatMainContentContainer $mode={_mode}>
            <StyledMessageWrapper>
              <ChatMessageContainer />
            </StyledMessageWrapper>
            {(_active_group || _active_user) && (
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
