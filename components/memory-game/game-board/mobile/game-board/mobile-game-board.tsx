import { useRef, useEffect } from "react";
// types
import type { FC } from "react";
import type CustomMemoryGameThemePalette from "@/types/theme/memory-game";

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
  StyledBadgeContent,
  StyledTimer,
} from "@/styles/components/memory-game/game-board/mobile/mobile-game-board.style";

// styled theme
import { useTheme } from "styled-components";

// local components
import MobileScoreBoard from "@/components/memory-game/game-board/mobile/score-board/mobile-score-board";
import MobileGameBoardBackground from "@/components/memory-game/game-board/mobile/game-board/mobile-game-board-background";
import Card from "@/components/memory-game/game-board/card";
import MobileGameBoardTimer from "@/components/memory-game/game-board/mobile/game-board/mobile-game-board-timer";

// redux
import { useAppSelector } from "@/hooks/redux.hook";
import { card_list, player_turn_id } from "@/store/slice/memory-game.slice";
import { user } from "@/store/slice/user.slice";

import { gaming_user } from "@/store/slice/game.slice";
import {
  // state
  is_gaming_user_in,
} from "@/store/slice/memory-game.slice";

// mui
import { Badge } from "@mui/material";

// hooks
import useAvatar from "@/hooks/profile.hook";

const MobileGameBoard: FC = () => {
  const theme = useTheme() as CustomMemoryGameThemePalette;
  const _card_list = useAppSelector(card_list);
  const _player_turn_id = useAppSelector(player_turn_id);
  const _user = useAppSelector(user);
  const _gaming_user = useAppSelector(gaming_user);
  const user_avatar = useAvatar(_user.username ?? "");
  const gaming_user_avatar = useAvatar(_gaming_user?.username ?? "");
  const user_avatar_src = `data:image/svg+xml;base64,${btoa(user_avatar)}`;
  const gaming_user_avatar_src = `data:image/svg+xml;base64,${btoa(
    gaming_user_avatar
  )}`;

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
          <StyledTimer>
            <MobileGameBoardTimer />
          </StyledTimer>
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
            <StyledAvatarGroup max={2}>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                badgeContent={
                  <StyledBadgeContent
                    $backgroundColor={theme.palette.secondary.green}
                  />
                }
              >
                <StyledAvatar alt="user" src={user_avatar_src} />
              </Badge>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                badgeContent={
                  <StyledBadgeContent
                    $backgroundColor={
                      _is_gaming_user_in
                        ? theme.palette.secondary.green
                        : theme.palette.secondary.red
                    }
                  />
                }
              >
                <StyledAvatar alt="user" src={gaming_user_avatar_src} />
              </Badge>
            </StyledAvatarGroup>
          </StyledBottomContainer>
        </StyledGameBoardContent>
      </StyledGameBoardBackground>
    </StyledGameBoardContainer>
  );
};

export default MobileGameBoard;
