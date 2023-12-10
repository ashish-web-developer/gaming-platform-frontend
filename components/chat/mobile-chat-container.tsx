// types
import type { FC } from "react";

// styled components
import {
  StyledMobileChatContainer,
  StyledDivider,
} from "@/styles/components/chat/mobile-chat-container.style";

// local components
import MobileChatHeader from "@/components/chat/chat-header/mobile/mobile-chat-header";
import ChatUsersList from "@/components/chat/chat-sidebar/chat-users-list/chat-users-list";

// hooks
import { useDefaultUser } from "@/hooks/chat/chat.hook";

const MobileChatContainer: FC = () => {
  useDefaultUser();
  return (
    <StyledMobileChatContainer>
      <MobileChatHeader />
      <StyledDivider />
      <ChatUsersList />
    </StyledMobileChatContainer>
  );
};

export default MobileChatContainer;
