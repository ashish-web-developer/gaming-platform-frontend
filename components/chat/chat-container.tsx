import { useEffect } from "react";
// types
import type { FC } from "react";
// styled components
import GlobalStyles from "@/styles/components/chat/chat-container.style";
import {
  StyledChatContainer,
  StyledChatMainContainer,
  StyledChatMainContentContainer,
  StyledChatMainContent,
} from "@/styles/components/chat/chat-container.style";

// local components
import ChatHeader from "@/components/chat/chat-header/chat-header";
import ChatSidebar from "@/components/chat/chat-sidebar/chat-sidebar";

// redux
import { useAppDispatch } from "@/hooks/redux";
import { fetchDefaultUser } from "@/store/slice/chat.slice";

const ChatContainer: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchDefaultUser());
  }, []);
  return (
    <>
      <GlobalStyles />
      <StyledChatContainer>
        <ChatHeader />
        <StyledChatMainContainer>
          <ChatSidebar />
          <StyledChatMainContentContainer>
            <StyledChatMainContent></StyledChatMainContent>
          </StyledChatMainContentContainer>
        </StyledChatMainContainer>
      </StyledChatContainer>
    </>
  );
};

export default ChatContainer;
