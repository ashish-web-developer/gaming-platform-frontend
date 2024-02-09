import { createPortal } from "react-dom";
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
  StyledChevronIcon,
  StyledNotificationCta,
  StyledBellIcon,
} from "@/styles/components/chat/chat-header/chat-header.style";

// local components
import UploadProfileModal from "@/components/common/user-profile/upload-profile-modal";
import Slider from "@/components/common/slider";
import ChatUserPoint from "@/components/chat/chat-header/chat-user-point";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import { user } from "@/store/slice/user.slice";
import { mode, show_profile_upload_modal } from "@/store/slice/common.slice";

// hooks
import { useAvatarUrl } from "@/hooks/profile.hook";

import React from "react";

const ChatHeader: FC = () => {
  const _show_profile_upload_modal = useAppSelector(show_profile_upload_modal);
  const _user = useAppSelector(user);
  const _mode = useAppSelector(mode);
  const user_avatar_url = useAvatarUrl(_user as IUsersWithConversation);
  const user_avatar_ref = useRef<HTMLButtonElement>(null);

  return (
    <>
      {_show_profile_upload_modal &&
        createPortal(
          <UploadProfileModal ref={user_avatar_ref} />,
          document.getElementById("upload-profile-modal-container") as Element
        )}
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
            <StyledUserProfileImage
              $mode={_mode}
              src={user_avatar_url}
              width={30}
              height={30}
              alt="user-avatar"
            />
            <StyledChevronIcon
              alt="chevron-down"
              width={20}
              height={20}
              src={`/chat/chat-header/${_mode}-chevron-down.png`}
            />
          </StyledUserProfileImageWrapper>
        </StyledRightContainer>
      </StyledChatHeader>
    </>
  );
};

export default ChatHeader;
