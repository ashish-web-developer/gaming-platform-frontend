// types
import type { FC } from "react";
import type { IGroup } from "@/types/store/slice/group";
import type { IUser } from "@/types/store/slice/login";
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
  activeGroup,
  // action
  updateActiveGroup,
  // api
  joinGroupRequestApi,
  fetchGroupMessagesApi,
  resetTypingUsers,
} from "@/store/slice/group.slice";
import { updateActiveUser, updateShowChat } from "@/store/slice/chat.slice";
import { mode } from "@/store/slice/common.slice";

// hooks
import { useAvatarUrl } from "@/hooks/profile.hook";
import { useIsMobile } from "@/hooks/common.hook";

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
  const is_mobile = useIsMobile();
  const active_group = useAppSelector(activeGroup);
  const admin_avatar_url = useAvatarUrl(admin as IUser);
  const is_active = active_group?.id == id;
  return (
    <StyledChatGroupWrapper
      id="chat-group-wrapper"
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
          dispatch(resetTypingUsers());
          if (is_mobile) {
            dispatch(updateShowChat(true));
          }
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
                sizes="(max-width: 1400px) 5vw"
              />
            </StyledAdminProfile>
            <StyledUserDetails>
              <StyledGroupName>{group_name}</StyledGroupName>
              <StyledGroupCreationDate>
                12 min, 23 Nov 2023
              </StyledGroupCreationDate>
            </StyledUserDetails>
          </StyledLeftWrapper>
          {show_follow_cta && (
            <StyledFollowCta
              onClick={() => {
                dispatch(joinGroupRequestApi({ group_id: id }));
              }}
            >
              Join
            </StyledFollowCta>
          )}
        </StyledWrapperTop>
        <StyledDivider />
        <StyledWrapperBottom>
          <StyledGroupAvatar>
            {user_group.slice(0, 4).map((_user_group, index) => {
              return (
                <ChatAvatar
                  border_color={"#000"}
                  image_background_color={"#fff"}
                  key={`chat-avatar-${index}`}
                  left_count={user_group.length > 3 ? user_group.length - 3 : 0}
                  user={_user_group.user as IUser}
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
