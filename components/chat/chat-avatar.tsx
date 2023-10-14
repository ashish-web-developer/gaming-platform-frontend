import { useContext} from "react";
// styled components
import {
  StyledAvatarContainer,
  StyledProfileAvatar,
} from "@/styles/components/chat/chat-avatar.style";

// context
import { ColorsContext } from "context";
// types
import type { FC } from "react";

// hook
import useRandomColor from "@/hooks/colors";
import useAvatar from "@/hooks/profile";

interface Props {
  width: number;
  height: number;
  username: string;
}
const ChatAvatar: FC<Props> = ({ width, height, username }) => {
  const colors = useContext(ColorsContext);
  const color = useRandomColor(colors);
  const avatar = useAvatar(username ?? "");
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
