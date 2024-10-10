// types
import type { FC } from "react";

// theme
import { useTheme } from "styled-components";

// local components
import MobileGameBanner from "@/components/login/game-banner/mobile-game-banner";

// styled components
import {
  StyledPage,
  StyledBottomContentContainer,
  StyledLogoContainer,
  StyledLogo,
  StyledLogoSubtitle,
  StyledCta,
  StyledCtaTextWrapper,
} from "@/styles/components/login/welcome-login-screen/mobile-welcome-login-screen.style";

// vector
import CtaVector from "@/components/login/vector/cta-vector";

const MobileWelcomeLoginScreen: FC = () => {
  const theme = useTheme();
  return (
    <StyledPage>
      <MobileGameBanner
        banner_type="cognimatch"
        main_color={"#F42C04"}
        background_image="url(/memory-game/background/dark-background.png)"
        background_opacity={0.2}
      />
      <MobileGameBanner
        banner_type="poker"
        main_color={"#F5D547"}
        background_image="url(/poker/background.jpg)"
        background_opacity={1}
      />
      <StyledBottomContentContainer>
        <StyledLogoContainer>
          <StyledLogo>Fortune Realm</StyledLogo>
          <StyledLogoSubtitle>
            Your Ultimate destination for thrilling casino games
          </StyledLogoSubtitle>
        </StyledLogoContainer>
        <StyledCta onClick={() => {}}>
          <CtaVector />
          <StyledCtaTextWrapper>Unlock Fun</StyledCtaTextWrapper>
        </StyledCta>
      </StyledBottomContentContainer>
    </StyledPage>
  );
};
export default MobileWelcomeLoginScreen;
