// types
import type { ITheme } from "@/theme/memory-game.theme";
import type { Score } from "@/types/store/slice/memory-game";
import type { FC } from "react";
// styled components
import {
  StyledScoreBoard,
  StyledContentContainer,
  StyledProfileContainer,
  StyledAvatar,
  StyledUserName,
  StyledBannerImage,
  StyledScoreContainer,
  StyledScore,
} from "@/styles/components/memory-game/game-board/score-board.style";

// hooks
import useAvatar from "@/hooks/profile.hook";

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
  const user_avatar = useAvatar(_user.name ?? "");
  const gaming_user_avatar = useAvatar(_gaming_user?.name ?? "");
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
          <StyledAvatar
            $size="40px"
            $online={true}
            dangerouslySetInnerHTML={{
              __html: user_avatar,
            }}
          />
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
          <StyledAvatar
            $size="40px"
            $online={_is_gaming_user_in}
            dangerouslySetInnerHTML={{
              __html: gaming_user_avatar,
            }}
          />
          <StyledUserName>{_gaming_user?.name?.split(" ")[0]}</StyledUserName>
        </StyledProfileContainer>
      </StyledContentContainer>
    </StyledScoreBoard>
  );
};

export default ScoreBoard;
