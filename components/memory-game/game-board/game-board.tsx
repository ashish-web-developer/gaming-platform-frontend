import { useRef, useEffect } from "react";

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
import { user } from "@/store/slice/user.slice";
import {
  deck,
  player_turn_id,
  active_cognimatch_players,
} from "@/store/slice/cognimatch.slice";

// gsap
import gsap from "gsap";

const GameBoard = () => {
  const _deck = useAppSelector(deck);
  const { id: user_id } = useAppSelector(user);
  const _player_turn_id = useAppSelector(player_turn_id);
  const opponent_player_id = useAppSelector(active_cognimatch_players).filter(
    (player) => player.id !== user_id
  )[0]?.id;
  const soundRef = useRef<{
    card_match_sound: HTMLAudioElement | null;
    flip_sound: HTMLAudioElement | null;
  }>({
    card_match_sound: null,
    flip_sound: null,
  });
  if (!soundRef.current.card_match_sound || !soundRef.current.flip_sound) {
    soundRef.current.card_match_sound = new Audio(
      "/memory-game/game-board/card/audio/congratulation-sound.mp3"
    );
    soundRef.current.flip_sound = new Audio(
      "/memory-game/game-board/card/audio/flip-card-sound.mp3"
    );
  }

  const game_board_container_ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const gsap_context = gsap.context(() => {
      gsap.from(game_board_container_ref.current, {
        opacity: 0,
        duration: 0.7,
        ease: "power4.inOut",
      });
    });
    return () => {
      gsap_context.revert();
    };
  }, []);

  return (
    <StyledGameBoardContainer ref={game_board_container_ref}>
      <StyledTopBoardContainer>
        <StyledScoreBoardContainer>
          <ScoreBoard />
        </StyledScoreBoardContainer>
        <StyledTimeBoardContainer>
          <Timer />
        </StyledTimeBoardContainer>
      </StyledTopBoardContainer>
      <StyledBottomGameBoardContainer>
        {_deck.map((card, index) => {
          return (
            <Card
              suit={card.suit}
              cardColor={card.cardColor}
              card={card.card}
              flipped={card.flipped}
              id={card.id}
              key={card.id}
              is_clickable={_player_turn_id == user_id && !card.flipped}
              user_id={user_id as number}
              card_image={card.card_image}
              ref={soundRef}
              player_turn_id={_player_turn_id as number}
              opponent_player_id={opponent_player_id}
            />
          );
        })}
      </StyledBottomGameBoardContainer>
    </StyledGameBoardContainer>
  );
};

export default GameBoard;
