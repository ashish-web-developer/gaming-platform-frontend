// types
import type { FC } from "react";

// styled components
import {
  StyledPokerHeader,
  StyledUserProfile,
  StyledUserProfileImage,
} from "@/styles/components/poker/poker-header/poker-header.style";

// redux
import { useAppSelector } from "@/hooks/redux.hook";
import { User } from "@/store/slice/login.slice";

// hooks
import { useAvatarUrl } from "@/hooks/profile.hook";
import { IUsersWithConversation } from "@/types/store/slice/chat";

// icons
import Logo from "@/components/poker/icons/logo";

const PokerHeader: FC = () => {
  const user = useAppSelector(User);
  const avatar_url = useAvatarUrl(user as IUsersWithConversation);
  return (
    <StyledPokerHeader>
      <Logo />
      <StyledUserProfile>
        <StyledUserProfileImage alt="user-image" src={avatar_url} fill={true} />
      </StyledUserProfile>
    </StyledPokerHeader>
  );
};
export default PokerHeader;
