import { useRef } from "react";
// types
import type { ITheme } from "@/theme/memory-game.theme";
import type { FC } from "react";
// styled components
import {
  StyledResultBoardContainer,
  StyledStartIconContainer,
  StyledBoardText,
  StyledCircularTextContainer,
  StyledCircularText,
  StyledCircularLetter,
  StyledPointsText,
  StyledLogoContainer,
  StyledLogoSpan,
  StyledCrownImageContainer,
  StyledCrownImage,
  StyledLottieContainer,
} from "@/styles/components/result-board/result-board.style";

// styled theme
import { useTheme } from "styled-components";

// helpers package
import "@dotlottie/player-component";

const StartIcon: FC<{ size: number; color: string; stroke: string }> = ({
  size,
  color,
  stroke,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 61 57"
    >
      <path
        fill={color}
        stroke={stroke}
        strokeWidth="4"
        d="M30.5 6.472l5.17 15.912.45 1.382H54.301L40.768 33.6l-1.175.854.449 1.382 5.17 15.912-13.535-9.834-1.176-.854-1.176.854-13.535 9.834 5.17-15.912.45-1.382-1.176-.854-13.536-9.834h18.184l.449-1.382L30.5 6.472z"
      ></path>
    </svg>
  );
};

const TextPattern: FC<{ color: string }> = ({ color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="261"
      height="25"
      fill="none"
      viewBox="0 0 261 25"
    >
      <path
        stroke={color}
        strokeWidth="7"
        d="M2 21S40.971 5.901 81.138 3.867C142.998.737 260 21 260 21"
      ></path>
    </svg>
  );
};

const ResultBoard = () => {
  const theme = useTheme() as ITheme;
  const circularTextRef = useRef<HTMLDivElement | null>(null);
  const pointTextRef = useRef<string>("Unlocked Points");
  return (
    <>
      <StyledResultBoardContainer>
        <StyledLottieContainer>
          <dotlottie-player
            src="/memory-game/result-board/confetti-animation.lottie"
            autoplay
            loop
          />
        </StyledLottieContainer>
        <StyledStartIconContainer>
          <StartIcon
            size={63}
            color={theme.palette.primary.dark}
            stroke={theme.palette.success.main}
          />
        </StyledStartIconContainer>
        <StyledBoardText>
          Bravo! You've triumphed over the cards. Victory dance time!
          <TextPattern color={theme.palette.success.main} />
        </StyledBoardText>
        <StyledCircularTextContainer>
          <StyledCircularText ref={circularTextRef}>
            {pointTextRef.current.split("").map((letter, index) => {
              return (
                <StyledCircularLetter key={index} $rotate={index * 22}>
                  {letter}
                </StyledCircularLetter>
              );
            })}
          </StyledCircularText>
          <StyledPointsText>10+</StyledPointsText>
        </StyledCircularTextContainer>
        <StyledLogoContainer>
          <StyledCrownImageContainer>
            <StyledCrownImage
              fill={true}
              priority={false}
              alt="crown"
              src="/memory-game/result-board/crown.png"
              sizes="(max-width: 1400px) 20vw"
            />
          </StyledCrownImageContainer>
          <StyledLogoSpan $color={theme.palette.primary.light}>
            Cogni
          </StyledLogoSpan>
          <StyledLogoSpan $color={theme.palette.primary.contrast}>
            Match
          </StyledLogoSpan>
        </StyledLogoContainer>
      </StyledResultBoardContainer>
    </>
  );
};

export default ResultBoard;
