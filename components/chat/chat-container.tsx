import dynamic from "next/dynamic";

// types
import type { FC } from "react";
import type Colors from "@/types/data/colors";
import type { User } from "@/types/user";
import type { Conversation } from "@/types/store/slice/chat";

// mui
import { Grid, IconButton } from "@mui/material";

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
  StyledChatWrapper,
  StyledChatInput,
  StyledSendIcon,
  StyledChatContainerName,
} from "@/styles/components/chat/chat-container.style";

// react device detect
import { isMobile } from "react-device-detect";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import {
  // state
  active_user,
  is_submitting,
  chat_input_value,
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
  const dispatch = useAppDispatch();
  const _user = useAppSelector(user);
  const _active_user = useAppSelector(active_user);
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
  return (
    <>
      {isMobile ? (
        <>
          <MobileBottomNav />
        </>
      ) : (
        <StyledContainer>
          <Grid sx={{ height: "100%" }} container spacing={2}>
            <Grid sx={{ height: "100%" }} item xs={12} sm={3.5}>
              <ChatSidebar colors={colors} />
            </Grid>
            <Grid item xs={12} sm={6.5}>
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
            </Grid>
          </Grid>
        </StyledContainer>
      )}
    </>
  );
};

export default ChatContainer;
