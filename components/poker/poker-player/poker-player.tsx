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
  StyledPokerChipsImage,
  StyledBetChips,
} from "@/styles/components/poker/poker-player/poker-player.style";

const PokerPlayer: FC<{
  align: "left" | "right" | "down";
}> = ({ align }) => {
  return (
    <StyledPokerPlayer $align={align}>
      <StyledPokerPlayerWrapper>
        <StyledPokerPlayerProfile>
          {/* <StyledPokerPlayerProfileImage /> */}
        </StyledPokerPlayerProfile>
        <StyledTotalChips>$ 987,5000</StyledTotalChips>
      </StyledPokerPlayerWrapper>
      <StyledBetChipsWrapper $align={align}>
        <StyledPokerChipsImage
          src={"/poker/poker-player/poker-chip.png"}
          width={50}
          height={50}
          alt="chip"
        />
        <StyledBetChips>$ 6000.00</StyledBetChips>
      </StyledBetChipsWrapper>
    </StyledPokerPlayer>
  );
};

export default PokerPlayer;
