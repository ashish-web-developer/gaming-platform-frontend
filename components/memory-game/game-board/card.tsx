// styled components
import {
  StyledCard,
  StyledBorder,
  StyledText,
  StyledTextSpan,
} from "@/styles/components/memory-game/game-board/card.style";

const Card = () => {
  return (
    <StyledCard>
      <StyledBorder />
      <StyledText>
        Cogni<StyledTextSpan>Match</StyledTextSpan>
      </StyledText>
    </StyledCard>
  );
};

export default Card;
