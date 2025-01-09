// types
import type { FC } from "react";

// styled components
import {
  StyledPokerHeader,
  StyledLogoWrapper,
  StyledCardWrapper,
  StyledUserProfile,
  StyledUserProfileImage,
} from "@/styles/components/poker/poker-header/poker-header.style";

// local components
import PokerCard from "@/components/poker/poker-card/poker-card";

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
      <StyledLogoWrapper>
        <div>
          <Logo />
        </div>
        <StyledCardWrapper>
          <PokerCard scale={0.3} />
          <PokerCard scale={0.3} is_flipped={false} />
        </StyledCardWrapper>
      </StyledLogoWrapper>
      <StyledUserProfile>
        <StyledUserProfileImage alt="user-image" src={avatar_url} fill={true} />
      </StyledUserProfile>
    </StyledPokerHeader>
  );
};
export default PokerHeader;
