// types
import type { FC } from "react";

// styled components
import {
  StyledPage,
  StyledContentContainer,
  StyledLogoContainer,
  StyledLogo,
  StyledSubTitle,
  StyledGamesBannerContainer,
  StyledGamesVectorWrapper,
  StyledCta,
  StyledCtaTextWrapper,
  StyledGirlImageWrapper,
  StyledGirlImage,
} from "@/styles/components/login/login-container.style";

// vector
import PokerVector from "@/components/login/vector/poker-vector";
import CognimatchVector from "@/components/login/vector/cognimatch-vector";
import CtaVector from "@/components/login/vector/cta-vector";

const LoginContainer: FC = () => {
  return (
    <StyledPage>
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
          <PokerVector />
          <StyledGamesVectorWrapper>
            <CognimatchVector />
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
