// types
import type { FC } from "react";
import type { IPokerPlayer } from "@/types/store/slice/poker/poker";

// styled components
import {
  StyledPokerPlayerWrapper,
  StyledPokerPlayer,
  StyledUserProfileImage,
} from "@/styles/components/poker/poker-player-seat/poker-player.style";

// hook
import { useAvatarUrl } from "@/hooks/profile.hook";

const PokerPlayer: FC<{
  player: IPokerPlayer;
  is_bettor: boolean;
  is_active: boolean;
}> = ({ player, is_bettor, is_active }) => {
  const avatar_url = useAvatarUrl(player.user ?? null);
  return (
    <StyledPokerPlayerWrapper $is_bettor={is_bettor} $is_active={is_active}>
      <StyledPokerPlayer $is_bettor={is_bettor}>
        <StyledUserProfileImage
          fill={true}
          alt="user-profile"
          src={avatar_url}
        />
      </StyledPokerPlayer>
    </StyledPokerPlayerWrapper>
  );
};

export default PokerPlayer;
