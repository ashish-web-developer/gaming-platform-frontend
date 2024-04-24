// types
import type { FC } from "react";

// local components
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
  StyledActionCtaWrapper,
  StyledActionCtaCircle,
  StyledActionCtaInnerCircle,
} from "@/styles/components/poker/poker-player/poker-player.style";

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
          <StyledActionCtaWrapper>
            <StyledActionCtaCircle>
              <StyledActionCtaInnerCircle></StyledActionCtaInnerCircle>
            </StyledActionCtaCircle>
          </StyledActionCtaWrapper>
        )}
      </StyledBetChipsWrapper>
    </StyledPokerPlayer>
  );
};

export default PokerPlayer;
