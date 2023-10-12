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

// redux
import { useAppSelector } from "@/hooks/redux";
import { card_list } from "@/store/slice/memory-game.slice";

const GameBoard = () => {
  const _card_list = useAppSelector(card_list);
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
        {_card_list.map((card, index) => {
          return (
            <Card
              suit={card.suit}
              cardColor={card.cardColor}
              card={card.card}
              flipped={card.flipped}
              id={card.id}
              key={index}
            />
          );
        })}
      </StyledBottomGameBoardContainer>
    </StyledGameBoardContainer>
  );
};

export default GameBoard;
