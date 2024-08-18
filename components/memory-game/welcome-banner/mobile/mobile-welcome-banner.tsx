// types
import type { FC } from "react";
import type { ITheme } from "@/theme/memory-game.theme";

// styled components
import {
  StyledContainer,
  StyledDottedContainer,
  StyledWelcomeBannerContainer,
  StyledMainText,
  StyledSpan,
  StyledStarContainer,
  StyledContent,
} from "@/styles/components/memory-game/welcome-banner/mobile/mobile-welcome-banner.style";

// styled theme
import { useTheme } from "styled-components";

// redux
import { useAppSelector } from "@/hooks/redux.hook";
import { mode } from "@/store/slice/common.slice";

const StarIcon: FC<{ size: number; color: string }> = ({ size, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        fill={color}
        d="M8.962.752L11.8 7.44l7.238-.633-5.484 4.766 2.84 6.688-6.229-3.742-5.483 4.767 1.634-7.08L.09 8.466l7.238-.633L8.962.752z"
      ></path>
    </svg>
  );
};

const MobileWelcomeBanner: FC = () => {
  const theme = useTheme() as ITheme;
  const _mode = useAppSelector(mode);
  return (
    <StyledContainer>
      <StyledDottedContainer $mode={_mode}>
        <StyledWelcomeBannerContainer
          animate={{
            rotate: -5,
            transition: {
              duration: 0.5,
              type: "spring",
              stiffness: 260,
              damping: 20,
            },
          }}
        >
          <StyledMainText $rotate={"90deg"} $bottom="20%" $left={"-20px"}>
            Cogni
            <StyledSpan $color={theme.palette.primary.dark}>Match</StyledSpan>
          </StyledMainText>
          <StyledMainText $right={"10px"} $top={"5px"}>
            Cogni
            <StyledSpan $color={theme.palette.primary.dark}>Match</StyledSpan>
          </StyledMainText>

          <StyledStarContainer>
            <StarIcon size={20} color={"#080F0F"} />
            <StarIcon size={20} color={"#FFFFFF"} />
            <StarIcon size={20} color={"#16C172"} />
          </StyledStarContainer>

          <StyledContent>
            &ldquo;CogniMatch&rdquo; is a captivating memory game designed to
            boost your cognitive skills. Flip cards, match pairs, and enhance
            your memory in a fun and challenging way. Perfect for all ages!
          </StyledContent>
        </StyledWelcomeBannerContainer>
      </StyledDottedContainer>
    </StyledContainer>
  );
};

export default MobileWelcomeBanner;
