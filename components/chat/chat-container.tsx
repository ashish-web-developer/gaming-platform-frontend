import type { FC } from "react";

// styled components
import GlobalStyles from "@/styles/components/chat/chat-container.style";
import {
  StyledChatContainer,
  StyledChatMainContainer,
  StyledChatMainContentContainer,
} from "@/styles/components/chat/chat-container.style";

// local components
import ChatHeader from "@/components/chat/chat-header/chat-header";
import ChatSidebar from "@/components/chat/chat-sidebar/chat-sidebar";

const ChatContainer: FC = () => {
  return (
    <>
      <GlobalStyles />
      <StyledChatContainer>
        <ChatHeader />
        <StyledChatMainContainer>
          <ChatSidebar />
          <StyledChatMainContentContainer></StyledChatMainContentContainer>
        </StyledChatMainContainer>
      </StyledChatContainer>
    </>
  );
};

export default ChatContainer;
