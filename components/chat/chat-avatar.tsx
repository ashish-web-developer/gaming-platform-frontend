// styled components
import {
  StyledAvatarContainer,
  StyledProfileAvatar,
} from "@/styles/components/chat/chat-avatar.style";
// types
import type { FC } from "react";
import type Colors from "@/types/data/colors";

interface Props {
  color: Colors[number];
  width: number;
  height: number;
  avatar: string;
}
const ChatAvatar: FC<Props> = ({ color, width, height, avatar }) => {
  return (
    <StyledAvatarContainer $color={color} $width={width} $height={height}>
      <StyledProfileAvatar
        $width={width}
        $height={height}
        dangerouslySetInnerHTML={{ __html: avatar }}
      ></StyledProfileAvatar>
    </StyledAvatarContainer>
  );
};

export default ChatAvatar;
