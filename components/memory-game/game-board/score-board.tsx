// types
import type { Score } from "@/types/store/slice/memory-game";
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
import { gaming_user } from "@/store/slice/game.slice";
import { is_gaming_user_in, score } from "@/store/slice/memory-game.slice";

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
  const _gaming_user = useAppSelector(gaming_user);
  const user_avatar_url = useAvatarUrl(_user as IUsersWithConversation);
  const gaming_user_avatar_url = useAvatarUrl(
    _gaming_user as IUsersWithConversation
  );
  const _is_gaming_user_in = useAppSelector(is_gaming_user_in);
  const _score = useAppSelector(score) as Score;
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
            {_gaming_user ? _score[_gaming_user.id as number] : 0}
          </Scores>
        </StyledScoreContainer>
        <StyledProfileContainer>
          <StyledAvatar $size="40px" $online={_is_gaming_user_in}>
            <StyledImage
              sizes="(max-width: 1400px) 10vw"
              src={gaming_user_avatar_url}
              fill={true}
              alt="user-avatar"
            />
          </StyledAvatar>
          <StyledUserName>{_gaming_user?.name?.split(" ")[0]}</StyledUserName>
        </StyledProfileContainer>
      </StyledContentContainer>
    </StyledScoreBoard>
  );
};

export default ScoreBoard;
