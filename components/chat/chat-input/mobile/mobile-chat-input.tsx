import { useRef } from "react";
// types
import type { FC } from "react";
import type CustomChatTheme from "@/types/theme/chat";
import type { IUsersWithConversation } from "@/types/store/slice/chat";

// styled components
import {
  StyledContainer,
  StyledMobileChatInputContainer,
  StyledMobileChatInput,
  StyledGamingInvitationCta,
  StyledButton,
} from "@/styles/components/chat/chat-input/mobile/mobile-chat-input.style";

// styled theme
import { useTheme } from "styled-components";

// icons
import SendIcon from "@/components/chat/chat-input/icon/send-icon";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import {
  active_user,
  send_message_request_pending,
  sendMessage,
} from "@/store/slice/chat.slice";
import { user } from "@/store/slice/user.slice";

// pusher
import { useEcho } from "@/hooks/pusher";

const MobileChatInput: FC = () => {
  const theme = useTheme() as CustomChatTheme;
  const dispatch = useAppDispatch();
  const input_ref = useRef<HTMLInputElement>(null);
  const echo = useEcho();
  const _user = useAppSelector(user);
  const _active_user = useAppSelector(active_user) as IUsersWithConversation;
  const _send_message_request_pending = useAppSelector(
    send_message_request_pending
  );
  return (
    <StyledContainer>
      <StyledMobileChatInputContainer>
        <StyledButton $left={"10px"}>😉</StyledButton>
        <StyledButton
          onClick={() => {
            if (input_ref.current) {
              dispatch(sendMessage({ message: input_ref.current.value }));
              input_ref.current.value = "";
            }
          }}
          disabled={_send_message_request_pending}
          $right={"20px"}
        >
          <SendIcon size={30} color={theme.palette.secondary.main} />
        </StyledButton>
        <StyledMobileChatInput
          ref={input_ref}
          placeholder="Your Message"
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
      </StyledMobileChatInputContainer>
      <StyledGamingInvitationCta></StyledGamingInvitationCta>
    </StyledContainer>
  );
};
export default MobileChatInput;
