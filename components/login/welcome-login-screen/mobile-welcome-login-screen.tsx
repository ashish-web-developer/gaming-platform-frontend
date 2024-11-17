import { useRef } from "react";
// types
import type { FC } from "react";

// styled components
import {
  StyledPage,
  StyledImageContainer,
  StyledImage,
  StyledPokerCardWrapper,
  StyledLogoContainer,
  StyledLogo,
  StyledSubTitle,
  StyledBottomShadow,
  StyledPlayCta,
  StyledPlayCtaVector,
} from "@/styles/components/login/welcome-login-screen/mobile-welcome-login-screen.style";

// local components
import PokerCard from "@/components/poker/poker-card/poker-card";

// theme
import { ThemeProvider } from "styled-components";
import { Theme as PokerTheme } from "@/theme/poker.theme";

// vector
import LoginPlayCtaVector from "@/components/login/vector/login-play-cta-vector";

const MobileWelcomeLoginScreen: FC<{
  updateShowLogin: (show: boolean) => void;
}> = ({ updateShowLogin }) => {
  const container_ref = useRef<HTMLDivElement>(null);

  return (
    <StyledPage ref={container_ref}>
      <StyledImageContainer
        $width="207px"
        $height="182px"
        $left="-14px"
        $top="0px"
      >
        <StyledImage
          src="/login/welcome-login-screen/spider-with-web.png"
          fill={true}
          alt="spider-web"
        />
      </StyledImageContainer>
      <StyledImageContainer
        $width="157px"
        $height="168px"
        $top="-60px"
        $right="-60px"
      >
        <StyledImage
          src="/login/welcome-login-screen/web-vector.png"
          fill={true}
          alt="spider-web"
        />
      </StyledImageContainer>
      <StyledImageContainer
        $width="90px"
        $height="76px"
        $top="60px"
        $left="50%"
      >
        <StyledImage
          src="/login/welcome-login-screen/finger-prints-1.png"
          fill={true}
          alt="finger-prints-1"
        />
      </StyledImageContainer>
      <StyledImageContainer
        $width="38px"
        $height="38px"
        $bottom="60%"
        $right="42px"
      >
        <StyledImage
          src="/login/welcome-login-screen/finger-prints-2.png"
          fill={true}
          alt="finger-prints-1"
        />
      </StyledImageContainer>
      <ThemeProvider theme={PokerTheme}>
        <StyledPokerCardWrapper $left="32px" $top="180px" $rotate="-17deg">
          <PokerCard rank="K" suit="club" />
        </StyledPokerCardWrapper>
        <StyledPokerCardWrapper $right="36px" $top="130px" $rotate="11deg">
          <PokerCard rank="J" suit="diamond" />
        </StyledPokerCardWrapper>
      </ThemeProvider>
      <StyledImageContainer
        $width="513px"
        $height="649px"
        $bottom="-60px"
        $left="50%"
        $translateX="-50%"
      >
        <StyledImage
          src="/login/welcome-login-screen/main-image.png"
          fill={true}
          alt="main image"
        />
      </StyledImageContainer>
      <StyledLogoContainer>
        <StyledLogo>Fortune Realm</StyledLogo>
        <StyledSubTitle>
          YOUR ULTIMATE DESTINATION FOR THRLLING CASINO GAMES
        </StyledSubTitle>
      </StyledLogoContainer>
      <StyledBottomShadow>
        <StyledPlayCta onClick={() => updateShowLogin(true)}>
          <StyledPlayCtaVector>
            <LoginPlayCtaVector is_mobile={true} />
          </StyledPlayCtaVector>
        </StyledPlayCta>
      </StyledBottomShadow>
    </StyledPage>
  );
};
export default MobileWelcomeLoginScreen;
