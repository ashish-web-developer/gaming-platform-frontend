import { useRef, forwardRef } from "react";
// types
import type { ForwardRefRenderFunction } from "react";
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
import {
  removeNotificationApi,
  markNotificationAsReadApi,
} from "@/store/slice/notification.slice";
// hooks
import { useAvatarUrl } from "@/hooks/profile.hook";
import { useMessageView } from "@/hooks/chat/chat.hook";

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

const Notification: ForwardRefRenderFunction<HTMLDivElement, INotification> = (
  notification,
  root_ref
) => {
  const dispatch = useAppDispatch();
  const target_ref = useRef<HTMLDivElement>(null);
  const _mode = useAppSelector(mode);
  const avatar_url = useAvatarUrl(getUser(notification));

  useMessageView({
    target_ref,
    callback: () => {
      if (!notification.read_at) {
        dispatch(
          markNotificationAsReadApi({
            notification_id: notification.id,
          })
        );
      }
    },
    options: {
      root: typeof root_ref !== "function" ? root_ref?.current : null,
      threshold: 1,
      rootMargin: "0px",
    },
  });
  if (notification.type == "info") {
    return (
      <StyledInfoNotification ref={target_ref}>
        <StyledMessage $mode={_mode}>{notification.data.message}</StyledMessage>
        <StyledNotificationDate>
          {readableFormatDate(notification.created_at)}
        </StyledNotificationDate>
      </StyledInfoNotification>
    );
  }
  if (notification.type == "group-invite") {
    return (
      <StyledGroupNotificationWrapper ref={target_ref}>
        <StyledUserAvatar>
          <StyledAvatarImage
            sizes="(max-width: 1400px) 5vw"
            src={avatar_url}
            fill={true}
            alt="avatar"
          />
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
      <StyledGroupNotificationWrapper ref={target_ref}>
        <StyledUserAvatar>
          <StyledAvatarImage
            sizes="(max-width: 1400px) 5vw"
            src={avatar_url}
            fill={true}
            alt="avatar"
          />
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
export default forwardRef(Notification);
