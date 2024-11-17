// types
import type { FC } from "react";

// styled components
import {
  StyledPage,
  StyledContentContainer,
  StyledGridColumnsContent,
  StyledRightContentContainer,
  StyledImageContainer,
  StyledImage,
  StyledLogoContainer,
  StyledLogo,
  StyledSubTitle,
  StyledGameBannerContainer,
  StyledBannerGameLogo,
  StyledCornerVector,
  StyledPokerCardWrapper,
  StyledPlayCta,
  StyledPlayCtaVector,
} from "@/styles/components/login/welcome-login-screen/welcome-login-screen.style";

// theme
import { ThemeProvider } from "styled-components";
import { Theme as PokerTheme } from "@/theme/poker.theme";

// local components
import PokerCard from "@/components/poker/poker-card/poker-card";

// vector
import LoginPlayCtaVector from "../vector/login-play-cta-vector";
import CornerVector from "@/components/login/vector/corner-vector";

const WelcomeLoginScreen: FC<{
  updateShowLogin: (show: boolean) => void;
}> = ({ updateShowLogin }) => {
  return (
    <StyledPage>
      <StyledImageContainer
        $width="260px"
        $height="251px"
        $top="0px"
        $left="-8px"
      >
        <StyledImage
          src="/login/welcome-login-screen/spider-with-web.png"
          fill={true}
          alt="spider-web"
        />
      </StyledImageContainer>
      <StyledImageContainer
        $width="295px"
        $height="304px"
        $top="-90px"
        $right="-90px"
      >
        <StyledImage
          src="/login/welcome-login-screen/web-vector.png"
          fill={true}
          alt="spider-web"
        />
      </StyledImageContainer>
      <StyledImageContainer
        $width="589px"
        $height="442px"
        $bottom="-50px"
        $right="-140px"
      >
        <StyledImage
          src="/login/welcome-login-screen/haunted-car.png"
          fill={true}
          alt="haunted car"
        />
      </StyledImageContainer>
      <StyledContentContainer>
        <StyledImageContainer
          $width="138px"
          $height="114px"
          $top="10px"
          $left="50%"
        >
          <StyledImage
            src="/login/welcome-login-screen/finger-prints-1.png"
            fill={true}
            alt="finger-prints-1"
          />
        </StyledImageContainer>
        <StyledImageContainer
          $width="76px"
          $height="83px"
          $bottom="50%"
          $right="0px"
        >
          <StyledImage
            src="/login/welcome-login-screen/finger-prints-2.png"
            fill={true}
            alt="finger-prints-1"
          />
        </StyledImageContainer>
        <StyledGridColumnsContent>
          <StyledImageContainer
            $width="660px"
            $height="840px"
            $bottom="-90px"
            $left="-72px"
          >
            <StyledImage
              src="/login/welcome-login-screen/main-image.png"
              fill={true}
              alt="main image"
            />
          </StyledImageContainer>
        </StyledGridColumnsContent>
        <StyledGridColumnsContent>
          <StyledRightContentContainer>
            <StyledLogoContainer>
              <StyledLogo>Fortune Realm</StyledLogo>
              <StyledSubTitle>
                Your ultimate destination for thrilling casino games
              </StyledSubTitle>
            </StyledLogoContainer>
            <StyledGameBannerContainer>
              <StyledCornerVector $rotate="0deg" $left="0px" $top="0px">
                <CornerVector size={50} />
              </StyledCornerVector>
              <StyledCornerVector $rotate="90deg" $right="0px" $top="0px">
                <CornerVector size={50} />
              </StyledCornerVector>
              <StyledCornerVector $rotate="180deg" $right="0px" $bottom="0px">
                <CornerVector size={50} />
              </StyledCornerVector>
              <StyledCornerVector $rotate="270deg" $bottom="0px" $left="0px">
                <CornerVector size={50} />
              </StyledCornerVector>
              <StyledImageContainer
                $width="215px"
                $height="299px"
                $left="50%"
                $bottom="0px"
                $translateX="-50%"
              >
                <StyledImage
                  src="/login/welcome-login-screen/poker-banner-girl.png"
                  alt="poker-girl"
                  fill={true}
                />
              </StyledImageContainer>
              <StyledBannerGameLogo>
                Texas hold'em <br />
                showdown
              </StyledBannerGameLogo>
              <ThemeProvider theme={PokerTheme}>
                <StyledPokerCardWrapper
                  $right="40px"
                  $top="24px"
                  $rotate="15deg"
                >
                  <PokerCard suit="heart" rank="K" />
                </StyledPokerCardWrapper>
                <StyledPokerCardWrapper
                  $left="32px"
                  $bottom="40px"
                  $rotate="-15deg"
                >
                  <PokerCard suit="spade" rank="J" />
                </StyledPokerCardWrapper>
              </ThemeProvider>
            </StyledGameBannerContainer>
            <StyledPlayCta onClick={() => updateShowLogin(true)}>
              <StyledPlayCtaVector>
                <LoginPlayCtaVector is_mobile={false} />
              </StyledPlayCtaVector>
            </StyledPlayCta>
          </StyledRightContentContainer>
        </StyledGridColumnsContent>
      </StyledContentContainer>
    </StyledPage>
  );
};

export default WelcomeLoginScreen;
