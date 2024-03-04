import { useRef } from "react";
// types
import type { FC } from "react";
import type { IUsersWithConversation } from "@/types/store/slice/chat";

// styled components
import {
  StyledChatInputContainer,
  StyledChatInputWrapper,
  StyledUserProfileWrapper,
  StyledUserProfileImage,
  StyledEmojiCta,
  StyledEmojiImage,
  StyledChatInput,
  StyledBottomWrapper,
  StyledIconWrapper,
  StyledIconCta,
  StyledIconImage,
  StyledSendCta,
} from "@/styles/components/chat/chat-input/chat-input.style";

// local components
import EmojiPicker from "@/components/common/emoji-picker";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import { mode, show_emoji, updateShowEmoji } from "@/store/slice/common.slice";
import { user } from "@/store/slice/user.slice";
import {
  is_request_pending,
  is_typing,
  active_user,
  sendMessageApi,
} from "@/store/slice/chat.slice";

// hooks
import { useAvatarUrl } from "@/hooks/profile.hook";
import { useEcho } from "@/hooks/pusher.hook";

const ChatInput: FC<{}> = () => {
  const dispatch = useAppDispatch();
  const echo = useEcho();
  const _mode = useAppSelector(mode);
  const _show_emoji = useAppSelector(show_emoji);
  const _is_request_pending = useAppSelector(is_request_pending);
  const _user = useAppSelector(user);
  const _active_user = useAppSelector(active_user);
  const _is_typing = useAppSelector(is_typing);
  const user_avatar_url = useAvatarUrl(_user as IUsersWithConversation);
  const input_ref = useRef<HTMLInputElement>(null);
  const emoji_cta_ref = useRef(null);
  return (
    <>
      {_show_emoji && (
        <EmojiPicker ref={input_ref} emoji_cta_ref={emoji_cta_ref} />
      )}
      <StyledChatInputContainer $mode={_mode}>
        <StyledChatInputWrapper>
          <StyledChatInput
            type="text"
            ref={input_ref}
            placeholder={
              _is_typing ? `${_active_user?.name} is typing` : "Your Message"
            }
            onKeyDown={(event) => {
              if (_active_user) {
                setTimeout(() => {
                  echo
                    ?.private(`chat.${_active_user.id}`)
                    //@ts-ignore
                    .whisper("typing", {
                      is_typing: true,
                      user: _user,
                    });
                }, 300);
              }
              if (
                input_ref.current?.value &&
                !_is_request_pending &&
                (event.metaKey || event.ctrlKey) &&
                event.key == "Enter"
              ) {
                dispatch(
                  sendMessageApi({
                    message: input_ref.current.value,
                  })
                );
                input_ref.current.value = "";
              }
            }}
          />
          <StyledUserProfileWrapper>
            <StyledUserProfileImage
              alt={"user-avatar"}
              src={user_avatar_url}
              fill={true}
              sizes="(max-width: 1400px) 5vw"
            />
          </StyledUserProfileWrapper>
          <StyledEmojiCta
            ref={emoji_cta_ref}
            onClick={() => {
              dispatch(updateShowEmoji(!_show_emoji));
            }}
          >
            <StyledEmojiImage
              alt="emoji"
              fill={true}
              src="/chat/chat-input/emoji.png"
              sizes="(max-width: 1400px) 5vw"
            />
          </StyledEmojiCta>
        </StyledChatInputWrapper>
        <StyledBottomWrapper>
          <StyledIconWrapper>
            <StyledIconCta>
              <StyledIconImage
                fill={true}
                alt="icon"
                src="/chat/chat-input/paper-clip.png"
                sizes="(max-width: 1400px) 5vw"
              />
            </StyledIconCta>
            <StyledIconCta>
              <StyledIconImage
                fill={true}
                alt="icon"
                src="/chat/chat-input/mike.png"
                sizes="(max-width: 1400px) 5vw"
              />
            </StyledIconCta>
            <StyledIconCta>
              <StyledIconImage
                fill={true}
                alt="icon"
                src="/chat/chat-input/game-icon.png"
                sizes="(max-width: 1400px) 5vw"
              />
            </StyledIconCta>
          </StyledIconWrapper>
          <StyledSendCta
            onClick={() => {
              if (input_ref.current) {
                dispatch(
                  sendMessageApi({
                    message: input_ref.current.value,
                  })
                );
                input_ref.current.value = "";
              }
            }}
            disabled={_is_request_pending}
          >
            Send
          </StyledSendCta>
        </StyledBottomWrapper>
      </StyledChatInputContainer>
    </>
  );
};

export default ChatInput;
