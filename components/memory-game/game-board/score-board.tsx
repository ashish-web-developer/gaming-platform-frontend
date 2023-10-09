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
} from "@/styles/components/memory-game/game-board/score-board.style";

// hooks
import useAvatar from "@/hooks/profile";

// redux
import { useAppSelector } from "@/hooks/redux";
import { user } from "@/store/slice/user.slice";
import { gaming_user } from "@/store/slice/game.slice";



const ScoreBoard = () => {
  const _user = useAppSelector(user);
  const _gaming_user = useAppSelector(gaming_user);
  const user_avatar = useAvatar(_user.name ?? "");
  const gaming_user_avatar = useAvatar(_gaming_user?.name ?? "");
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
          <StyeldUserProfile
            dangerouslySetInnerHTML={{
              __html: user_avatar,
            }}
          />
          <StyledUserName>Ashish</StyledUserName>
        </StyledProfileContainer>
        <StyledScoreContainer>
          <StyledScore>06</StyledScore>
          <StyledScore>07</StyledScore>
        </StyledScoreContainer>
        <StyledProfileContainer>
          <StyeldUserProfile
            dangerouslySetInnerHTML={{
              __html: user_avatar,
            }}
          />
          <StyledUserName>Ashish</StyledUserName>
        </StyledProfileContainer>
      </StyledContentContainer>
    </StyledScoreBoard>
  );
};

export default ScoreBoard;
