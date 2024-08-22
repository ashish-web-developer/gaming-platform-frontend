// type
import type { FC } from "react";
import type { ITheme } from "@/theme/cognimatch.theme";

// styled components
import {
  StyledWrapper,
  StyledTextPatternWrapper,
  StyledPlayButton,
  StyledTextWrapper,
} from "@/styles/components/memory-game/live-stream-chat/text-pattern.style";

// theme
import { useTheme } from "styled-components";

const PlayCtaSvg: FC<{ color: string; stroke_color: string }> = ({
  stroke_color,
  color,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="41"
      height="35"
      fill="none"
      viewBox="0 0 41 35"
    >
      <path
        fill={color}
        d="M7.855 1.4L.598 7.7v25.9h21.045l1.452 1.4H28.9l1.451-1.4h7.257l2.903-2.8V1.4h-3.629L35.432 0h-6.531l-1.452 1.4H7.855z"
      ></path>
      <path
        fill="#000"
        stroke={stroke_color}
        d="M9.375 2.66L2.777 8.33v23.31H21.91l1.32 1.26h5.277l1.32-1.26h6.597l2.64-2.52V2.66h-3.3l-1.32-1.26h-5.937l-1.32 1.26H9.376z"
      ></path>
      <path
        fill="#fff"
        d="M30.152 15.737L17.679 8.625c-1.014-.578-2.566-.018-2.566 1.411v14.222c0 1.282 1.442 2.055 2.566 1.412l12.473-7.11a1.61 1.61 0 000-2.823z"
      ></path>
    </svg>
  );
};

const TextPatternSvg: FC<{
  color: string;
  shadow_color: string;
}> = ({ color, shadow_color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="251"
      height="122"
      fill="none"
      viewBox="0 0 251 122"
    >
      <path
        fill={shadow_color}
        d="M246.471 14L132.216 7.5h-26.443L102.281 4H91.803l-2.994-4H59.373L55.38 7.5H15.966l-12.473 14L0 110.5l185.602 4.5 4.49 4.5h15.966l1.996-4.5h20.955l17.462-20.5V14z"
      ></path>
      <path
        fill={color}
        d="M250.463 16L136.208 9.5h-26.443L106.273 6H95.795l-2.993-4H63.365l-3.992 7.5H19.958l-12.473 14-3.493 89 185.602 4.5 4.49 4.5h15.966l1.996-4.5h20.955l17.462-20.5V16z"
      ></path>
    </svg>
  );
};

const TextPattern: FC<{ children: string; onClick: () => void }> = ({
  children,
  onClick,
}) => {
  const theme = useTheme() as ITheme;
  return (
    <StyledWrapper>
      <StyledTextPatternWrapper>
        <TextPatternSvg
          color={theme.palette.primary.light}
          shadow_color={theme.palette.primary.contrast}
        />
      </StyledTextPatternWrapper>
      <StyledPlayButton onClick={onClick}>
        <PlayCtaSvg
          color={theme.palette.primary.dark}
          stroke_color={theme.palette.primary.contrast}
        />
      </StyledPlayButton>
      <StyledTextWrapper>{children}</StyledTextWrapper>
    </StyledWrapper>
  );
};

export default TextPattern;
