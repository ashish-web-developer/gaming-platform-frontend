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
} from "@/styles/components/chat/chat-input/chat-input.style";

// styled theme
import { useTheme } from "styled-components";

// redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hook";
import { user } from "@/store/slice/user.slice";
import {
  // state
  send_message_request_pending,
  active_user,
  sendMessage,
  show_emoji,
  is_typing,
  // action
  updateShowEmoji,
  // api
  sendInvitationApi,
} from "@/store/slice/chat.slice";
import { updateRoomId, udpateIsProposalSender } from "@/store/slice/game.slice";
import { mode } from "@/store/slice/common.slice";

// emoji picker
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

// hooks
import { useEmojiOutsideClickHandler } from "@/hooks/chat/chat.hook";
import { useEcho } from "@/hooks/pusher.hook";
import { useIsMobile } from "@/hooks/common.hook";

// helpers package
import { v4 as uuidv4 } from "uuid";

// icons
import GameIcon from "@/components/chat/chat-input/icon/game-icon";
import SendIcon from "@/components/chat/chat-input/icon/send-icon";

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
  const is_mobile = useIsMobile();
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
            $right={is_mobile ? "25px" : "75px"}
            disabled={_send_message_request_pending}
          >
            <SendIcon size={30} color={theme.palette.secondary.main} />
          </StyledButton>
          {!is_mobile && (
            <StyledButton
              onClick={() => {
                let room_id = uuidv4();
                dispatch(updateRoomId(room_id));
                dispatch(sendInvitationApi({ game: "memory-game" }));
                dispatch(udpateIsProposalSender(true));
              }}
              $right="16px"
            >
              <GameIcon
                width={40}
                height={25}
                color={theme.palette.secondary.main}
              />
            </StyledButton>
          )}
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
