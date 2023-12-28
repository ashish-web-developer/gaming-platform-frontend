import Image from "next/image";
import { useRef } from "react";
// types
import type { FC } from "react";
// styled components
import {
  StyledContainer,
  StyledChatInputContainer,
  StyledChatInput,
  StyledSendButton,
  StyledEmojiButton,
  StyledEmojiContainer,
} from "@/styles/components/memory-game/chat/chat-input.style";

// redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hook";
import {
  active_user,
  send_message_request_pending,
  is_typing,
  show_emoji,
  sendMessage,
  updateShowEmoji,
} from "@/store/slice/chat.slice";
import { user } from "@/store/slice/user.slice";
import { mode } from "@/store/slice/common.slice";
// hooks
import { useEcho } from "@/hooks/pusher.hook";

// emoji picker
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const ChatInput: FC = () => {
  const dispatch = useAppDispatch();
  const _mode = useAppSelector(mode);
  const _active_user = useAppSelector(active_user);
  const _user = useAppSelector(user);
  const _send_message_request_pending = useAppSelector(
    send_message_request_pending
  );
  const _show_emoji = useAppSelector(show_emoji);
  const echo = useEcho();
  const emoji_container_ref = useRef<HTMLDivElement>(null);
  const input_ref = useRef<HTMLInputElement>(null);
  const _is_typing = useAppSelector(is_typing);
  return (
    <StyledContainer>
      {_show_emoji && (
        <StyledEmojiContainer ref={emoji_container_ref}>
          <Picker
            theme={_mode}
            data={data}
            onEmojiSelect={(data: any) => {
              if (input_ref.current) {
                input_ref.current.value += data.native;
              }
            }}
          />
        </StyledEmojiContainer>
      )}
      <StyledChatInputContainer>
        <StyledChatInput
          ref={input_ref}
          placeholder={
            _is_typing ? `${_active_user?.name} is typing` : "Write Here"
          }
          onKeyDown={(event) => {
            setTimeout(() => {
              echo
                ?.private(`chat.${_active_user?.id}`)
                //@ts-ignore
                .whisper("typing", {
                  is_typing: true,
                  user: _user,
                });
            }, 300);
            if (
              input_ref.current &&
              input_ref.current.value &&
              !_send_message_request_pending &&
              (event.metaKey || event.ctrlKey) &&
              event.key == "Enter"
            ) {
              dispatch(sendMessage({ message: input_ref.current.value }));
              input_ref.current.value = "";
            }
          }}
        />
        <StyledSendButton
          onClick={() => {
            if (input_ref.current) {
              dispatch(sendMessage({ message: input_ref.current.value }));
              input_ref.current.value = "";
            }
          }}
        >
          <Image
            alt="send icon"
            src="/memory-game/chat/dark-send-icon.png"
            fill={true}
          />
        </StyledSendButton>
      </StyledChatInputContainer>
      <StyledEmojiButton
        onClick={() => {
          dispatch(updateShowEmoji(!_show_emoji));
        }}
      >
        😉
      </StyledEmojiButton>
    </StyledContainer>
  );
};

export default ChatInput;
