// types
import type { FC } from "react";

// styled components
import {
  StyledPokerHeader,
  StyledLogo,
  StyledRightContainer,
  StyledUserProfile,
  StyledUserProfileImage,
} from "@/styles/components/poker/poker-header/poker-header.style";

// local components
import PokerUserPoint from "@/components/poker/poker-header/poker-user-point";

// redux
import { useAppSelector } from "@/hooks/redux.hook";
import { user } from "@/store/slice/user.slice";

// hooks
import { useAvatarUrl } from "@/hooks/profile.hook";
import { IUsersWithConversation } from "@/types/store/slice/chat";

const PokerHeader: FC = () => {
  const _user = useAppSelector(user);
  const avatar_url = useAvatarUrl(_user as IUsersWithConversation);
  return (
    <StyledPokerHeader>
      <StyledLogo>
        Texas Hold'em <br />
        Showdown
      </StyledLogo>
      <StyledRightContainer>
        <PokerUserPoint />
        <StyledUserProfile>
          <StyledUserProfileImage
            alt="user-image"
            src={avatar_url}
            fill={true}
          />
        </StyledUserProfile>
      </StyledRightContainer>
    </StyledPokerHeader>
  );
};
export default PokerHeader;
