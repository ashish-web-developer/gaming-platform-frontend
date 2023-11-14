import { useRef } from "react";
// types
import type CustomMemoryGameThemePalette from "@/types/theme/memory-game";
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
} from "@/styles/components/result-board/result-board.style";

// styled theme
import { useTheme } from "styled-components";

import React from "react";

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

const ResultBoard = () => {
  const theme = useTheme() as CustomMemoryGameThemePalette;
  const circularTextRef = useRef<HTMLDivElement | null>(null);
  const pointTextRef = useRef<string>("Unlocked Points");
  return (
    <>
      <StyledResultBoardContainer>
        <StyledStartIconContainer>
          <StartIcon
            size={63}
            color={theme.palette.result_board.star_icon.background_color}
            stroke={theme.palette.result_board.star_icon.stroke_color}
          />
        </StyledStartIconContainer>
        <StyledBoardText>
          Bravo! You've triumphed over the cards. Victory dance time!
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
      </StyledResultBoardContainer>
    </>
  );
};

export default ResultBoard;
