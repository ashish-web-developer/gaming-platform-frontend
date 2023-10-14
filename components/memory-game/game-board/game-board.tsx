import dynamic from "next/dynamic";

// styled components
import {
  StyledGameBoardContainer,
  StyledTopBoardContainer,
  StyledScoreBoardContainer,
  StyledTimeBoardContainer,
  StyledBottomGameBoardContainer,
  StyledSkeleton,
} from "@/styles/components/memory-game/game-board/game-board.style";

// local components
import ScoreBoard from "@/components/memory-game/game-board/score-board";
import Card from "@/components/memory-game/game-board/card";
const Timer = dynamic(import("@/components/memory-game/game-board/timer"), {
  ssr: false,
});

// redux
import { useAppSelector } from "@/hooks/redux";
import {
  card_list,
  player_turn_id,
  game_complexity,
} from "@/store/slice/memory-game.slice";
import { user } from "@/store/slice/user.slice";

const GameBoard = () => {
  const _card_list = useAppSelector(card_list);
  const _user = useAppSelector(user);
  const _player_turn_id = useAppSelector(player_turn_id);
  const _game_comlexity = useAppSelector(game_complexity);
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
        {!_card_list.length
          ? new Array(_game_comlexity).fill(0).map(() => {
              return (
                <StyledSkeleton
                  animation="wave"
                  variant="rounded"
                  width={80}
                  height={120}
                />
              );
            })
          : _card_list.map((card, index) => {
              return (
                <Card
                  suit={card.suit}
                  cardColor={card.cardColor}
                  card={card.card}
                  flipped={card.flipped}
                  id={card.id}
                  key={index}
                  is_clickable={_player_turn_id == _user.id}
                />
              );
            })}
      </StyledBottomGameBoardContainer>
    </StyledGameBoardContainer>
  );
};

export default GameBoard;
