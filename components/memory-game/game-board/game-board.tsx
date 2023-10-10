import dynamic from "next/dynamic";

// styled components
import {
  StyledGameBoardContainer,
  StyledTopBoardContainer,
  StyledScoreBoardContainer,
  StyledTimeBoardContainer,
  StyledBottomGameBoardContainer,
} from "@/styles/components/memory-game/game-board/game-board.style";

// local components
import ScoreBoard from "@/components/memory-game/game-board/score-board";
import Card from "@/components/memory-game/game-board/card";

const Timer = dynamic(import("@/components/memory-game/game-board/timer"), {
  ssr: false,
});

const GameBoard = () => {
  return (
    <StyledGameBoardContainer>
      <StyledTopBoardContainer>
        <StyledScoreBoardContainer>
          <ScoreBoard />
        </StyledScoreBoardContainer>
        <StyledTimeBoardContainer>
          <Timer />
        </StyledTimeBoardContainer>
      </StyledTopBoardContainer>
      <StyledBottomGameBoardContainer>
        {new Array(18).fill(0).map(() => {
          return <Card />;
        })}
      </StyledBottomGameBoardContainer>
    </StyledGameBoardContainer>
  );
};

export default GameBoard;
