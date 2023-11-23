// types
import type { FC } from "react";
// styled components
import GlobalStyles from "@/styles/components/chat/chat-container.style";
import {
  StyledChatContainer,
  StyledChatMainContainer,
  StyledChatMainContentContainer,
  StyledChatMainContent,
  StyledMessageContainer,
  StyledMessageInputContainer,
} from "@/styles/components/chat/chat-container.style";

// local components
import ChatHeader from "@/components/chat/chat-header/chat-header";
import ChatSidebar from "@/components/chat/chat-sidebar/chat-sidebar";
import ChatMessageContainer from "@/components/chat/chat-message-container/chat-message-container";
import ChatInput from "@/components/chat/chat-input";

// hooks
import { useDefaultUser } from "@/hooks/chat/chat.hook";

const ChatContainer: FC = () => {
  useDefaultUser();
  return (
    <>
      <GlobalStyles />
      <StyledChatContainer>
        <ChatHeader />
        <StyledChatMainContainer>
          <ChatSidebar />
          <StyledChatMainContentContainer>
            <StyledChatMainContent>
              <StyledMessageContainer>
                <ChatMessageContainer />
              </StyledMessageContainer>
              <StyledMessageInputContainer>
                <ChatInput />
              </StyledMessageInputContainer>
            </StyledChatMainContent>
          </StyledChatMainContentContainer>
        </StyledChatMainContainer>
      </StyledChatContainer>
    </>
  );
};

export default ChatContainer;
