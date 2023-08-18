import { useRef, useEffect } from "react";
// styled components
import {
  // components
  StyledChatContainer,
  StyledChatWrapper,
  StyledAvatar,
  StyledChat,
  StyledChatInputContainer,
  StyledInput,
  StyledEmojiPicker,
  // icons
  StyledAudioIcon,
  StyledAudioPlayingIcon,
  StyledEmojiIcon,
  StyledSendIcon,
} from "@/styles/components/chat/mobile/mobile-chat-container.style";

// local components
import ChatAvatar from "@/components/chat/chat-avatar";
// mui
import { IconButton } from "@mui/material";

// styled theme
import { useTheme } from "styled-components";
// redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  // state
  chat_input_value,
  is_submitting,
  is_audio_playing,
  active_user_conversation,
  active_user,
  // actions
  updateChatInputValue,
  sendMessage,
  updateIsAudioPlaying,
} from "@/store/slice/chat.slice";
import { showEmoji, updateShowEmoji } from "@/store/slice/common.slice";
import useSpeechRecognition from "@/hooks/speech-recognition";
import { user } from "@/store/slice/user.slice";

const MobileChatContainer = () => {
  const recognition = useSpeechRecognition((event) => {
    console.log("value of event", event.results[0]);
  });
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const _showEmoji = useAppSelector(showEmoji);
  const _chat_input_value = useAppSelector(chat_input_value);
  const _user = useAppSelector(user);
  const _active_user = useAppSelector(active_user);
  const _active_user_conversation = useAppSelector(active_user_conversation);
  const _is_submitting = useAppSelector(is_submitting);
  const _is_audio_playing = useAppSelector(is_audio_playing);

  useEffect(() => {
    chatContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [_active_user_conversation.length]);

  return (
    <>
      <StyledEmojiPicker
        callback={(data) => {
          dispatch(updateChatInputValue(`${_chat_input_value} ${data.native}`));
        }}
      />
      <StyledChatContainer ref={chatContainerRef}>
        {_active_user_conversation.map((conversation, index) => {
          return (
            <StyledChatWrapper
              key={index}
              $alignSelf={
                _user.id == conversation.sender_id ? "flex-end" : "flex-start"
              }
              $flexDirection={
                _user.id == conversation.sender_id ? "row" : "row-reverse"
              }
            >
              <StyledChat
                $backgroundColor={
                  _user.id == conversation.sender_id
                    ? theme.palette.chat.main
                    : theme.palette.chat.light
                }
                $borderRadius={
                  _user.id == conversation.sender_id
                    ? "10px 10px 0px 10px"
                    : "10px  10px 10px 0px"
                }
                $flexBasis="1"
              >
                {conversation.message}
              </StyledChat>
              <StyledAvatar $flexBasis="50">
                <ChatAvatar
                  width={30}
                  height={30}
                  username={
                    _user.id == conversation.sender_id
                      ? (_user.username as string)
                      : (_active_user?.username as string)
                  }
                />
              </StyledAvatar>
            </StyledChatWrapper>
          );
        })}
      </StyledChatContainer>
      <StyledChatInputContainer>
        <IconButton
          onClick={() => {
            if (_is_audio_playing) {
              recognition?.stop();
              dispatch(updateIsAudioPlaying(false));
            } else {
              recognition?.start();
              dispatch(updateIsAudioPlaying(true));
            }
          }}
        >
          {_is_audio_playing ? <StyledAudioPlayingIcon /> : <StyledAudioIcon />}
        </IconButton>
        <IconButton
          onClick={() => {
            dispatch(updateShowEmoji(!_showEmoji));
          }}
        >
          <StyledEmojiIcon />
        </IconButton>
        <StyledInput
          value={_chat_input_value}
          disableUnderline={true}
          placeholder="write here"
          onKeyDown={(event) => {
            if ((event.ctrlKey || event.metaKey) && event.key == "Enter") {
              dispatch(sendMessage());
            }
          }}
          onChange={(event) =>
            dispatch(updateChatInputValue(event.target.value))
          }
          endAdornment={
            <IconButton
              onClick={() => dispatch(sendMessage())}
              disabled={_is_submitting}
            >
              <StyledSendIcon />
            </IconButton>
          }
        />
      </StyledChatInputContainer>
    </>
  );
};

export default MobileChatContainer;
