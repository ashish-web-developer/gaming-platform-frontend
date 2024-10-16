import { useRef } from "react";
// types
import type { FC } from "react";
import type { ITheme } from "@/theme/chat.theme";
import type { IUser } from "@/types/store/slice/login";
// styled components
import {
  StyledMessageContainer,
  StyledDetailsWrapper,
  StyledWrapper,
  StyledName,
  StyledMessageCount,
  StyledGroupAvatar,
  StyledChatMessageContentContainer,
  StyledUserProfileVectorWrapper,
} from "@/styles/components/chat/chat-message-container/chat-message-container.style";

// styled theme
import { useTheme } from "styled-components";
// local components
import ChatMessage from "@/components/chat/chat-message-container/chat-message";
import ChatAvatar from "@/components/chat/chat-sidebar/chat-group-list/chat-avatar";
// redux
import { useAppSelector } from "@/hooks/redux.hook";
import { User } from "@/store/slice/login.slice";
import {
  // state
  activeUser,
  active_conversation,
  activeUserStatus,
} from "@/store/slice/chat.slice";
import { activeGroup } from "@/store/slice/group.slice";
import { IUsersWithConversation } from "@/types/store/slice/chat";

// hooks
import { useIsMobile } from "@/hooks/common.hook";
import { useAvatarUrl } from "@/hooks/profile.hook";

const UserProfileVector: FC<{
  user: IUsersWithConversation;
}> = ({ user }) => {
  const theme = useTheme() as ITheme;
  const avatar_url = useAvatarUrl(user);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="74"
      height="74"
      fill="none"
      viewBox="0 0 74 74"
    >
      <path
        fill="url(#pattern0)"
        stroke={theme.palette.primary.dark}
        strokeWidth="2"
        d="M34.94 2.405c.93-1.56 3.19-1.56 4.12 0a4.398 4.398 0 006.672 1.057c1.366-1.196 3.514-.498 3.917 1.273a4.397 4.397 0 006.02 3.067c1.668-.715 3.495.612 3.331 2.42l.996.091-.996-.09A4.398 4.398 0 0063.778 15c1.808-.164 3.135 1.663 2.42 3.332a4.398 4.398 0 003.067 6.02c1.77.402 2.469 2.55 1.273 3.916a4.397 4.397 0 001.057 6.673c1.56.93 1.56 3.188 0 4.118a4.398 4.398 0 00-1.057 6.673c1.196 1.366.498 3.514-1.273 3.917a4.398 4.398 0 00-3.067 6.02c.715 1.668-.612 3.495-2.42 3.331A4.398 4.398 0 0059 63.778c.164 1.808-1.663 3.135-3.332 2.42a4.398 4.398 0 00-6.02 3.067c-.402 1.77-2.55 2.469-3.916 1.273a4.397 4.397 0 00-6.673 1.057c-.93 1.56-3.188 1.56-4.118 0a4.398 4.398 0 00-6.673-1.057c-1.366 1.196-3.514.498-3.917-1.273a4.398 4.398 0 00-6.02-3.067c-1.668.715-3.495-.612-3.331-2.42A4.398 4.398 0 0010.223 59l.09.996-.09-.996c-1.809.164-3.136-1.663-2.421-3.332a4.397 4.397 0 00-3.067-6.02c-1.77-.402-2.469-2.55-1.273-3.916a4.398 4.398 0 00-1.057-6.673c-1.56-.93-1.56-3.188 0-4.118a4.398 4.398 0 001.057-6.673c-1.196-1.366-.498-3.514 1.273-3.917a4.397 4.397 0 003.067-6.02c-.715-1.668.612-3.495 2.42-3.331A4.398 4.398 0 0015 10.223c-.164-1.809 1.663-3.136 3.332-2.421a4.397 4.397 0 006.02-3.067c.402-1.77 2.55-2.469 3.916-1.273a4.398 4.398 0 006.673-1.057z"
      ></path>
      <defs>
        <pattern
          id="pattern0"
          width="1"
          height="1"
          patternContentUnits="objectBoundingBox"
        >
          <use
            transform="matrix(.001 0 0 .001 0 -.087)"
            xlinkHref="#image0_974_4408"
          ></use>
        </pattern>
        <image
          id="image0_974_4408"
          width="1000"
          height="1174"
          xlinkHref={avatar_url}
        ></image>
      </defs>
    </svg>
  );
};

const ChatMessageContainer: FC = () => {
  const theme = useTheme() as ITheme;
  const user = useAppSelector(User);
  const active_user = useAppSelector(activeUser);
  const active_group = useAppSelector(activeGroup);
  const _active_conversation = useAppSelector(active_conversation);
  const active_user_status = useAppSelector(activeUserStatus);
  const root_ref = useRef<HTMLDivElement>(null);
  const is_mobile = useIsMobile();
  if (active_group) {
    return (
      <StyledMessageContainer>
        {is_mobile && (
          <StyledUserProfileVectorWrapper>
            <UserProfileVector user={active_user as IUsersWithConversation} />
          </StyledUserProfileVectorWrapper>
        )}
        <StyledDetailsWrapper>
          <StyledWrapper $gap="6px">
            <StyledName>{active_group.group_name}</StyledName>
            <StyledMessageCount>
              ({_active_conversation.length} messages)
            </StyledMessageCount>
          </StyledWrapper>
          {!is_mobile && (
            <StyledGroupAvatar>
              {active_group.user_group.slice(0, 4).map((user_group, index) => {
                return (
                  <ChatAvatar
                    image_background_color={theme.palette.primary.main}
                    border_color={theme.palette.primary.dark}
                    key={`chat-avatar-${index}`}
                    left_count={
                      active_group.user_group.length > 4
                        ? active_group.user_group.length - 3
                        : 0
                    }
                    user={user_group.user as IUsersWithConversation}
                  />
                );
              })}
            </StyledGroupAvatar>
          )}
        </StyledDetailsWrapper>
        <StyledChatMessageContentContainer ref={root_ref}>
          {_active_conversation.map((conversation) => (
            <ChatMessage
              key={conversation.id}
              conversation={conversation}
              user={user as IUser}
              ref={root_ref}
            />
          ))}
        </StyledChatMessageContentContainer>
      </StyledMessageContainer>
    );
  }
  if (active_user) {
    return (
      <StyledMessageContainer>
        {is_mobile && (
          <StyledUserProfileVectorWrapper $status={active_user_status}>
            <UserProfileVector user={active_user as IUsersWithConversation} />
          </StyledUserProfileVectorWrapper>
        )}
        <StyledDetailsWrapper>
          <StyledWrapper $gap="6px">
            <StyledName>{active_user.name}</StyledName>
            <StyledMessageCount>(24 messages)</StyledMessageCount>
          </StyledWrapper>
          {!is_mobile && (
            <ChatAvatar
              image_background_color={theme.palette.primary.main}
              border_color={theme.palette.primary.dark}
              status={active_user_status}
              user={active_user}
            />
          )}
        </StyledDetailsWrapper>
        <StyledChatMessageContentContainer ref={root_ref}>
          {_active_conversation.map((conversation) => (
            <ChatMessage
              key={conversation.id}
              conversation={conversation}
              user={user as IUser}
              ref={root_ref}
            />
          ))}
        </StyledChatMessageContentContainer>
      </StyledMessageContainer>
    );
  }
  return null;
};

export default ChatMessageContainer;
