import { createPortal } from "react-dom";
import { useRef, useEffect } from "react";
// types
import { type FC } from "react";
import type { ITheme } from "@/theme/chat.theme";

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

// theme
import { useTheme } from "styled-components";

// local components
import Slider from "@/components/common/slider";
import ChatUserPoint from "@/components/chat/chat-header/chat-user-point";
import UserProfileDropDown from "@/components/common/user-profile/user-profile-drop-down";
import UploadProfileModal from "@/components/common/user-profile/upload-profile-modal";
import CreateGroupModal from "@/components/common/create-group/create-group-modal";
import NotificationModal from "@/components/common/notification-modal/notification-modal";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import { User, updateProfileApi } from "@/store/slice/login.slice";
import {
  // states
  mode,
  showProfileUploadModal,
  showProfileDropDown,
  showCreateGroupDropdown,
  showNotificationModal,
  // actions
  updateShowProfileDropDown,
  updateShowNotification,
} from "@/store/slice/common.slice";

import { Notifications } from "@/store/slice/notification.slice";
// hooks
import { useAvatarUrl } from "@/hooks/profile.hook";

// gsap
import gsap from "gsap";

const ChatHeader: FC = () => {
  const theme = useTheme() as ITheme;
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(Notifications);
  const unread_notifications_count = notifications.filter(
    (notification) => notification.read_at == null
  ).length;
  const show_profile_upload_modal = useAppSelector(showProfileUploadModal);
  const show_profile_drop_down = useAppSelector(showProfileDropDown);
  const show_create_group_dropdown = useAppSelector(showCreateGroupDropdown);
  const show_notification_modal = useAppSelector(showNotificationModal);
  const user = useAppSelector(User);
  const _mode = useAppSelector(mode);
  const user_avatar_url = useAvatarUrl(user);
  const chevron_cta_ref = useRef<HTMLButtonElement>(null);
  const camera_cta_ref = useRef<HTMLButtonElement>(null);
  const group_cta_ref = useRef<HTMLButtonElement>(null);
  const notification_cta_ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const gsap_context = gsap.context(() => {
      gsap.fromTo(
        ".animation",
        {
          opacity: 0,
          scale: 2,
        },
        {
          opacity: 1,
          duration: 1,
          ease: "elastic.out",
          scale: 1,
          stagger: 0.1,
        }
      );
    });
    return () => {
      gsap_context.revert();
    };
  }, []);

  return (
    <>
      {show_profile_upload_modal &&
        createPortal(
          <UploadProfileModal
            ref={camera_cta_ref}
            secondary_color={
              _mode == "dark"
                ? theme.palette.info.main
                : theme.palette.primary.dark
            }
            font_family={theme.fontFamily.lobster}
            onClickHandler={(file_state, file) => {
              const form_data = new FormData();
              form_data.append("avatar", file);
              dispatch(updateProfileApi({ form_data }));
            }}
          />,
          document.getElementById("upload-profile-modal-container") as Element
        )}
      <StyledChatHeader>
        <StyledWelcomeText>
          Welcome Gaming, <StyledSpan>Buddy</StyledSpan>
        </StyledWelcomeText>
        <StyledRightContainer>
          <StyledNotificationCta
            className="animation"
            $notification_count={unread_notifications_count}
            onClick={() => {
              dispatch(updateShowNotification(!show_notification_modal));
            }}
            ref={notification_cta_ref}
          >
            <StyledBellIcon
              alt="bell-icon"
              src="/chat/chat-header/bell.png"
              width={25}
              height={25}
            />
          </StyledNotificationCta>
          <ChatUserPoint />
          <Slider />
          <StyledUserProfileImageWrapper id="user-profile-wrapper">
            {show_profile_drop_down && (
              <UserProfileDropDown
                ref={camera_cta_ref}
                chevron_cta_ref={chevron_cta_ref}
                group_cta_ref={group_cta_ref}
              />
            )}
            {show_create_group_dropdown && (
              <CreateGroupModal ref={group_cta_ref} />
            )}
            {show_notification_modal && (
              <NotificationModal ref={notification_cta_ref} />
            )}
            <StyledUserProfileImage
              className="animation"
              $mode={_mode}
              src={user_avatar_url}
              width={30}
              height={30}
              alt="user-avatar"
            />
            <StyledIconCta
              ref={chevron_cta_ref}
              onClick={() => {
                dispatch(updateShowProfileDropDown(!show_profile_drop_down));
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
