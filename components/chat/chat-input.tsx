import { useRef } from "react";
// types
import type { FC } from "react";
import type CustomChatTheme from "@/types/theme/chat";

// styled components
import {
  StyledChatInputContainer,
  StyledChatInput,
  StyledButton,
  StyledEmojiContainer,
} from "@/styles/components/chat/chat-input.style";

// styled theme
import { useTheme } from "styled-components";

// redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { user } from "@/store/slice/user.slice";
import {
  send_message_request_pending,
  active_user,
  sendMessage,
  show_emoji,
  is_typing,
  updateShowEmoji,
  sendInvitationApi,
} from "@/store/slice/chat.slice";
import { updateRoomId } from "@/store/slice/game.slice";
import { mode } from "@/store/slice/common.slice";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

// hooks
import { useEmojiOutsideClickHandler } from "@/hooks/chat/chat.hook";
import { useEcho } from "@/hooks/pusher";

// helpers package
import { v4 as uuidv4 } from "uuid";

const SendIcon: FC<{ size: number; color: string }> = ({ size, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="28"
      fill="none"
      viewBox="0 0 30 28"
    >
      <path
        fill={color}
        d="M29.915 2.549l-4.528 23.76c-.341 1.678-1.232 2.095-2.498 1.305l-6.898-5.657-3.328 3.563c-.368.41-.676.753-1.386.753l.495-7.819L24.557 5.597c.556-.551-.12-.857-.864-.305L7.888 16.367l-6.804-2.37c-1.48-.514-1.507-1.647.308-2.437L28.006.15c1.232-.515 2.31.305 1.909 2.399z"
      ></path>
    </svg>
  );
};

const GameIcon: FC<{ width: number; height: number; color: string }> = ({
  width,
  height,
  color,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 40 25"
    >
      <path
        fill={color}
        d="M30.004 0H10C8.352 0 6.729.509 5.276 1.483c-1.453.973-2.691 2.38-3.604 4.097C.759 7.297.2 9.27.045 11.32c-.156 2.052.097 4.12.735 6.02.639 1.9 1.643 3.574 2.924 4.872 1.28 1.297 2.798 2.179 4.418 2.566s3.29.267 4.863-.348c1.574-.616 3.001-1.708 4.155-3.18h5.72c1.154 1.472 2.58 2.564 4.154 3.18a8.088 8.088 0 004.863.348c1.62-.387 3.137-1.268 4.418-2.565 1.28-1.297 2.285-2.97 2.924-4.87.639-1.9.892-3.968.737-6.02-.156-2.05-.714-4.023-1.626-5.74-.912-1.716-2.15-3.124-3.602-4.098C33.275.51 31.652 0 30.004 0zM15.5 13.438c0 .248-.079.487-.22.662a.684.684 0 01-.53.275H11.5v4.063c0 .248-.078.487-.219.662a.684.684 0 01-.53.275h-1.5a.683.683 0 01-.53-.275 1.068 1.068 0 01-.22-.663v-4.062H5.25a.683.683 0 01-.53-.275 1.068 1.068 0 01-.22-.662v-1.876c0-.248.08-.487.22-.662a.683.683 0 01.53-.275h3.25V6.562c0-.248.079-.487.22-.662a.683.683 0 01.53-.275h1.5c.199 0 .39.099.53.275.14.175.22.414.22.662v4.063h3.25c.198 0 .389.099.53.275.14.175.22.414.22.662v1.876zM29 19.375c-.495 0-.978-.183-1.39-.527-.41-.343-.731-.831-.92-1.402a3.856 3.856 0 01-.142-1.806 3.427 3.427 0 01.684-1.6c.35-.437.795-.734 1.28-.855a2.04 2.04 0 011.444.178c.457.236.847.637 1.122 1.15.275.515.421 1.119.421 1.737 0 .829-.263 1.624-.732 2.21-.469.586-1.105.915-1.768.915zm4-7.5c-.495 0-.979-.183-1.39-.527-.41-.343-.731-.831-.92-1.402a3.856 3.856 0 01-.143-1.806 3.427 3.427 0 01.684-1.6c.35-.437.795-.734 1.28-.855a2.04 2.04 0 011.445.178c.456.236.847.637 1.122 1.15.274.515.42 1.119.42 1.737 0 .829-.262 1.624-.731 2.21-.47.586-1.105.915-1.768.915z"
      ></path>
    </svg>
  );
};

const ChatInput: FC = () => {
  const theme = useTheme() as CustomChatTheme;
  const dispatch = useAppDispatch();
  const _user = useAppSelector(user);
  const input_ref = useRef<HTMLInputElement>(null);
  const emoji_cta_ref = useRef<HTMLButtonElement>(null);
  const emoji_container_ref = useRef<HTMLDivElement>(null);
  const _send_message_request_pending = useAppSelector(
    send_message_request_pending
  );
  const _show_emoji = useAppSelector(show_emoji);
  const _active_user = useAppSelector(active_user);
  const _mode = useAppSelector(mode);
  const echo = useEcho();
  const _is_typing = useAppSelector(is_typing);
  useEmojiOutsideClickHandler({ emoji_cta_ref, emoji_container_ref });

  return (
    <>
      {_active_user && (
        <StyledChatInputContainer>
          <StyledChatInput
            ref={input_ref}
            placeholder={
              _is_typing ? `${_active_user.name} is typing....` : "Your Message"
            }
            onKeyDown={(event) => {
              setTimeout(() => {
                echo
                  ?.private(`chat.${_active_user.id}`)
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
          <StyledButton
            ref={emoji_cta_ref}
            onClick={() => dispatch(updateShowEmoji(!_show_emoji))}
            $left="16px"
          >
            😉
          </StyledButton>
          <StyledButton
            onClick={() => {
              if (input_ref.current) {
                dispatch(sendMessage({ message: input_ref.current.value }));
                input_ref.current.value = "";
              }
            }}
            $right="75px"
            disabled={_send_message_request_pending}
          >
            <SendIcon size={30} color={theme.palette.secondary.main} />
          </StyledButton>
          <StyledButton
            onClick={() => {
              let room_id = uuidv4();
              dispatch(updateRoomId(room_id));
              dispatch(sendInvitationApi({ game: "memory-game" }));
            }}
            $right="16px"
          >
            <GameIcon
              width={40}
              height={25}
              color={theme.palette.secondary.main}
            />
          </StyledButton>
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
        </StyledChatInputContainer>
      )}
    </>
  );
};

export default ChatInput;
