// type
import type { FC } from "react";
import type { IUsersWithConversation } from "@/types/store/slice/chat";
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

// redux
import { useAppDispatch } from "@/hooks/redux";
import { updateActiveUser, fetchMessages } from "@/store/slice/chat.slice";
interface IProps {
  user: IUsersWithConversation;
}
const ChatUserProfile: FC<IProps> = ({ user }) => {
  const dispatch = useAppDispatch();
  const avatar = useAvatar(user.username ?? "");
  return (
    <StyledUsersProfile
      onClick={() => {
        dispatch(updateActiveUser(user));
        dispatch(fetchMessages());
      }}
    >
      <StyledUserImage
        dangerouslySetInnerHTML={{
          __html: avatar,
        }}
      />
      <StyledUserDetails>
        <StyledUserName>{user.name}</StyledUserName>
        <StyledUserMessage>What is up men?</StyledUserMessage>
      </StyledUserDetails>
    </StyledUsersProfile>
  );
};

export default ChatUserProfile;
