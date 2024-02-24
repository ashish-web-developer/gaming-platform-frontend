// types
import type { FC } from "react";
import type { IUsersWithConversation } from "@/types/store/slice/chat";
import type { IGroup } from "@/types/store/slice/chat";
// styled components
import {
  StyledChatGroupWrapper,
  StyledChatGroupContent,
  StyledWrapperTop,
  StyledLeftWrapper,
  StyledAdminProfile,
  StyledAdminProfileImage,
  StyledUserDetails,
  StyledFollowCta,
  StyledDivider,
  StyledGroupName,
  StyledGroupCreationDate,
  StyledWrapperBottom,
  StyledGroupAvatar,
  StyledGroupMessage,
} from "@/styles/components/chat/chat-sidebar/chat-group-list/chat-group.style";

// local components
import ChatAvatar from "@/components/chat/chat-sidebar/chat-group-list/chat-avatar";

// redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hook";
import {
  // state
  active_group,
  // actions
  updateActiveGroup,
  updateActiveUser,
  // api
  fetchGroupMessagesApi,
} from "@/store/slice/chat.slice";
import { mode } from "@/store/slice/common.slice";

// hooks
import { useAvatarUrl } from "@/hooks/profile.hook";

const ChatGroup: FC<
  IGroup & { show_follow_cta?: boolean; is_clickable?: boolean }
> = ({
  group_color,
  admin,
  group_name,
  user_group,
  id,
  latest_conversation,
  show_follow_cta = false,
  is_clickable = false,
  ...prop
}) => {
  const dispatch = useAppDispatch();
  const _mode = useAppSelector(mode);
  const _active_group = useAppSelector(active_group);
  const admin_avatar_url = useAvatarUrl(admin as IUsersWithConversation);
  const is_active = _active_group?.id == id;
  return (
    <StyledChatGroupWrapper
      onClick={() => {
        if (is_clickable) {
          dispatch(
            updateActiveGroup({
              group_color,
              admin,
              group_name,
              user_group,
              id,
              latest_conversation,
              ...prop,
            })
          );
          dispatch(updateActiveUser(null));
          dispatch(fetchGroupMessagesApi());
        }
      }}
      $mode={_mode}
      $is_active={is_active}
      $group_color={group_color}
    >
      <StyledChatGroupContent>
        <StyledWrapperTop>
          <StyledLeftWrapper>
            <StyledAdminProfile>
              <StyledAdminProfileImage
                src={admin_avatar_url}
                alt="admin-profile"
                fill={true}
              />
            </StyledAdminProfile>
            <StyledUserDetails>
              <StyledGroupName>{group_name}</StyledGroupName>
              <StyledGroupCreationDate>
                12 min, 23 Nov 2023
              </StyledGroupCreationDate>
            </StyledUserDetails>
          </StyledLeftWrapper>
          {show_follow_cta && <StyledFollowCta>Follow</StyledFollowCta>}
        </StyledWrapperTop>
        <StyledDivider />
        <StyledWrapperBottom>
          <StyledGroupAvatar>
            {user_group.slice(0, 4).map((_user_group, index) => {
              return (
                <ChatAvatar
                  key={`chat-avatar-${index}`}
                  left_count={user_group.length > 3 ? user_group.length - 3 : 0}
                  user={_user_group.user as IUsersWithConversation}
                />
              );
            })}
          </StyledGroupAvatar>
          {latest_conversation && (
            <StyledGroupMessage>
              {latest_conversation.message}
            </StyledGroupMessage>
          )}
        </StyledWrapperBottom>
      </StyledChatGroupContent>
    </StyledChatGroupWrapper>
  );
};

export default ChatGroup;
