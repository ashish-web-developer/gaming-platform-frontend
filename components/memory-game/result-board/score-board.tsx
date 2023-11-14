// types
import type { FC } from "react";

// styled components
import {
  StyledScoreBoardContainer,
  StyledTrofyBannerContainer,
  StyledScoreBoardContent,
  StyledBannerImage,
  StyledLogo,
  StyledLogoSpan,
  StyledWinnerName,
} from "@/styles/components/result-board/score-board.style";

const ScoreBoard: FC = () => {
  return (
    <StyledScoreBoardContainer>
      <StyledTrofyBannerContainer>
        <StyledScoreBoardContent>
          <StyledBannerImage
            alt="banner"
            fill={true}
            src="/memory-game/result-board/score-board/banner-image.png"
          />
          <StyledLogo>
            <StyledLogoSpan $color="#FFFFFF">Cogni</StyledLogoSpan>
            <StyledLogoSpan $color="#FF2400">Match</StyledLogoSpan>
          </StyledLogo>
          <StyledWinnerName>Ashish</StyledWinnerName>
        </StyledScoreBoardContent>
      </StyledTrofyBannerContainer>
    </StyledScoreBoardContainer>
  );
};

export default ScoreBoard;
