// styled components
import {
  // components
  StyledChatInputContainer,
  StyledInput,
  StyledEmojiPicker,
  // icons
  StyledAudioIcon,
  StyledAudioPlayingIcon,
  StyledEmojiIcon,
  StyledSendIcon,
} from "@/styles/components/chat/mobile/mobile-chat-container.style";

// mui
import { IconButton } from "@mui/material";

// redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  // state
  chat_input_value,
  is_submitting,
  is_audio_playing,
  // actions
  updateChatInputValue,
  sendMessage,
  updateIsAudioPlaying,
} from "@/store/slice/chat.slice";
import { showEmoji, updateShowEmoji } from "@/store/slice/common.slice";
import useSpeechRecognition from "@/hooks/speech-recognition";

const MobileChatContainer = () => {
  const recognition = useSpeechRecognition((event) => {
    console.log("value of event", event.results[0]);
  });
  const dispatch = useAppDispatch();
  const _showEmoji = useAppSelector(showEmoji);
  const _chat_input_value = useAppSelector(chat_input_value);
  const _is_submitting = useAppSelector(is_submitting);
  const _is_audio_playing = useAppSelector(is_audio_playing);

  return (
    <>
      <StyledEmojiPicker
        callback={(data) => {
          dispatch(updateChatInputValue(`${_chat_input_value} ${data.native}`));
        }}
      />
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
