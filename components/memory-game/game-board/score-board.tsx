// types
import type CustomMemoryGameThemePalette from "@/types/theme/memory-game";
import type { Score } from "@/types/store/slice/memory-game";
import type { User } from "@/types/user";
// styled components
import {
  StyledScoreBoard,
  StyledContentContainer,
  StyledProfileContainer,
  StyeldUserProfile,
  StyledUserName,
  StyledBannerImage,
  StyledScoreContainer,
  StyledScore,
  StyledBadgeContent,
} from "@/styles/components/memory-game/game-board/score-board.style";

// theme
import { useTheme } from "styled-components";

// mui
import { Badge } from "@mui/material";

// hooks
import useAvatar from "@/hooks/profile";

// redux
import { useAppSelector } from "@/hooks/redux";
import { user } from "@/store/slice/user.slice";
import { gaming_user } from "@/store/slice/game.slice";
import { is_gaming_user_in, score } from "@/store/slice/memory-game.slice";

const ScoreBoard = () => {
  const theme = useTheme() as CustomMemoryGameThemePalette;
  const _user = useAppSelector(user);
  const _gaming_user = useAppSelector(gaming_user);
  const user_avatar = useAvatar(_user.name ?? "");
  const gaming_user_avatar = useAvatar(_gaming_user?.name ?? "");
  const _is_gaming_user_in = useAppSelector(is_gaming_user_in);
  const _score = useAppSelector(score) as Score;
  return (
    <StyledScoreBoard>
      <StyledBannerImage
        alt="banner-image"
        src="/memory-game/game-board/banner-image.png"
        width={60}
        height={50}
      />
      <StyledContentContainer>
        <StyledProfileContainer>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            badgeContent={
              <StyledBadgeContent
                $backgroundColor={theme.palette.secondary.green}
              />
            }
          >
            <StyeldUserProfile
              dangerouslySetInnerHTML={{
                __html: user_avatar,
              }}
            />
          </Badge>
          <StyledUserName>{_user.name?.split(" ")[0]}</StyledUserName>
        </StyledProfileContainer>
        <StyledScoreContainer>
          <StyledScore>{_score[_user.id as number]}</StyledScore>
          <StyledScore>
            {_gaming_user ? _score[_gaming_user.id as number] : 0}
          </StyledScore>
        </StyledScoreContainer>
        <StyledProfileContainer>
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
            <StyeldUserProfile
              dangerouslySetInnerHTML={{
                __html: gaming_user_avatar,
              }}
            />
          </Badge>
          <StyledUserName>{_gaming_user?.name?.split(" ")[0]}</StyledUserName>
        </StyledProfileContainer>
      </StyledContentContainer>
    </StyledScoreBoard>
  );
};

export default ScoreBoard;
