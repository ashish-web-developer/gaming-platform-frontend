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
import { joinGroupApi, getGroupsApi } from "@/store/slice/chat.slice";
import { removeNotificationApi } from "@/store/slice/notification.slice";
// hooks
import { useAvatarUrl } from "@/hooks/profile.hook";

// helpers
import { readableFormatDate } from "@/helpers/common.helper";

const Notification: FC<INotification> = ({ type, ...notification }) => {
  const dispatch = useAppDispatch();
  const _mode = useAppSelector(mode);
  const avatar_url = useAvatarUrl(
    notification.data.group?.admin as IUsersWithConversation
  );
  if (type == "info") {
    return (
      <StyledInfoNotification>
        <StyledMessage $mode={_mode}>{notification.data.message}</StyledMessage>
        <StyledNotificationDate>
          {readableFormatDate(notification.created_at)}
        </StyledNotificationDate>
      </StyledInfoNotification>
    );
  }
  if (type == "group-invite") {
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
                  dispatch(getGroupsApi());
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
  if (type == "group-join-request") {
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
                  dispatch(getGroupsApi());
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
