// type
import type { FC } from "react";
import type { IUsersWithConversation } from "@/types/store/slice/chat";
import type CustomChatTheme from "@/types/theme/chat";
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
import useAvatar from "@/hooks/profile";

// redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  active_user,
  updateActiveUser,
  fetchMessages,
} from "@/store/slice/chat.slice";
interface IProps {
  user: IUsersWithConversation;
}
const ChatUserProfile: FC<IProps> = ({ user }) => {
  const dispatch = useAppDispatch();
  const avatar = useAvatar(user.username ?? "");
  const theme = useTheme() as CustomChatTheme;
  const _active_user = useAppSelector(active_user);
  return (
    <StyledUsersProfile
      $not_viewed={user.not_viewed}
      $border={
        _active_user?.id == user.id
          ? theme.palette.default_user_profile.active_user_border
          : theme.palette.default_user_profile.border
      }
      onClick={() => {
        dispatch(updateActiveUser(user));
        dispatch(fetchMessages());
      }}
    >
      <StyledUserImage
        dangerouslySetInnerHTML={{
          __html: avatar,
        }}
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
