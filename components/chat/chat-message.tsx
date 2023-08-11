//types
import type Colors from "@/types/data/colors";
import type { FC } from "react";

// styled components
import {
  StyledChatParentContainer,
  StyledChatMessageContainer,
  StyledChatMessageUserName,
  StyledChatMessage,
  StyledChatBottom,
  StyledChatTime,
} from "@/styles/components/chat/chat-message.style";

// local components
import ChatAvatar from "@/components/chat/chat-avatar";

// hooks
import useAvatar from "@/hooks/profile";

interface Props {
  message: string;
  date: string;
  username: string;
  name: string;
  align: string;
  colors: Colors;
  flexDirection: "row" | "row-reverse";
  backgroundColor:string;
  chatTimeColor:string;
}
const ChatMessage: FC<Props> = ({
  message,
  date,
  username,
  name,
  align,
  colors,
  flexDirection,
  backgroundColor,
  chatTimeColor
}) => {
  const avatar = useAvatar(username ?? "");
  const color = useColor(colors);
  return (
    <StyledChatParentContainer $flexDirection={flexDirection} $align={align}>
      <ChatAvatar color={color} width={60} height={60} avatar={avatar} />
      <StyledChatMessageContainer $backgroundColor={backgroundColor}>
        <StyledChatMessageUserName>{name}</StyledChatMessageUserName>
        <StyledChatMessage>{message}</StyledChatMessage>
        <StyledChatBottom>
          <StyledChatTime $color={chatTimeColor}>{date}</StyledChatTime>
        </StyledChatBottom>
      </StyledChatMessageContainer>
    </StyledChatParentContainer>
  );
};

const useColor = (colors: Colors) => {
  const colorsLength = colors.length;
  return colors[Math.floor(Math.random() * colorsLength)];
};

export default ChatMessage;
