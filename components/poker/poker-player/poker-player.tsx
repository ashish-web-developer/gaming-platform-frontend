// types
import type { FC } from "react";
import type { IPokerPlayer } from "@/types/store/slice/poker/poker";

// styled components
import {
  StyledPokerPlayer,
  StyledPokerPlayerWrapper,
  StyledPokerPlayerProfileWrapper,
  StyledPokerPlayerProfile,
  StyledPokerPlayerProfileImage,
  StyledTotalChips,
  StyledBetChipsWrapper,
  StyledPokerChipsWrapper,
  StyledPokerChipsImage,
  StyledBetChips,
} from "@/styles/components/poker/poker-player/poker-player.style";

// local components
import PokerActionCta from "@/components/poker/poker-player/poker-action-cta";

// hooks
import { useAvatarUrl } from "@/hooks/profile.hook";

const PokerPlayer: FC<{
  align: "left" | "right" | "down";
  show_action_cta?: boolean;
  is_dealer?: boolean;
  poker_player: IPokerPlayer | undefined;
}> = ({ align, show_action_cta = false, is_dealer = false, poker_player }) => {
  const avatar_url = useAvatarUrl(poker_player?.user ?? null);
  return (
    <StyledPokerPlayer $show_action_cta={show_action_cta} $align={align}>
      <StyledPokerPlayerWrapper>
        <StyledPokerPlayerProfileWrapper $is_active={Boolean(poker_player)}>
          <StyledPokerPlayerProfile>
            {poker_player && (
              <StyledPokerPlayerProfileImage
                src={avatar_url}
                alt="user"
                fill={true}
              />
            )}
          </StyledPokerPlayerProfile>
        </StyledPokerPlayerProfileWrapper>
        <StyledTotalChips>
          {Boolean(poker_player?.total_chips_left)
            ? `$ ${(
                poker_player?.total_chips_left ?? 0 * 1000
              ).toLocaleString()}`
            : "Waiting..."}
        </StyledTotalChips>
      </StyledPokerPlayerWrapper>
      <StyledBetChipsWrapper $align={align}>
        <StyledPokerChipsWrapper $align={align} $is_dealer={is_dealer}>
          <StyledPokerChipsImage
            src={"/poker/poker-player/poker-chip.png"}
            fill={true}
            alt="chip"
          />
        </StyledPokerChipsWrapper>
        {!show_action_cta ? (
          <StyledBetChips>$ 6000.00</StyledBetChips>
        ) : (
          <PokerActionCta />
        )}
      </StyledBetChipsWrapper>
    </StyledPokerPlayer>
  );
};

export default PokerPlayer;
