// types
import { type FC } from "react";
import type { ITheme } from "@/theme/cognimatch.theme";

// styled components
import {
  StyledBanner,
  StyledWelcomeBannerPatternContainer,
  StyledWelcomeBannerContent,
  StyledStarIconWrapper,
  StyledBannerCircle,
  StyledMainBannerHeader,
  StyledSpan,
  StyledBannerPara,
  StyledBannerImage,
} from "@/styles/components/memory-game/welcome-banner/welcome-banner.style";

// theme
import { useTheme } from "styled-components";

// local components
import WelcomeBannerPattern from "@/components/memory-game/welcome-banner/welcome-banner-pattern";

// hooks
import { useAvatarUrl } from "@/hooks/profile.hook";

const StarIcon: FC<{ size: number; color: string }> = ({ size, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 20 19"
    >
      <path
        fill={color}
        d="M10 0l2.245 6.91h7.266l-5.878 4.27 2.245 6.91L10 13.82l-5.878 4.27 2.245-6.91L.49 6.91h7.266L10 0z"
      ></path>
    </svg>
  );
};

const WelcomeBanner: FC = () => {
  const theme = useTheme() as ITheme;

  return (
    <>
      <StyledBanner>
        <StyledBannerCircle />
        <StyledWelcomeBannerPatternContainer>
          <WelcomeBannerPattern
            color={theme.palette.primary.contrast}
            stroke={theme.palette.primary.light}
          />
          <StyledWelcomeBannerContent>
            <StyledStarIconWrapper>
              <StarIcon size={20} color="#080F0F" />
              <StarIcon size={20} color="#FFFFFF" />
              <StarIcon size={20} color="#16C172" />
            </StyledStarIconWrapper>
            <StyledMainBannerHeader>
              Cogni
              <StyledSpan $color={theme.palette.primary.dark}>Match</StyledSpan>
            </StyledMainBannerHeader>
            <StyledBannerPara>
              &ldquo;CogniMatch&rdquo; is a captivating memory game designed to
              boost your cognitive skills. Flip cards, match pairs, and enhance
              your memory in a fun and challenging way. Perfect for all ages!
            </StyledBannerPara>
          </StyledWelcomeBannerContent>
        </StyledWelcomeBannerPatternContainer>
        <StyledBannerImage />
      </StyledBanner>
    </>
  );
};

export default WelcomeBanner;
