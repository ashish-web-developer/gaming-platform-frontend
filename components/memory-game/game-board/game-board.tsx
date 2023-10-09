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

const GameBoard = () => {
  return (
    <StyledGameBoardContainer>
      <StyledTopBoardContainer>
        <StyledScoreBoardContainer>
          <ScoreBoard />
        </StyledScoreBoardContainer>
        <StyledTimeBoardContainer></StyledTimeBoardContainer>
      </StyledTopBoardContainer>
      <StyledBottomGameBoardContainer></StyledBottomGameBoardContainer>
    </StyledGameBoardContainer>
  );
};

export default GameBoard;
