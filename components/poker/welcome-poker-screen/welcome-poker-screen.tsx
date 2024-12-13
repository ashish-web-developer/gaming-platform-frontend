// types
import type { FC } from "react";
import type { ITheme } from "@/theme/poker.theme";

// theme
import { useTheme } from "styled-components";

// local components
import {
  StyledPage,
  StyledContentContainer,
  StyledImageContainer,
  StyledImage,
  StyledLogoContainer,
  StyledPlatformLogo,
  StyledGameLogo,
  StyledSuitWrapper,
  StyledCountDown,
} from "@/styles/components/poker/welcome-poker-screen/welcome-poker-screen.style";

// icons
import Suit from "@/components/poker/icons/suit";

const WelcomePokerScreen: FC = () => {
  const theme = useTheme() as ITheme;
  return (
    <StyledPage>
      <StyledContentContainer>
        <StyledSuitWrapper $bottom="270px" $left="100px">
          <Suit
            stroke={theme.palette.secondary.main}
            stroke_width={3}
            suit_type="heart"
          />
        </StyledSuitWrapper>
        <StyledSuitWrapper $top="85px" $left="240px">
          <Suit
            stroke={theme.palette.secondary.main}
            stroke_width={3}
            suit_type="club"
          />
        </StyledSuitWrapper>
        <StyledSuitWrapper $bottom="300px" $right="100px">
          <Suit
            stroke={theme.palette.secondary.main}
            stroke_width={3}
            suit_type="diamond"
          />
        </StyledSuitWrapper>
        <StyledSuitWrapper $bottom="160px" $right="360px">
          <Suit
            stroke={theme.palette.secondary.main}
            stroke_width={3}
            suit_type="spade"
          />
        </StyledSuitWrapper>
        <StyledCountDown>2</StyledCountDown>
        <StyledImageContainer
          $width="602px"
          $height="834px"
          $bottom="-36px"
          $left="50%"
          $translateX="-50%"
        >
          <StyledImage
            src="/poker/welcome-poker-screen/main-image.png"
            alt="main-image"
            fill={true}
          />
        </StyledImageContainer>
        <StyledImageContainer
          $width="250px"
          $height="250px"
          $bottom="48px"
          $left="0px"
        >
          <StyledImage
            src="/poker/welcome-poker-screen/trophy.png"
            alt="trophy"
            fill={true}
          />
        </StyledImageContainer>
        <StyledLogoContainer>
          <StyledPlatformLogo>Fortune Realm</StyledPlatformLogo>
          <StyledGameLogo>
            Texas Hold'em <br /> Showdown
          </StyledGameLogo>
        </StyledLogoContainer>
      </StyledContentContainer>
    </StyledPage>
  );
};

export default WelcomePokerScreen;
