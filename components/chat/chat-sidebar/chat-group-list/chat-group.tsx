// types
import type { FC } from "react";
import type {
  IUsersWithConversation,
  IUserGroup,
} from "@/types/store/slice/chat";
// styled components
import {
  StyledChatGroupWrapper,
  StyledChatGroupContent,
  StyledWrapperTop,
  StyledAdminProfile,
  StyledAdminProfileImage,
  StyledUserDetails,
  StyledDivider,
  StyledGroupName,
  StyledGroupCreationDate,
  StyledWrapperBottom,
  StyledGroupAvatar,
  StyledGroupMessage,
} from "@/styles/components/chat/chat-sidebar/chat-group-list/chat-group.style";

// local components
import ChatAvatar from "@/components/chat/chat-sidebar/chat-group-list/chat-avatar";

// hooks
import { useAvatarUrl } from "@/hooks/profile.hook";

const ChatGroup: FC<{
  group_color: string;
  admin: IUsersWithConversation;
  group_name: string;
  user_group: IUserGroup[];
}> = ({ group_color, admin, group_name, user_group }) => {
  const admin_avatar_url = useAvatarUrl(admin);
  return (
    <StyledChatGroupWrapper $group_color={group_color}>
      <StyledChatGroupContent>
        <StyledWrapperTop>
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
        </StyledWrapperTop>
        <StyledDivider />
        <StyledWrapperBottom>
          <StyledGroupAvatar>
            {user_group.slice(0, 3).map((user_group) => {
              return (
                <ChatAvatar user={user_group.user as IUsersWithConversation} />
              );
            })}
          </StyledGroupAvatar>
          <StyledGroupMessage>
            Hello how long I have waiting...
          </StyledGroupMessage>
        </StyledWrapperBottom>
      </StyledChatGroupContent>
    </StyledChatGroupWrapper>
  );
};

export default ChatGroup;
