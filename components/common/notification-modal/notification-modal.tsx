import { forwardRef, useRef, useState } from "react";
// types
import type { FC, ForwardRefRenderFunction } from "react";
import type { Theme } from "@/theme/chat.theme";

// styled components
import {
  StyledNotificationWrapper,
  StyledNotificationHeader,
  StyledNotificationHeaderTitle,
  StyledIconCta,
  StyledTabWrapper,
  StyledTabCta,
  StyledNotificationCount,
  StyledNotificationContentWrapper,
  StyledNotificationContent,
} from "@/styles/components/common/notification-modal/notification-modal.style";

// local components
import Notification from "@/components/common/notification-modal/notification";

// theme
import { useTheme } from "styled-components";

// redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hook";
import { mode, updateShowNotification } from "@/store/slice/common.slice";
import { notifications } from "@/store/slice/notification.slice";

// hooks
import { useOutsideClickHandler } from "@/hooks/common.hook";

const CloseIcon: FC<{ size: number; color: string }> = ({ size, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        fill={color}
        d="M1.624 0L0 1.624 8.376 10 0 18.376 1.624 20 10 11.624 18.376 20 20 18.376 11.624 10 20 1.624 18.376 0 10 8.376 1.624 0z"
      ></path>
    </svg>
  );
};

const NotificationModal: ForwardRefRenderFunction<
  HTMLButtonElement,
  { is_mobile?: boolean }
> = ({ is_mobile }, cta_ref) => {
  const dispatch = useAppDispatch();
  const theme = useTheme() as Theme;
  const _mode = useAppSelector(mode);
  const _notifications = useAppSelector(notifications);
  const info_notifications = _notifications.filter(
    (notification) => notification.type == "info"
  );
  const unread_info_notifications_count = info_notifications.filter(
    (notification) => !Boolean(notification.read_at)
  ).length;
  const group_invite = _notifications.filter(
    (notification) => notification.type == "group-invite"
  );
  const unread_group_invite_count = group_invite.filter(
    (notification) => !Boolean(notification.read_at)
  ).length;
  const group_join_request = _notifications.filter(
    (notification) => notification.type == "group-join-request"
  );
  const unread_group_join_request_count = group_join_request.filter(
    (notification) => !Boolean(notification.read_at)
  ).length;
  const container_ref = useRef<HTMLDivElement>(null);
  const content_ref = useRef<HTMLDivElement>(null);
  const [active_tab, setActiveTab] = useState<"tab1" | "tab2" | "tab3">("tab1");

  useOutsideClickHandler({
    modal_ref: container_ref,
    cta_ref: typeof cta_ref !== "function" ? cta_ref : null,
    handler: () => {
      if (is_mobile) return;
      dispatch(updateShowNotification(false));
    },
  });

  return (
    <StyledNotificationWrapper ref={container_ref}>
      <StyledNotificationHeader>
        <StyledNotificationHeaderTitle>
          Notifications
        </StyledNotificationHeaderTitle>
        <StyledIconCta
          onClick={() => {
            dispatch(updateShowNotification(false));
          }}
        >
          <CloseIcon
            size={is_mobile ? 24 : 14}
            color={theme.palette.primary.dark}
          />
        </StyledIconCta>
      </StyledNotificationHeader>
      <StyledTabWrapper>
        <StyledTabCta
          $active={active_tab == "tab1"}
          onClick={() => {
            setActiveTab("tab1");
          }}
        >
          Inbox
          {Boolean(unread_info_notifications_count) && (
            <StyledNotificationCount $mode={_mode}>
              {unread_info_notifications_count}
            </StyledNotificationCount>
          )}
        </StyledTabCta>
        <StyledTabCta
          $active={active_tab == "tab2"}
          onClick={() => {
            setActiveTab("tab2");
          }}
        >
          Invite
          {Boolean(unread_group_invite_count) && (
            <StyledNotificationCount $mode={_mode}>
              {unread_group_invite_count}
            </StyledNotificationCount>
          )}
        </StyledTabCta>
        <StyledTabCta
          $active={active_tab == "tab3"}
          onClick={() => {
            setActiveTab("tab3");
          }}
        >
          Request
          {Boolean(unread_group_join_request_count) && (
            <StyledNotificationCount $mode={_mode}>
              {unread_group_join_request_count}
            </StyledNotificationCount>
          )}
        </StyledTabCta>
      </StyledTabWrapper>
      <StyledNotificationContentWrapper ref={content_ref}>
        {active_tab == "tab1" && (
          <StyledNotificationContent>
            {info_notifications.map((notification) => {
              return (
                <Notification
                  ref={content_ref}
                  key={notification.id}
                  {...notification}
                />
              );
            })}
          </StyledNotificationContent>
        )}
        {active_tab == "tab2" && (
          <StyledNotificationContent>
            {group_invite.map((notification) => {
              return (
                <Notification
                  ref={content_ref}
                  key={notification.id}
                  {...notification}
                />
              );
            })}
          </StyledNotificationContent>
        )}
        {active_tab == "tab3" && (
          <StyledNotificationContent>
            {group_join_request.map((notification) => {
              return (
                <Notification
                  ref={content_ref}
                  key={notification.id}
                  {...notification}
                />
              );
            })}
          </StyledNotificationContent>
        )}
      </StyledNotificationContentWrapper>
    </StyledNotificationWrapper>
  );
};

export default forwardRef(NotificationModal);
