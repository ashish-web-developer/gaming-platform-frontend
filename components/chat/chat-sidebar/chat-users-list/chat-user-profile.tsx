// type
import type { FC } from "react";
import type { IUsersWithConversation } from "@/types/store/slice/chat";
import type { Theme } from "@/theme/chat.theme";
// styled components
import {
  StyledUsersProfile,
  StyledUserImage,
  StyledUserDetails,
  StyledUserName,
  StyledUserMessage,
} from "@/styles/components/chat/chat-sidebar/chat-users-list/chat-users-profile.style";

// styled theme
import { useTheme } from "styled-components";

// hooks
import { useAvatarUrl } from "@/hooks/profile.hook";
import { useIsMobile } from "@/hooks/common.hook";

// redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hook";
import {
  // state
  active_user,
  // actions
  updateShowChat,
  updateActiveUser,
  // api
  fetchMessages,
} from "@/store/slice/chat.slice";
import { updateActiveGroup } from "@/store/slice/group.slice";
import { mode } from "@/store/slice/common.slice";
// helpers
import { getTimeDifference } from "@/helpers/common.helper";

interface IProps {
  user: IUsersWithConversation;
}
const ChatUserProfile: FC<IProps> = ({ user }) => {
  const dispatch = useAppDispatch();
  const avatar_url = useAvatarUrl(user);
  const theme = useTheme() as Theme;
  const _mode = useAppSelector(mode);
  const _active_user = useAppSelector(active_user);
  const is_mobile = useIsMobile();
  return (
    <StyledUsersProfile
      $time={getTimeDifference(user.latest_conversation?.created_at as string)}
      $not_viewed={user.not_viewed}
      $border_color={
        _active_user?.id == user.id
          ? _mode == "light"
            ? theme.palette.primary.light
            : theme.palette.primary.dark
          : _mode == "light"
          ? theme.palette.primary.dark
          : theme.palette.secondary.main
      }
      onClick={() => {
        dispatch(updateActiveUser(user));
        dispatch(updateActiveGroup(null));
        dispatch(fetchMessages());
        if (is_mobile) {
          dispatch(updateShowChat(true));
        }
      }}
    >
      <StyledUserImage
        src={avatar_url}
        alt="user-avatar"
        width={40}
        height={40}
      />
      <StyledUserDetails>
        <StyledUserName>{user.name}</StyledUserName>
        <StyledUserMessage>
          {user.latest_conversation?.message ?? "@" + user.username}
        </StyledUserMessage>
      </StyledUserDetails>
    </StyledUsersProfile>
  );
};

export default ChatUserProfile;
