import { useRef } from "react";

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
import Timer from "@/components/memory-game/game-board/timer";

// redux
import { useAppSelector } from "@/hooks/redux.hook";
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
  const soundRef = useRef<{
    card_match_sound: HTMLAudioElement | null;
  }>({
    card_match_sound: null,
  });
  if (!soundRef.current.card_match_sound) {
    soundRef.current.card_match_sound = new Audio(
      "/memory-game/game-board/card/audio/congratulation-sound.mp3"
    );
  }
  return (
    <StyledGameBoardContainer
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
    >
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
              key={card.id}
              is_clickable={_player_turn_id == _user.id && !card.flipped}
              user={_user}
              card_image={card.card_image}
              ref={soundRef}
              player_turn_id={_player_turn_id as number}
            />
          );
        })}
      </StyledBottomGameBoardContainer>
    </StyledGameBoardContainer>
  );
};

export default GameBoard;
