// types
import type { FC } from "react";

// styled components
import {
  StyledPokerPlayer,
  StyledPokerPlayerWrapper,
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

const PokerPlayer: FC<{
  align: "left" | "right" | "down";
  show_action_cta?: boolean;
  is_dealer?: boolean;
}> = ({ align, show_action_cta = false, is_dealer = false }) => {
  return (
    <StyledPokerPlayer $show_action_cta={show_action_cta} $align={align}>
      <StyledPokerPlayerWrapper>
        <StyledPokerPlayerProfile>
          {/* <StyledPokerPlayerProfileImage /> */}
        </StyledPokerPlayerProfile>
        <StyledTotalChips>$ 987,5000</StyledTotalChips>
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
