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
  StyledScoreContainer,
  StyledRank,
  StyledNameAndScoreContainer,
  StyledNameAndScore,
  StyledScore,
  StyledCrownIconContainer,
  StyledUserName,
} from "@/styles/components/result-board/score-board.style";

const CrownIcon: FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="25"
      fill="none"
      viewBox="0 0 28 25"
    >
      <path
        fill="#F5E960"
        fillRule="evenodd"
        d="M26.795 4a4 4 0 00-4-4H4.25a4 4 0 00-4 4v11.283a.124.124 0 01-.124.124.124.124 0 00-.071.226l11.184 7.779a4 4 0 004.568 0l11.185-7.779c.1-.07.05-.226-.071-.226a.124.124 0 01-.125-.124V4z"
        clipRule="evenodd"
      ></path>
      <path
        fill="#000"
        d="M18.2 14.5H7.8c-.22 0-.4.169-.4.375v.75c0 .206.18.375.4.375h10.4c.22 0 .4-.169.4-.375v-.75c0-.206-.18-.375-.4-.375zM19.8 7c-.663 0-1.2.504-1.2 1.125 0 .166.04.321.11.464L16.9 9.606c-.385.216-.883.094-1.105-.272l-2.037-3.342c.267-.206.442-.515.442-.867C14.2 4.504 13.663 4 13 4c-.662 0-1.2.504-1.2 1.125 0 .352.175.66.442.867l-2.037 3.342c-.223.366-.723.488-1.105.272L7.293 8.59c.067-.14.11-.298.11-.464 0-.621-.538-1.125-1.2-1.125C5.54 7 5 7.504 5 8.125S5.537 9.25 6.2 9.25c.065 0 .13-.01.192-.019L8.2 13.75h9.6l1.808-4.519c.062.01.127.019.192.019.662 0 1.2-.504 1.2-1.125S20.462 7 19.8 7z"
      ></path>
    </svg>
  );
};

const Score: FC<{ backgroundColor: string; showCrown: boolean }> = ({
  backgroundColor,
  showCrown,
}) => {
  return (
    <StyledScoreContainer $backgroundColor={backgroundColor}>
      <StyledRank>1.</StyledRank>
      <StyledNameAndScoreContainer>
        <StyledNameAndScore>
          <StyledScore $backgroundColor={backgroundColor}>
            {showCrown && (
              <StyledCrownIconContainer>
                <CrownIcon />
              </StyledCrownIconContainer>
            )}
            06
          </StyledScore>
          <StyledUserName>Ashish</StyledUserName>
        </StyledNameAndScore>
      </StyledNameAndScoreContainer>
    </StyledScoreContainer>
  );
};

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
      <Score backgroundColor="#329F5B" showCrown={true} />
      <Score backgroundColor="#FF2400" showCrown={false} />
    </StyledScoreBoardContainer>
  );
};

export default ScoreBoard;
