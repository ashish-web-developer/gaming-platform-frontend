import type { FC } from "react";

// styled components
import GlobalStyles from "@/styles/components/chat/chat-container.style";
import { StyledChatContainer } from "@/styles/components/chat/chat-container.style";

// local components
import ChatHeader from "@/components/chat/chat-header/chat-header";

const ChatContainer: FC = () => {
  return (
    <>
      <GlobalStyles />
      <StyledChatContainer>
        <ChatHeader />
      </StyledChatContainer>
    </>
  );
};

export default ChatContainer;
