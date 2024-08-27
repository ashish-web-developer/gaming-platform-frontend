import { useRef, useEffect, useState } from "react";
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
  StyledInfoTooltipWrapper,
  StyledGirlImageWrapper,
  StyledGirlImage,
  StyledBannerGirlImageWrapper,
  StyledBannerGirlImage,
  StyledInfoTooltip,
  StyledInfoTooltipText,
} from "@/styles/components/login/login-container.style";

// theme
import { ThemeProvider } from "styled-components";
import { Theme } from "@/theme/poker.theme";

// local components
import PokerCard from "@/components/poker/poker-card/poker-card";
import LoginForm from "@/components/login/login-form";

// vector
import PokerVector from "@/components/login/vector/poker-vector";
import CognimatchVector from "@/components/login/vector/cognimatch-vector";
import CtaVector from "@/components/login/vector/cta-vector";
import StripeVector from "@/components/login/vector/stripe-vector";
import InfoTooltipVector from "@/components/login/vector/info-tooltip-vector";

// gsap
import gsap from "gsap";

const LoginContainer: FC = () => {
  const gsap_context_ref = useRef<gsap.Context>();
  const page_container_ref = useRef<HTMLDivElement>(null);
  const [show_login, set_show_login] = useState(false);

  useEffect(() => {
    gsap_context_ref.current = gsap.context((self) => {
      gsap.to("#logo-container", {
        rotate: -5,
        duration: 1,
        ease: "bounce",
        delay: 1,
      });
      gsap.to("button", {
        rotate: 0,
        duration: 1,
        ease: "bounce",
        delay: 1,
      });
    }, page_container_ref);
    return () => {
      gsap_context_ref.current?.revert();
    };
  }, [show_login]);
  return (
    <StyledPage ref={page_container_ref}>
      {show_login ? (
        <>
          <StyledLogoContainer id="logo-container" $show_login={show_login}>
            <StyledLogo $fontSize="2rem">Fortune Realm</StyledLogo>
          </StyledLogoContainer>
          <StyledInfoTooltipWrapper>
            <StyledGirlImageWrapper $width="450px" $height="465px">
              <StyledGirlImage
                fill={true}
                alt="girl-image"
                src="/login/login-girl.png"
                sizes="(max-width: 1400px) 25vw"
              />
            </StyledGirlImageWrapper>
            <StyledInfoTooltip>
              <InfoTooltipVector />
              <StyledInfoTooltipText>
                Hey there! Welcome to Fortune Realm!
              </StyledInfoTooltipText>
            </StyledInfoTooltip>
          </StyledInfoTooltipWrapper>
        </>
      ) : (
        <>
          <StyledStripeVectorWrapper>
            <StripeVector />
            <StyledStripeText>Win big Prizes!</StyledStripeText>
          </StyledStripeVectorWrapper>
          <StyledGirlImageWrapper $width="587px" $height="643px">
            <StyledGirlImage
              fill={true}
              alt="girl-image"
              src="/login/girl-image.png"
              sizes="(max-width: 1400px) 30vw"
            />
          </StyledGirlImageWrapper>
        </>
      )}
      <StyledContentContainer>
        {show_login ? (
          <>
            <LoginForm />
          </>
        ) : (
          <>
            <StyledLogoContainer id="logo-container" $show_login={show_login}>
              <StyledLogo $fontSize="5rem">Fortune Realm</StyledLogo>
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
                      sizes="(max-width: 1400px) 20vw"
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
                set_show_login(true);
              }}
            >
              <CtaVector />
              <StyledCtaTextWrapper>Unlock Fun</StyledCtaTextWrapper>
            </StyledCta>
          </>
        )}
      </StyledContentContainer>
    </StyledPage>
  );
};
export default LoginContainer;
