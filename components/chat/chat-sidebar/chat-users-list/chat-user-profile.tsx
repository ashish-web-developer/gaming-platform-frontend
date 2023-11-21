// type
import type { FC } from "react";
import type { IConversation } from "@/types/store/slice/chat";
// styled components
import {
  StyledUsersProfile,
  StyledUserImage,
  StyledUserDetails,
  StyledUserName,
  StyledUserMessage,
} from "@/styles/components/chat/chat-sidebar/chat-users-list/chat-users-profile.style";

// hooks
import useAvatar from "@/hooks/profile";
interface IProps {
  name: string;
  username: string;
  sent_messsages: IConversation[] | undefined;
  received_messages: IConversation[] | undefined;
}
const ChatUserProfile: FC<IProps> = ({
  name,
  username,
  sent_messsages,
  received_messages,
}) => {
  const avatar = useAvatar(username ?? "");
  return (
    <StyledUsersProfile>
      <StyledUserImage
        dangerouslySetInnerHTML={{
          __html: avatar,
        }}
      />
      <StyledUserDetails>
        <StyledUserName>{name}</StyledUserName>
        <StyledUserMessage>What is up men?</StyledUserMessage>
      </StyledUserDetails>
    </StyledUsersProfile>
  );
};

export default ChatUserProfile;
