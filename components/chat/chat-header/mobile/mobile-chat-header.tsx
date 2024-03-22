// type
import type { FC } from "react";
import type { IUsersWithConversation } from "@/types/store/slice/chat";

// styled components
import {
  StyledMobileChatHeaderContainer,
  StyledMobileHeaderTop,
  StyledUserProfileImageWrapper,
  StyledUserProfileImage,
  StyledIconCta,
  StyledChevronIcon,
  StyledNotificationCta,
  StyledBellIcon,
  StyledHeaderMessage,
  StyledSpan,
} from "@/styles/components/chat/chat-header/mobile/mobile-chat-header.style";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import { mode, updateShowMobileProfile } from "@/store/slice/common.slice";
import { user } from "@/store/slice/user.slice";
import { show_chat } from "@/store/slice/chat.slice";

// hooks
import { useAvatarUrl } from "@/hooks/profile.hook";

const MobileChatHeader: FC = () => {
  const dispatch = useAppDispatch();
  const _user = useAppSelector(user);
  const _mode = useAppSelector(mode);
  const user_avatar_url = useAvatarUrl(_user as IUsersWithConversation);
  const _show_chat = useAppSelector(show_chat);
  return (
    <StyledMobileChatHeaderContainer>
      <StyledMobileHeaderTop>
        <StyledUserProfileImageWrapper>
          <StyledUserProfileImage
            $mode={_mode}
            src={user_avatar_url}
            width={30}
            height={30}
            alt="user-avatar"
          />
          <StyledIconCta
            onClick={() => {
              dispatch(updateShowMobileProfile(true));
            }}
          >
            <StyledChevronIcon
              alt="chevron-down"
              width={20}
              height={20}
              src={`/chat/chat-header/${_mode}-chevron-down.png`}
            />
          </StyledIconCta>
        </StyledUserProfileImageWrapper>
        <StyledNotificationCta>
          <StyledBellIcon
            alt="bell-icon"
            src="/chat/chat-header/bell.png"
            width={25}
            height={25}
          />
        </StyledNotificationCta>
      </StyledMobileHeaderTop>
      {!_show_chat && (
        <StyledHeaderMessage>
          Welcome Gaming, <br />
          <StyledSpan $color="#fff">Buddy</StyledSpan>
        </StyledHeaderMessage>
      )}
    </StyledMobileChatHeaderContainer>
  );
};

export default MobileChatHeader;
