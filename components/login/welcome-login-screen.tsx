import { useEffect } from "react";
// types
import type { FC } from "react";

// styled components
import {
  StyledPage,
  StyledContentContainer,
  StyledStripeVectorWrapper,
  StyledStripeText,
  StyledLogoContainer,
  StyledLogo,
  StyledLogoSpan,
  StyledSubTitle,
  StyledGamesBannerContainer,
  StyledGamesVectorWrapper,
  StyledGamesBannerContent,
  StyledPokerCardWrapper,
  StyledBannerGirlImageWrapper,
  StyledBannerGirlImage,
  StyledBannerGameLogo,
  StyledCta,
  StyledCtaTextWrapper,
} from "@/styles/components/login/login-welcome-screen.style";

// theme
import { ThemeProvider } from "styled-components";
import { Theme as PokerTheme } from "@/theme/poker.theme";

// local components
import PokerCard from "@/components/poker/poker-card/poker-card";

// vector
import StripeVector from "@/components/login/vector/stripe-vector";
import CtaVector from "@/components/login/vector/cta-vector";
import CognimatchVector from "@/components/login/vector/cognimatch-vector";
import PokerVector from "@/components/login/vector/poker-vector";

// gsap
import gsap from "gsap-trial";

const WelcomeLoginScreen: FC<{
  updateShowLogin: (show: boolean) => void;
}> = ({ updateShowLogin }) => {
  useEffect(() => {
    const gsap_context = gsap.context(() => {
      gsap
        .timeline()
        .from(".logo-span", {
          delay: 1,
          scale: 1.3,
          duration: 1,
          opacity: 0,
          ease: "power2.inOut",
          stagger: 0.1,
        })
        .to(".logo-container", {
          rotate: -5,
          duration: 0.6,
          ease: "bounce",
        })
        .to(
          "button",
          {
            rotate: 0,
            duration: 0.6,
            ease: "bounce",
          },
          "<"
        );
    });
    return () => {
      gsap_context.revert();
    };
  }, []);
  return (
    <StyledPage>
      <StyledStripeVectorWrapper>
        <StripeVector />
        <StyledStripeText>Win big Prizes!</StyledStripeText>
      </StyledStripeVectorWrapper>
      <StyledContentContainer>
        <StyledLogoContainer className="logo-container">
          <StyledLogo>
            {"Fortune Realm".split("").map((val, index) => {
              return (
                <StyledLogoSpan
                  key={`logo-span-${index}`}
                  className="logo-span"
                >
                  {val === " " ? "\u00A0" : val}
                </StyledLogoSpan>
              );
            })}
          </StyledLogo>
          <StyledSubTitle>
            Your Ultimate Destination for Thrilling Casino Games
          </StyledSubTitle>
        </StyledLogoContainer>
        <StyledGamesBannerContainer>
          <StyledGamesVectorWrapper $height="309px">
            <PokerVector />
            <StyledGamesBannerContent>
              <ThemeProvider theme={PokerTheme}>
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
                  sizes="(max-width: 1400px) 20vw"
                  priority={true}
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
        <StyledCta
          onClick={() => {
            updateShowLogin(true);
          }}
        >
          <CtaVector />
          <StyledCtaTextWrapper>Unlock Fun</StyledCtaTextWrapper>
        </StyledCta>
      </StyledContentContainer>
    </StyledPage>
  );
};

export default WelcomeLoginScreen;
