// types
import type { FC } from "react";
import type {
  IUsersWithConversation,
  IConversation,
} from "@/types/store/slice/chat";
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

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import {
  active_user,
  updateActiveUserConversation,
  updateDefaultUserConversation,
  updateConversationView,
} from "@/store/slice/chat.slice";
import { user } from "@/store/slice/user.slice";

// hooks
import { useDefaultUser } from "@/hooks/chat/chat.hook";
import { usePrivateChannel } from "@/hooks/pusher";

const ChatContainer: FC = () => {
  const dispatch = useAppDispatch();
  const _user = useAppSelector(user);
  const _active_user = useAppSelector(active_user);
  useDefaultUser();
  usePrivateChannel(`chat.${_user.id}`, [
    {
      event: "ChatEvent",
      callback: (data: {
        user: IUsersWithConversation;
        conversation: IConversation;
      }) => {
        dispatch(updateDefaultUserConversation(data.conversation));
        if (data.user.id == _active_user?.id) {
          dispatch(updateActiveUserConversation(data.conversation));
        }
      },
    },
    {
      event: "ChatViewEvent",
      callback: (data: {
        user: IUsersWithConversation;
        conversation: IConversation;
      }) => {
        if (data.user.id == _active_user?.id) {
          dispatch(updateConversationView(data.conversation));
        }
      },
    },
  ]);
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
