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
import { gaming_user } from "@/store/slice/game.slice";
import { score } from "@/store/slice/memory-game.slice";

const MobileScoreBoard: FC = forwardRef<HTMLDivElement>((props, ref) => {
  const _user = useAppSelector(user);
  const _gaming_user = useAppSelector(gaming_user);
  const _score = useAppSelector(score) as Score;
  return (
    <StyledScoreBoardContainer ref={ref}>
      <MobileScoreBoardBackground />
      <StyledScoreBoardContent>
        <StyledScoreContainer $alignItems={"flex-start"}>
          <StyledUserName>{_user.name?.split(" ")[0]}</StyledUserName>
          <StyledScore>
            {String(_score[_user.id as number]).padStart(2, "0")}
          </StyledScore>
        </StyledScoreContainer>
        <StyledScoreContainer $alignItems={"flex-end"}>
          <StyledUserName>{_gaming_user?.name?.split(" ")[0]}</StyledUserName>
          <StyledScore>
            {String(
              _gaming_user ? _score[_gaming_user.id as number] : 0
            ).padStart(2, "0")}
          </StyledScore>
        </StyledScoreContainer>
      </StyledScoreBoardContent>
    </StyledScoreBoardContainer>
  );
});

export default MobileScoreBoard;
