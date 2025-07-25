// type
import type { FC } from "react";
import type { ITheme } from "@/theme/chat.theme";

// styled components
import {
  StyledMobileChatHeaderContainer,
  StyledMobileHeaderTop,
  StyledUserProfileImageWrapper,
  StyledUserProfileImage,
  StyledIconCta,
  StyledChevronIcon,
  StyledBackCta,
  StyledNotificationCta,
  StyledBellIcon,
  StyledHeaderMessage,
  StyledSpan,
} from "@/styles/components/chat/chat-header/mobile/mobile-chat-header.style";

// theme
import { useTheme } from "styled-components";
// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import {
  mode,
  updateShowMobileProfile,
  updateShowNotification,
} from "@/store/slice/common.slice";
import { User } from "@/store/slice/login.slice";
import { showChat, updateShowChat } from "@/store/slice/chat.slice";
import { Notifications } from "@/store/slice/notification.slice";

// hooks
import { useAvatarUrl } from "@/hooks/profile.hook";

const BackIcon: FC<{
  size: number;
  color: string;
}> = ({ size, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      className="w-6 h-6 text-gray-800 dark:text-white"
      viewBox="0 0 24 24"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 19l-7-7 7-7"
      ></path>
    </svg>
  );
};

const MobileChatHeader: FC = () => {
  const theme = useTheme() as ITheme;
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(Notifications);
  const unread_notifications_count = notifications.filter(
    (notification) => notification.read_at == null
  ).length;
  const user = useAppSelector(User);
  const _mode = useAppSelector(mode);
  const user_avatar_url = useAvatarUrl(user);
  const show_chat = useAppSelector(showChat);
  return (
    <StyledMobileChatHeaderContainer>
      <StyledMobileHeaderTop>
        {show_chat ? (
          <StyledBackCta
            onClick={() => {
              dispatch(updateShowChat(false));
            }}
          >
            <BackIcon color={theme.palette.primary.dark} size={25} />
          </StyledBackCta>
        ) : (
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
        )}

        <StyledNotificationCta
          $notification_count={unread_notifications_count}
          onClick={() => {
            dispatch(updateShowNotification(true));
          }}
        >
          <StyledBellIcon
            alt="bell-icon"
            src="/chat/chat-header/bell.png"
            width={25}
            height={25}
          />
        </StyledNotificationCta>
      </StyledMobileHeaderTop>
      {!show_chat && (
        <StyledHeaderMessage $mode={_mode}>
          Welcome Gaming, <br />
          <StyledSpan
            $color={
              _mode == "light"
                ? theme.palette.primary.dark
                : theme.palette.primary.light
            }
          >
            Buddy
          </StyledSpan>
        </StyledHeaderMessage>
      )}
    </StyledMobileChatHeaderContainer>
  );
};

export default MobileChatHeader;
