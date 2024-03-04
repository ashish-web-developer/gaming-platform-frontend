// types
import type { FC } from "react";
import type {
  INotification,
  IUsersWithConversation,
} from "@/types/store/slice/chat";

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
} from "@/styles/components/common/notification-modal/create-group-notification.style";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import { mode } from "@/store/slice/common.slice";
import {
  joinGroupApi,
  removeNotificationApi,
  getGroupsApi,
} from "@/store/slice/chat.slice";
// hooks
import { useAvatarUrl } from "@/hooks/profile.hook";

const CreateGroupNotification: FC<INotification> = ({
  type,
  ...notification
}) => {
  const dispatch = useAppDispatch();
  const _mode = useAppSelector(mode);
  const avatar_url = useAvatarUrl(
    notification.data.group?.admin as IUsersWithConversation
  );
  if (type == "info") {
    return (
      <StyledInfoNotification>
        <StyledMessage $mode={_mode}>{notification.data.message}</StyledMessage>
      </StyledInfoNotification>
    );
  }
  return (
    <StyledGroupNotificationWrapper>
      <StyledUserAvatar>
        <StyledAvatarImage src={avatar_url} fill={true} alt="avatar" />
      </StyledUserAvatar>
      <StyledGroupNotificationContent>
        <StyledMessage $mode={_mode}>{notification.data.message}</StyledMessage>
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
      </StyledGroupNotificationContent>
    </StyledGroupNotificationWrapper>
  );
};
export default CreateGroupNotification;
