import { useRef } from "react";
// types
import { type FC } from "react";
import type { IUsersWithConversation } from "@/types/store/slice/chat";

// styled components
import {
  StyledChatHeader,
  StyledWelcomeText,
  StyledSpan,
  StyledRightContainer,
  StyledUserProfileImageWrapper,
  StyledUserProfileImage,
  StyledIconCta,
  StyledChevronIcon,
  StyledNotificationCta,
  StyledBellIcon,
} from "@/styles/components/chat/chat-header/chat-header.style";

// local components
import Slider from "@/components/common/slider";
import ChatUserPoint from "@/components/chat/chat-header/chat-user-point";
import UserProfileDropDown from "@/components/common/user-profile/user-profile-drop-down";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import { user } from "@/store/slice/user.slice";
import {
  mode,
  show_profile_drop_down,
  updateShowProfileDropDown,
} from "@/store/slice/common.slice";

// hooks
import { useAvatarUrl } from "@/hooks/profile.hook";

import React from "react";

const ChatHeader: FC = () => {
  const dispatch = useAppDispatch();
  const _show_profile_drop_down = useAppSelector(show_profile_drop_down);
  const _user = useAppSelector(user);
  const _mode = useAppSelector(mode);
  const user_avatar_url = useAvatarUrl(_user as IUsersWithConversation);
  const chevron_cta_ref = useRef<HTMLButtonElement>(null);

  return (
    <>
      <StyledChatHeader>
        <StyledWelcomeText>
          Welcome Gaming, <StyledSpan>Buddy</StyledSpan>
        </StyledWelcomeText>
        <StyledRightContainer>
          <StyledNotificationCta>
            <StyledBellIcon
              alt="bell-icon"
              src="/chat/chat-header/bell.png"
              width={25}
              height={25}
            />
          </StyledNotificationCta>
          <ChatUserPoint />
          <Slider />
          <StyledUserProfileImageWrapper>
            <UserProfileDropDown ref={chevron_cta_ref} />
            <StyledUserProfileImage
              $mode={_mode}
              src={user_avatar_url}
              width={30}
              height={30}
              alt="user-avatar"
            />
            <StyledIconCta
              ref={chevron_cta_ref}
              onClick={() => {
                dispatch(updateShowProfileDropDown(!_show_profile_drop_down));
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
        </StyledRightContainer>
      </StyledChatHeader>
    </>
  );
};

export default ChatHeader;
