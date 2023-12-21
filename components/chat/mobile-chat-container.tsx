// types
import type { FC } from "react";

// styled components
import {
  StyledMobileChatContainer,
  StyledDivider,
  StyledMainContainer
} from "@/styles/components/chat/mobile-chat-container.style";

// local components
import MobileChatHeader from "@/components/chat/chat-header/mobile/mobile-chat-header";
import ChatUsersList from "@/components/chat/chat-sidebar/chat-users-list/chat-users-list";
import MobileChatMessageContainer from "@/components/chat/chat-message-container/mobile/mobile-chat-message-container";
import MobileChatInput from "@/components/chat/chat-input/mobile/mobile-chat-input";

// redux
import { useAppSelector } from "@/hooks/redux";
import { show_chat } from "@/store/slice/chat.slice";

// hooks
import { useDefaultUser } from "@/hooks/chat/chat.hook";

const MobileChatContainer: FC = () => {
  const _show_chat = useAppSelector(show_chat);
  useDefaultUser();
  return (
    <StyledMobileChatContainer>
      <div id="search-dialog-container"></div>
      <MobileChatHeader />
      {!_show_chat && (
        <>
          <StyledDivider />
          <ChatUsersList />
        </>
      )}
      {
        _show_chat && (
          <StyledMainContainer>
            <MobileChatMessageContainer/>
            <MobileChatInput/>
          </StyledMainContainer>
        )
      }
    </StyledMobileChatContainer>
  );
};

export default MobileChatContainer;
