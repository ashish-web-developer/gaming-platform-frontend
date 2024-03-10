// types
import type { FC } from "react";
import type { IUsersWithConversation } from "@/types/store/slice/chat";
import type { INotification } from "@/types/store/slice/notification";

// styled components
import {
  StyledGroupNotificationWrapper,
  StyledUserAvatar,
  StyledAvatarImage,
  StyledMessage,
  StyledGroupNotificationContent,
  StyledCtaWrapper,
  StyledCta,
  StyledInfoNotification,
  StyledNotificationDate,
} from "@/styles/components/common/notification-modal/notification.style";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import { mode } from "@/store/slice/common.slice";
import { giveGroupAccess, joinGroupApi } from "@/store/slice/group.slice";
import { removeNotificationApi } from "@/store/slice/notification.slice";
// hooks
import { useAvatarUrl } from "@/hooks/profile.hook";

// helpers
import { readableFormatDate } from "@/helpers/common.helper";

const getUser = (notification: INotification) => {
  switch (notification.type) {
    case "group-invite":
      return notification.data.group.admin as IUsersWithConversation;
    case "group-join-request":
      return notification.data.user;
    default:
      return null;
  }
};

const Notification: FC<INotification> = (notification) => {
  const dispatch = useAppDispatch();
  const _mode = useAppSelector(mode);
  const avatar_url = useAvatarUrl(getUser(notification) ?? "");
  if (notification.type == "info") {
    return (
      <StyledInfoNotification>
        <StyledMessage $mode={_mode}>{notification.data.message}</StyledMessage>
        <StyledNotificationDate>
          {readableFormatDate(notification.created_at)}
        </StyledNotificationDate>
      </StyledInfoNotification>
    );
  }
  if (notification.type == "group-invite") {
    return (
      <StyledGroupNotificationWrapper>
        <StyledUserAvatar>
          <StyledAvatarImage src={avatar_url} fill={true} alt="avatar" />
        </StyledUserAvatar>
        <StyledGroupNotificationContent>
          <StyledMessage $mode={_mode}>
            {notification.data.message}
          </StyledMessage>
          <StyledCtaWrapper>
            <StyledCta
              onClick={() => {
                dispatch(
                  removeNotificationApi({ notification_id: notification.id })
                );
              }}
              $show_background={false}
            >
              Decline
            </StyledCta>
            <StyledCta
              onClick={() => {
                if (notification.data.group) {
                  dispatch(
                    joinGroupApi({
                      notification_id: notification.id,
                      group_id: notification.data.group.id,
                    })
                  );
                }
              }}
              $show_background={true}
            >
              Join
            </StyledCta>
          </StyledCtaWrapper>
          <StyledNotificationDate>
            {readableFormatDate(notification.created_at)}
          </StyledNotificationDate>
        </StyledGroupNotificationContent>
      </StyledGroupNotificationWrapper>
    );
  }
  if (notification.type == "group-join-request") {
    return (
      <StyledGroupNotificationWrapper>
        <StyledUserAvatar>
          <StyledAvatarImage src={avatar_url} fill={true} alt="avatar" />
        </StyledUserAvatar>
        <StyledGroupNotificationContent>
          <StyledMessage $mode={_mode}>
            {notification.data.message}
          </StyledMessage>
          <StyledCtaWrapper>
            <StyledCta
              onClick={() => {
                dispatch(
                  removeNotificationApi({ notification_id: notification.id })
                );
              }}
              $show_background={false}
            >
              Decline
            </StyledCta>
            <StyledCta
              onClick={() => {
                if (notification.data.group) {
                  dispatch(
                    giveGroupAccess({
                      user_id: notification.data.user.id,
                      group_id: notification.data.group.id,
                      notification_id: notification.id,
                    })
                  );
                }
              }}
              $show_background={true}
            >
              Accept
            </StyledCta>
          </StyledCtaWrapper>
          <StyledNotificationDate>
            {readableFormatDate(notification.created_at)}
          </StyledNotificationDate>
        </StyledGroupNotificationContent>
      </StyledGroupNotificationWrapper>
    );
  }
};
export default Notification;
