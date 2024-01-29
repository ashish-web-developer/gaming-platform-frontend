import { useRef } from "react";
// types
import type { FC } from "react";

// styled components
import {
  StyledGameBoardContainer,
  StyledGameBoardBackground,
  StyledGameBoardContent,
  StyledCardContainer,
  StyledBottomContainer,
  StyledTurnIndicator,
  StyledTrofyCircle,
  StyledText,
  StyledAvatarGroup,
  StyledAvatar,
  StyledTimer,
} from "@/styles/components/memory-game/game-board/mobile/mobile-game-board.style";

// local components
import MobileScoreBoard from "@/components/memory-game/game-board/mobile/score-board/mobile-score-board";
import MobileGameBoardBackground from "@/components/memory-game/game-board/mobile/game-board/mobile-game-board-background";
import Card from "@/components/memory-game/game-board/card";

// hoc
import withTimer from "@/hoc/memory-game/with-timer";

// redux
import { useAppSelector } from "@/hooks/redux.hook";
import { card_list, player_turn_id } from "@/store/slice/memory-game.slice";
import { user } from "@/store/slice/user.slice";

import { gaming_user } from "@/store/slice/game.slice";
import {
  // state
  is_gaming_user_in,
} from "@/store/slice/memory-game.slice";

// hooks
import useAvatar from "@/hooks/profile.hook";

const MobileGameBoard: FC<{
  timer_count: number;
}> = ({ timer_count }) => {
  const _card_list = useAppSelector(card_list);
  const _player_turn_id = useAppSelector(player_turn_id);
  const _user = useAppSelector(user);
  const _gaming_user = useAppSelector(gaming_user);
  const user_avatar = useAvatar(_user.username ?? "");
  const gaming_user_avatar = useAvatar(_gaming_user?.username ?? "");

  const _is_gaming_user_in = useAppSelector(is_gaming_user_in);
  const soundRef = useRef<{
    flip_sound: HTMLAudioElement | null;
    card_match_sound: HTMLAudioElement | null;
  }>({
    flip_sound: null,
    card_match_sound: null,
  });

  if (!soundRef.current.flip_sound || !soundRef.current.card_match_sound) {
    soundRef.current.flip_sound = new Audio(
      "/memory-game/game-board/card/audio/flip-card-sound.mp3"
    );
    soundRef.current.card_match_sound = new Audio(
      "/memory-game/game-board/card/audio/congratulation-sound.mp3"
    );
  }

  return (
    <StyledGameBoardContainer>
      <MobileScoreBoard />
      <StyledGameBoardBackground>
        <MobileGameBoardBackground />
        <StyledGameBoardContent>
          <StyledTimer>{String(timer_count).padStart(2, "0")}</StyledTimer>
          <StyledCardContainer>
            {_card_list.map((card, index) => {
              return (
                <Card
                  suit={card.suit}
                  cardColor={card.cardColor}
                  card={card.card}
                  flipped={card.flipped}
                  id={card.id}
                  key={index}
                  is_clickable={_player_turn_id == _user.id}
                  user={_user}
                  card_image={card.card_image}
                  player_turn_id={_player_turn_id as number}
                  ref={soundRef}
                />
              );
            })}
          </StyledCardContainer>
          <StyledBottomContainer>
            <StyledTurnIndicator>
              <StyledTrofyCircle />
              <StyledText>
                {_player_turn_id == _user.id ? "Your Turn" : "Waiting..."}
              </StyledText>
            </StyledTurnIndicator>
            <StyledAvatarGroup>
              <StyledAvatar
                $size="40px"
                $border="3px solid #fff"
                $online={true}
                dangerouslySetInnerHTML={{
                  __html: user_avatar,
                }}
              />
              <StyledAvatar
                $size="40px"
                $border="3px solid #fff"
                $online={_is_gaming_user_in}
                dangerouslySetInnerHTML={{
                  __html: gaming_user_avatar,
                }}
              />
            </StyledAvatarGroup>
          </StyledBottomContainer>
        </StyledGameBoardContent>
      </StyledGameBoardBackground>
    </StyledGameBoardContainer>
  );
};

export default withTimer(MobileGameBoard);
