// styled components
import {
  StyledChatInputContainer,
  StyledAudioIcon,
  StyledEmojiIcon,
  StyledSendIcon,
  StyledInput,
  StyledEmojiPicker,
} from "@/styles/components/chat/mobile/mobile-chat-container.style";

// mui
import {  IconButton } from "@mui/material";

// redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  chat_input_value,
  is_submitting,
  updateChatInputValue,
  sendMessage,
} from "@/store/slice/chat.slice";
import { showEmoji, updateShowEmoji } from "@/store/slice/common.slice";

const MobileChatContainer = () => {
  const dispatch = useAppDispatch();
  const _showEmoji = useAppSelector(showEmoji);
  const _chat_input_value = useAppSelector(chat_input_value);
  const _is_submitting = useAppSelector(is_submitting);
  return (
    <>
      <StyledEmojiPicker
        callback={(data) => {
          dispatch(updateChatInputValue(`${_chat_input_value} ${data.native}`));
        }}
      />
      <StyledChatInputContainer>
        <IconButton>
          <StyledAudioIcon />
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
