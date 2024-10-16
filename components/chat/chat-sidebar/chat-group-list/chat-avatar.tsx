// types
import type { FC } from "react";
import type { IUser } from "@/types/store/slice/login";

// styled components
import {
  StyledAvatarWrapper,
  StyledAvatarImage,
  StyledLeftCount,
} from "@/styles/components/chat/chat-sidebar/chat-group-list/chat-avatar.style";

// hooks
import { useAvatarUrl } from "@/hooks/profile.hook";

const ChatAvatar: FC<{
  user: IUser;
  left_count?: number; // no of avatars left in avatar group
  status?: boolean;
  border_color: string;
  image_background_color: string;
}> = ({ user, left_count, status, border_color, image_background_color }) => {
  const avatar_url = useAvatarUrl(user);
  return (
    <StyledAvatarWrapper
      $show_left_count={Boolean(left_count)}
      $status={status}
      $border_color={border_color}
    >
      <StyledAvatarImage
        sizes="(max-width: 1400px) 10vw"
        alt="avatar"
        src={avatar_url}
        fill={true}
        $border_color={border_color}
        $image_background_color={image_background_color}
      />
      {Boolean(left_count) && <StyledLeftCount>+{left_count}</StyledLeftCount>}
    </StyledAvatarWrapper>
  );
};

export default ChatAvatar;
