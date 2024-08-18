// types
import type { FC } from "react";
import type { ITheme } from "@/theme/memory-game.theme";

// theme
import { useTheme } from "styled-components";

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

// redux
import { useAppSelector } from "@/hooks/redux.hook";
import {
  active_cognimatch_players,
  score,
} from "@/store/slice/cognimatch.slice";
import { user } from "@/store/slice/user.slice";

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

interface IScoreProps {
  backgroundColor: string;
  showCrown: boolean;
  score: number;
  name: string;
  rank: number;
}

const Score: FC<IScoreProps> = ({
  backgroundColor,
  showCrown,
  score,
  name,
  rank,
}) => {
  return (
    <StyledScoreContainer $backgroundColor={backgroundColor}>
      <StyledRank>{rank}.</StyledRank>
      <StyledNameAndScoreContainer>
        <StyledNameAndScore>
          <StyledScore $backgroundColor={backgroundColor}>
            {showCrown && (
              <StyledCrownIconContainer>
                <CrownIcon />
              </StyledCrownIconContainer>
            )}
            {score}
          </StyledScore>
          <StyledUserName>{name}</StyledUserName>
        </StyledNameAndScore>
      </StyledNameAndScoreContainer>
    </StyledScoreContainer>
  );
};

const ScoreBoard: FC = () => {
  const theme = useTheme() as ITheme;
  const _score = useAppSelector(score);
  const _score_list = _score && Object.values(_score);
  const max_score = Math.max(...Object.values(_score));
  const min_score = Math.min(...Object.values(_score));
  const max_score_user_id = Object.keys(_score).find(
    (user_id) => _score[user_id as any] == max_score
  );
  const min_score_user_id = Object.keys(_score).find(
    (user_id) => _score[user_id as any] == min_score
  );
  const _user = useAppSelector(user);
  const { id: user_id } = _user;
  const opponent_player = useAppSelector(active_cognimatch_players).filter(
    (player) => player.id !== user_id
  )[0];
  const winner =
    user_id == (max_score_user_id as any) ? _user : opponent_player;
  const loser = user_id == (min_score_user_id as any) ? _user : opponent_player;
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
            <StyledLogoSpan $color={theme.palette.primary.light}>
              Cogni
            </StyledLogoSpan>
            <StyledLogoSpan $color={theme.palette.primary.contrast}>
              Match
            </StyledLogoSpan>
          </StyledLogo>
          <StyledWinnerName>{winner?.name}</StyledWinnerName>
        </StyledScoreBoardContent>
      </StyledTrofyBannerContainer>
      <Score
        backgroundColor={theme.palette.success.main}
        showCrown={true}
        score={_score_list ? Math.max(..._score_list) : 0}
        name={winner?.name as string}
        rank={1}
      />
      <Score
        backgroundColor={theme.palette.warning.main}
        showCrown={false}
        score={_score_list ? Math.min(..._score_list) : 0}
        name={loser?.name as string}
        rank={2}
      />
    </StyledScoreBoardContainer>
  );
};

export default ScoreBoard;
