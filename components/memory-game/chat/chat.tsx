import { useEffect } from "react";
// types
import type { FC } from "react";
import type CustomMemoryGameThemePalette from "@/types/theme/memory-game";
import type { User } from "@/types/user";
import type { Conversation } from "@/types/store/slice/chat";

// styled components
import {
  StyledChatContainer,
  StyledTopBackground,
  StyledCenteredBackground,
  StyledChatAvatar,
  StyledVersusContainer,
  StyledVersusImage,
  StyledVersusText,
  StyledChatContent,
  StyledChatContentContainer,
  StyledChatInputContainer,
  StyledChatInput,
  StyledSendIcon,
  StyledEmojiIcon,
  StyledChatsContainer,
  StyledChat,
  StyledEmojiPicker,
} from "@/styles/components/memory-game/chat/chat.style";

// theme
import { useTheme } from "styled-components";

// mui
import { IconButton } from "@mui/material";
// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { user } from "@/store/slice/user.slice";
import { gaming_user } from "@/store/slice/game.slice";
import {
  // state
  active_user,
  chat_input_value,
  sendMessage,
  is_submitting,
  active_user_conversation,
  // actions
  updateChatInputValue,
  updateActiveUser,
  updateActiveUserConversation,
} from "@/store/slice/chat.slice";
import { showEmoji, updateShowEmoji } from "@/store/slice/common.slice";
// hooks
import useAvatar from "@/hooks/profile";
import { useConversation } from "@/hooks/chat";
import { usePrivateChannel } from "@/hooks/pusher";

const Chat: FC = () => {
  const theme = useTheme() as CustomMemoryGameThemePalette;
  const dispatch = useAppDispatch();
  const _user = useAppSelector(user);
  const _active_user = useAppSelector(active_user);
  const _gaming_user = useAppSelector(gaming_user);
  const _chat_input_value = useAppSelector(chat_input_value);
  const _active_user_conversation = useAppSelector(active_user_conversation);
  const _is_submitting = useAppSelector(is_submitting);
  const _showEmoji = useAppSelector(showEmoji);
  const user_avatar = useAvatar(_user.username ?? "");
  const gaming_user_avatar = useAvatar(_gaming_user?.username ?? "");
  useConversation();
  usePrivateChannel(`chat.${_user.id}`, [
    {
      event: "ChatEvent",
      callback: (data: { user: User; conversation: Conversation }) => {
        if (data.user.id == _active_user?.id) {
          dispatch(updateActiveUserConversation(data.conversation));
        }
      },
    },
  ]);
  useEffect(() => {
    if (_gaming_user?.id) {
      dispatch(updateActiveUser(_gaming_user));
    }
  }, [_gaming_user]);
  return (
    <StyledChatContainer>
      <StyledEmojiPicker
        callback={(data) => {
          dispatch(updateChatInputValue(`${_chat_input_value} ${data.native}`));
        }}
      />
      <StyledTopBackground>
        <StyledChatAvatar dangerouslySetInnerHTML={{ __html: user_avatar }} />
        <StyledVersusContainer>
          <StyledVersusText>
            {_user.name?.split(" ")[0]}{" "}
            <span style={{ color: theme.palette.secondary.red }}>v/s</span>{" "}
            {_gaming_user?.name?.split(" ")[0]}
          </StyledVersusText>
          <StyledVersusImage
            width={40}
            height={40}
            alt="chips"
            src="/memory-game/start-banner/versus-container/chips.png"
          />
        </StyledVersusContainer>
      </StyledTopBackground>
      <StyledCenteredBackground />
      <StyledChatContent>
        <StyledChatContentContainer>
          {_active_user_conversation.map(({ sender_id, message }) => {
            return (
              <StyledChatsContainer
                $justifyContent={
                  _user.id == sender_id ? "flex-end" : "flex-start"
                }
              >
                <StyledChatAvatar
                  dangerouslySetInnerHTML={{
                    __html:
                      _user.id == sender_id ? user_avatar : gaming_user_avatar,
                  }}
                  $order={_user.id == sender_id ? 2 : 1}
                />
                <StyledChat
                  $backgroundColor={
                    _user.id == sender_id ? "#329F5B" : "#FF934F"
                  }
                  $borderRadius={
                    _user.id == sender_id
                      ? "10px 0px 10px 10px;"
                      : "0px 10px 10px 10px"
                  }
                  $order={_user.id == sender_id ? 1 : 2}
                >
                  {message}
                </StyledChat>
              </StyledChatsContainer>
            );
          })}
        </StyledChatContentContainer>
        <StyledChatInputContainer>
          <StyledChatInput
            value={_chat_input_value}
            onChange={(event) =>
              dispatch(updateChatInputValue(event.target.value))
            }
            onKeyDown={(event) => {
              if ((event.ctrlKey || event.metaKey) && event.key == "Enter") {
                dispatch(sendMessage());
              }
            }}
            fullWidth={true}
            disableUnderline={true}
            placeholder="Write Here"
            endAdornment={
              <>
                <IconButton
                  disabled={_is_submitting}
                  onClick={() => dispatch(sendMessage())}
                >
                  <StyledSendIcon />
                </IconButton>
              </>
            }
          />
          <IconButton
            onClick={() => {
              dispatch(updateShowEmoji(!_showEmoji));
            }}
          >
            <StyledEmojiIcon />
          </IconButton>
        </StyledChatInputContainer>
      </StyledChatContent>
    </StyledChatContainer>
  );
};

export default Chat;
