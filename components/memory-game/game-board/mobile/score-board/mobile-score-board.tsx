import { forwardRef } from "react";
// types
import type { FC } from "react";
import type { Score } from "@/types/store/slice/memory-game";

// styled components
import {
  StyledScoreBoardContainer,
  StyledScoreBoardContent,
  StyledScoreContainer,
  StyledUserName,
  StyledScore,
} from "@/styles/components/memory-game/game-board/mobile/mobile-score-board.style";

// local components
import MobileScoreBoardBackground from "@/components/memory-game/game-board/mobile/score-board/mobile-score-board-background";

// redux
import { useAppSelector } from "@/hooks/redux.hook";
import { user } from "@/store/slice/user.slice";
import {
  active_cognimatch_players,
  score,
} from "@/store/slice/cognimatch.slice";

const MobileScoreBoard: FC = forwardRef<HTMLDivElement>((props, ref) => {
  const { id: user_id, name } = useAppSelector(user);
  const { id: opponent_player_id, name: oppenent_player_name } = useAppSelector(
    active_cognimatch_players
  ).filter((player) => player.id !== user_id)[0];
  const _score = useAppSelector(score) as Score;
  return (
    <StyledScoreBoardContainer ref={ref}>
      <MobileScoreBoardBackground />
      <StyledScoreBoardContent>
        <StyledScoreContainer $alignItems={"flex-start"}>
          <StyledUserName>{name?.split(" ")[0]}</StyledUserName>
          <StyledScore>
            {String(_score[user_id as number]).padStart(2, "0")}
          </StyledScore>
        </StyledScoreContainer>
        <StyledScoreContainer $alignItems={"flex-end"}>
          <StyledUserName>{oppenent_player_name?.split(" ")[0]}</StyledUserName>
          <StyledScore>
            {String(_score[opponent_player_id]).padStart(2, "0")}
          </StyledScore>
        </StyledScoreContainer>
      </StyledScoreBoardContent>
    </StyledScoreBoardContainer>
  );
});

export default MobileScoreBoard;
