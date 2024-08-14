// types
import type { FC } from "react";
import type { IUsersWithConversation } from "@/types/store/slice/chat";
// styled components
import {
  StyledScoreBoard,
  StyledContentContainer,
  StyledProfileContainer,
  StyledAvatar,
  StyledImage,
  StyledUserName,
  StyledBannerImage,
  StyledScoreContainer,
  StyledScore,
} from "@/styles/components/memory-game/game-board/score-board.style";

// hooks
import { useAvatarUrl } from "@/hooks/profile.hook";

// redux
import { useAppSelector } from "@/hooks/redux.hook";
import { user } from "@/store/slice/user.slice";
import {
  active_cognimatch_players,
  score,
} from "@/store/slice/cognimatch.slice";

const Scores: FC<{ children: number }> = ({ children }) => {
  return (
    <StyledScore
      key={children}
      initial={{
        scale: 2,
      }}
      animate={{
        scale: 1,
      }}
    >
      {children}
    </StyledScore>
  );
};

const ScoreBoard = () => {
  const _user = useAppSelector(user);
  const { id: user_id } = _user;
  const _active_cognimatch_players = useAppSelector(active_cognimatch_players);
  const opponent_player = _active_cognimatch_players.filter(
    (player) => player.id !== user_id
  )[0];
  const user_avatar_url = useAvatarUrl(_user as IUsersWithConversation);
  const gaming_user_avatar_url = useAvatarUrl(opponent_player);
  const is_gaming_user_in = _active_cognimatch_players.length == 2;
  const _score = useAppSelector(score);
  return (
    <StyledScoreBoard
      initial={{
        x: 100,
        scale: 2,
      }}
      animate={{
        x: 0,
        scale: 1,
      }}
    >
      <StyledContentContainer>
        <StyledProfileContainer>
          <StyledAvatar $size="40px" $online={true}>
            <StyledImage
              sizes="(max-width: 1400px) 10vw"
              src={user_avatar_url}
              fill={true}
              alt="user-avatar"
            />
          </StyledAvatar>
          <StyledUserName>{_user.name?.split(" ")[0]}</StyledUserName>
        </StyledProfileContainer>
        <StyledScoreContainer>
          <Scores>{_score[_user.id as number]}</Scores>
          <StyledBannerImage
            alt="banner-image"
            src="/memory-game/game-board/banner-image.png"
            width={60}
            height={50}
          />
          <Scores>
            {opponent_player ? _score[opponent_player.id as number] : 0}
          </Scores>
        </StyledScoreContainer>
        <StyledProfileContainer>
          <StyledAvatar $size="40px" $online={is_gaming_user_in}>
            <StyledImage
              sizes="(max-width: 1400px) 10vw"
              src={gaming_user_avatar_url}
              fill={true}
              alt="user-avatar"
            />
          </StyledAvatar>
          <StyledUserName>
            {opponent_player?.name?.split(" ")[0]}
          </StyledUserName>
        </StyledProfileContainer>
      </StyledContentContainer>
    </StyledScoreBoard>
  );
};

export default ScoreBoard;
