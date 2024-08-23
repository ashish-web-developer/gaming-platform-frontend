// types
import type { FC } from "react";

// styled components
import {
  StyledPage,
  StyledStripeVectorWrapper,
  StyledStripeText,
  StyledContentContainer,
  StyledLogoContainer,
  StyledLogo,
  StyledSubTitle,
  StyledGamesBannerContainer,
  StyledGamesVectorWrapper,
  StyledGamesBannerContent,
  StyledPokerCardWrapper,
  StyledBannerGameLogo,
  StyledCta,
  StyledCtaTextWrapper,
  StyledGirlImageWrapper,
  StyledGirlImage,
  StyledBannerGirlImageWrapper,
  StyledBannerGirlImage,
} from "@/styles/components/login/login-container.style";

// theme
import { ThemeProvider } from "styled-components";
import { Theme } from "@/theme/poker.theme";

// local components
import PokerCard from "@/components/poker/poker-card/poker-card";

// vector
import PokerVector from "@/components/login/vector/poker-vector";
import CognimatchVector from "@/components/login/vector/cognimatch-vector";
import CtaVector from "@/components/login/vector/cta-vector";
import StripeVector from "@/components/login/vector/stripe-vector";

const LoginContainer: FC = () => {
  return (
    <StyledPage>
      <StyledStripeVectorWrapper>
        <StripeVector />
        <StyledStripeText>Win big Prizes!</StyledStripeText>
      </StyledStripeVectorWrapper>
      <StyledGirlImageWrapper>
        <StyledGirlImage
          fill={true}
          alt="girl-image"
          src="/login/girl-image.png"
        />
      </StyledGirlImageWrapper>
      <StyledContentContainer>
        <StyledLogoContainer>
          <StyledLogo>Fortune Realm</StyledLogo>
          <StyledSubTitle>
            Your Ultimate Destination for Thrilling Casino Games
          </StyledSubTitle>
        </StyledLogoContainer>
        <StyledGamesBannerContainer>
          <StyledGamesVectorWrapper $height="309px">
            <PokerVector />
            <StyledGamesBannerContent>
              <ThemeProvider theme={Theme}>
                <StyledPokerCardWrapper
                  $bottom="32px"
                  $left="100px"
                  $rotate="-10deg"
                >
                  <PokerCard rank="K" suit="club" />
                </StyledPokerCardWrapper>
                <StyledPokerCardWrapper
                  $top="32px"
                  $right="50px"
                  $rotate="15deg"
                >
                  <PokerCard rank="Q" suit="diamond" />
                </StyledPokerCardWrapper>
              </ThemeProvider>
              <StyledBannerGirlImageWrapper>
                <StyledBannerGirlImage
                  src="/chat/invite-dialog/poker-background.png"
                  fill={true}
                  alt="banner-image"
                />
              </StyledBannerGirlImageWrapper>
              <StyledBannerGameLogo>
                Texas Hold’em <br />
                showdown
              </StyledBannerGameLogo>
            </StyledGamesBannerContent>
          </StyledGamesVectorWrapper>
          <StyledGamesVectorWrapper
            $height="309px"
            $margin="60px 0px 0px -70px"
          >
            <CognimatchVector />
            <StyledGamesBannerContent></StyledGamesBannerContent>
          </StyledGamesVectorWrapper>
        </StyledGamesBannerContainer>
        <StyledCta>
          <CtaVector />
          <StyledCtaTextWrapper>Unlock Fun</StyledCtaTextWrapper>
        </StyledCta>
      </StyledContentContainer>
    </StyledPage>
  );
};
export default LoginContainer;
