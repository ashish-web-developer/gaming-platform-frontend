// types
import type { FC } from "react";
import type { IUsersWithConversation } from "@/types/store/slice/chat";

// styled components
import {
  StyledAvatarWrapper,
  StyledAvatarImage,
  StyledLeftCount,
} from "@/styles/components/chat/chat-sidebar/chat-group-list/chat-avatar.style";

// hooks
import { useAvatarUrl } from "@/hooks/profile.hook";

const ChatAvatar: FC<{
  user: IUsersWithConversation;
  left_count?: number; // no of avatars left in avatar group
}> = ({ user, left_count }) => {
  const avatar_url = useAvatarUrl(user);
  console.log("length", length);
  return (
    <StyledAvatarWrapper $show_left_count={Boolean(left_count)}>
      <StyledAvatarImage alt="avatar" src={avatar_url} fill={true} />
      {Boolean(left_count) && <StyledLeftCount>+{left_count}</StyledLeftCount>}
    </StyledAvatarWrapper>
  );
};

export default ChatAvatar;
