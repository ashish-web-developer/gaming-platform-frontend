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
  return (
    <StyledChatInputContainer $mode={_mode}>
      <StyledChatInputWrapper>
        <StyledChatInput placeholder="Your Message" />
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
  );
};

export default ChatInput;
