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
  StyledEmojiContainer,
} from "@/styles/components/chat/chat-input/chat-input.style";

// local components
import EmojiPicker from "@/components/common/emoji-picker";

// redux
import { useAppSelector } from "@/hooks/redux.hook";
import { mode } from "@/store/slice/common.slice";
import { user } from "@/store/slice/user.slice";

// hooks
import { useAvatarUrl } from "@/hooks/profile.hook";

const ChatInput: FC = () => {
  const _mode = useAppSelector(mode);
  const _user = useAppSelector(user);
  const user_avatar_url = useAvatarUrl(_user as IUsersWithConversation);
  const input_ref = useRef(null);
  const emoji_cta_ref = useRef(null);
  return (
    <>
      {/* <StyledEmojiContainer>
        <EmojiPicker emoji_cta_ref={emoji_cta_ref} />
      </StyledEmojiContainer> */}
      <StyledChatInputContainer $mode={_mode}>
        <StyledChatInputWrapper>
          <StyledChatInput
            type="text"
            ref={input_ref}
            placeholder="Your Message"
          />
          <StyledUserProfileWrapper>
            <StyledUserProfileImage
              alt={"user-avatar"}
              src={user_avatar_url}
              fill={true}
            />
          </StyledUserProfileWrapper>
          <StyledEmojiCta>
            <StyledEmojiImage
              alt="emoji"
              fill={true}
              src="/chat/chat-input/emoji.png"
            />
            Hello
          </StyledEmojiCta>
        </StyledChatInputWrapper>
        <StyledBottomWrapper>
          <StyledIconWrapper>
            <StyledIconCta>
              <StyledIconImage
                fill={true}
                alt="icon"
                src="/chat/chat-input/paper-clip.png"
              />
            </StyledIconCta>
            <StyledIconCta>
              <StyledIconImage
                fill={true}
                alt="icon"
                src="/chat/chat-input/mike.png"
              />
            </StyledIconCta>
            <StyledIconCta>
              <StyledIconImage
                fill={true}
                alt="icon"
                src="/chat/chat-input/game-icon.png"
              />
            </StyledIconCta>
          </StyledIconWrapper>
          <StyledSendCta>Send</StyledSendCta>
        </StyledBottomWrapper>
      </StyledChatInputContainer>
    </>
  );
};

export default ChatInput;
