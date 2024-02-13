// types
import type { FC } from "react";
import type { IUsersWithConversation } from "@/types/store/slice/chat";

// styled components
import {
  StyledAvatarWrapper,
  StyledAvatarImage,
} from "@/styles/components/chat/chat-sidebar/chat-group-list/chat-avatar.style";

// hooks
import { useAvatarUrl } from "@/hooks/profile.hook";

const ChatAvatar: FC<{ user: IUsersWithConversation }> = ({ user }) => {
  const avatar_url = useAvatarUrl(user);
  return (
    <StyledAvatarWrapper>
      <StyledAvatarImage alt="avatar" src={avatar_url} fill={true} />
    </StyledAvatarWrapper>
  );
};

export default ChatAvatar;
