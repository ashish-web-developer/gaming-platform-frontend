import dynamic from "next/dynamic";

// types
import type { FC } from "react";
import type Colors from "@/types/data/colors";
import type { User } from "@/types/user";
import type { Conversation } from "@/types/store/slice/chat";

// mui
import { IconButton, useMediaQuery, useTheme } from "@mui/material";

// local components
import ChatSidebar from "@/components/chat/chat-sidebar";
import ChatWrapper from "@/components/chat/chat-wrapper";
const MobileBottomNav = dynamic(
  () => import("@/components/chat/mobile-navigation")
);

// styled components
import {
  StyledContainer,
  StyledChatContainer,
  StyledContainerItem,
  StyledChatWrapper,
  StyledChatInput,
  StyledSendIcon,
  StyledChatContainerName,
} from "@/styles/components/chat/chat-container.style";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import {
  // state
  active_user,
  is_submitting,
  chat_input_value,
  mobile_navigation,
  // actions
  sendMessage,
  updateChatInputValue,
  updateActiveUserConversation,
} from "@/store/slice/chat.slice";

import { user } from "@/store/slice/user.slice";

// hooks
import { usePrivateChannel } from "@/hooks/pusher";
import { useConversation, useGetDefaultUser } from "@/hooks/chat";

const ChatContainer: FC<{ colors: Colors }> = ({ colors }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useAppDispatch();
  const _user = useAppSelector(user);
  const _active_user = useAppSelector(active_user);
  const _mobile_navigation = useAppSelector(mobile_navigation);
  const _is_submitting = useAppSelector(is_submitting);
  const _chat_input_value = useAppSelector(chat_input_value);
  usePrivateChannel<{
    user: User;
    conversation: Conversation;
  }>(`chat.${_user.id}`, `ChatEvent`, function (data) {
    if (data.user.id == _active_user?.id) {
      dispatch(updateActiveUserConversation(data.conversation));
    }
  });
  useGetDefaultUser();
  useConversation();
  if (isMobile) {
    return (
      <>
        <StyledContainer>
          {_mobile_navigation == 1 && <ChatSidebar colors={colors} />}
          {_mobile_navigation == 0 && (
            <StyledChatWrapper>
              <ChatWrapper />
            </StyledChatWrapper>
          )}
        </StyledContainer>
        <MobileBottomNav />
      </>
    );
  }
  return (
    <>
      <StyledContainer>
        <StyledContainerItem $flexGrow={0} $flexBasis={"350px"}>
          <ChatSidebar colors={colors} />
        </StyledContainerItem>
        <StyledContainerItem $flexGrow={1} $flexBasis={"auto"}>
          {_active_user && (
            <StyledChatContainer>
              <StyledChatContainerName>
                {_active_user.name}
              </StyledChatContainerName>
              <StyledChatWrapper>
                <ChatWrapper />
              </StyledChatWrapper>
              <StyledChatInput
                value={_chat_input_value}
                onChange={(event) => {
                  dispatch(updateChatInputValue(event.target.value));
                }}
                onKeyDown={(event) => {
                  if (
                    (event.ctrlKey || event.metaKey) &&
                    event.key == "Enter"
                  ) {
                    dispatch(sendMessage());
                  }
                }}
                disableUnderline
                placeholder="Your Message"
                fullWidth
                endAdornment={
                  <IconButton
                    disabled={_is_submitting}
                    onClick={() => {
                      dispatch(sendMessage());
                    }}
                  >
                    <StyledSendIcon />
                  </IconButton>
                }
              />
            </StyledChatContainer>
          )}
        </StyledContainerItem>
      </StyledContainer>
    </>
  );
};

export default ChatContainer;
