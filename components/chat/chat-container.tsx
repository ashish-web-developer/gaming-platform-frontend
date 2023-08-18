import dynamic from "next/dynamic";

// types
import type { FC } from "react";
import type { User } from "@/types/user";
import type { Conversation } from "@/types/store/slice/chat";

// mui
import { IconButton } from "@mui/material";

// local components
import ChatSidebar from "@/components/chat/chat-sidebar";
import ChatWrapper from "@/components/chat/chat-wrapper";
const MobileChat = dynamic(()=>import("@/components/chat/mobile/mobile-chat"),{
  ssr:true
})

// styled components
import {
  // components
  StyledContainer,
  StyledChatContainer,
  StyledContainerItem,
  StyledChatWrapper,
  StyledChatInput,
  StyledChatContainerName,
  StyledEmojiPicker,
  // icons
  StyledEmojiIcon,
  StyledSendIcon,
} from "@/styles/components/chat/chat-container.style";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import {
  // state
  active_user,
  is_submitting,
  chat_input_value,
  show_chat,
  // actions
  sendMessage,
  updateChatInputValue,
  updateActiveUserConversation,
} from "@/store/slice/chat.slice";

import { user } from "@/store/slice/user.slice";
import { showEmoji, updateShowEmoji } from "@/store/slice/common.slice";

// hooks
import { usePrivateChannel } from "@/hooks/pusher";
import { useConversation } from "@/hooks/chat";

// helpers package

const ChatContainer: FC<{
  users: User[];
  isMobile: boolean;
}> = ({ users, isMobile }) => {
  const dispatch = useAppDispatch();
  const _user = useAppSelector(user);
  const _active_user = useAppSelector(active_user);
  const _is_submitting = useAppSelector(is_submitting);
  const _chat_input_value = useAppSelector(chat_input_value);
  const _showEmoji = useAppSelector(showEmoji);
  const _show_chat = useAppSelector(show_chat);
  usePrivateChannel<{
    user: User;
    conversation: Conversation;
  }>(`chat.${_user.id}`, `ChatEvent`, function (data) {
    if (data.user.id == _active_user?.id) {
      dispatch(updateActiveUserConversation(data.conversation));
    }
  });
  useConversation();
  if (isMobile) {
    return (
      <>
      <MobileChat users = {users}/>
      </>
    );
  }
  return (
    <>
      <StyledContainer>
        <StyledContainerItem $flexGrow={0} $flexBasis={"350px"}>
          <ChatSidebar />
        </StyledContainerItem>
        <StyledContainerItem $flexGrow={1} $flexBasis={"auto"}>
          <StyledEmojiPicker
            callback={(data) => {
              dispatch(
                updateChatInputValue(`${_chat_input_value} ${data.native}`)
              );
            }}
          />
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
                startAdornment={
                  <IconButton
                    onClick={() => {
                      dispatch(updateShowEmoji(!_showEmoji));
                    }}
                  >
                    <StyledEmojiIcon />
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
