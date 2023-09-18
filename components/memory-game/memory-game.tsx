// types
import type { FC } from "react";

// local components
import WelcomeBanner from "@/components/memory-game/welcome-banner/welcome-banner";
import StartBanner from "@/components/memory-game/start-banner/start-banner";
import Chat from "@/components/memory-game/chat/chat";

// styled components
import GlobalStyles, {
  StyledContainer,
  StyledGrid,
  StyledLeftContainer,
  StyledRightContainer,
  StyledBackgroundCircleOne,
  StyledBackgroundCircleTwo,
  StyledMainText,
  StyledContentContainer,
} from "@/styles/components/memory-game/memory-game.style";

// redux
import { useAppSelector } from "@/hooks/redux";
import { user } from "@/store/slice/user.slice";
const MemoryGame: FC = () => {
  const _user = useAppSelector(user);
  return (
    <>
      <GlobalStyles />
      <StyledContainer>
        <StyledBackgroundCircleOne />
        <StyledBackgroundCircleTwo />
        <StyledContentContainer>
          <StyledMainText>Good Morning, {_user.name}</StyledMainText>
          <StyledGrid>
            <StyledLeftContainer>
              <WelcomeBanner />
              <StartBanner />
            </StyledLeftContainer>
            <StyledRightContainer>
              <Chat/>
            </StyledRightContainer>
          </StyledGrid>
        </StyledContentContainer>
      </StyledContainer>
    </>
  );
};

export default MemoryGame;
