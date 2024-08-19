// types
import type { FC } from "react";
import type { ITheme } from "@/theme/cognimatch.theme";

// styled components
import {
  StyledPlayButton,
  StyledPlayButtonWrapper,
  StyledArrowVectorWrapper,
  StyledText,
} from "@/styles/components/memory-game/live-stream-chat/play-button-pattern.style";

// theme
import { useTheme } from "styled-components";

const ArrowSvg: FC<{ color: string }> = ({ color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="16"
      fill="none"
      viewBox="0 0 20 16"
    >
      <path
        fill={color}
        d="M9.744 8.645l-6.641 6.64a1.167 1.167 0 01-1.655 0L.344 14.183a1.167 1.167 0 010-1.655L5.051 7.82.344 3.113a1.167 1.167 0 010-1.655L1.443.344a1.167 1.167 0 011.655 0l6.64 6.64c.465.46.465 1.202.006 1.661zm9.375-1.66L12.478.345a1.167 1.167 0 00-1.655 0L9.719 1.447a1.167 1.167 0 000 1.655l4.707 4.707-4.707 4.707a1.167 1.167 0 000 1.655l1.104 1.104a1.167 1.167 0 001.655 0l6.64-6.64a1.161 1.161 0 000-1.651z"
      ></path>
    </svg>
  );
};

const PlayButtonPatternSvg: FC<{
  color: string;
  shadow_color: string;
}> = ({ color, shadow_color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="151"
      height="53"
      fill="none"
      viewBox="0 0 151 53"
    >
      <path
        fill={shadow_color}
        d="M34 3H13L0 13v33h104l2 2h12l2-2h14l13-12V3H54l-3-3H36l-2 3z"
      ></path>
      <path
        fill={color}
        stroke="#fff"
        strokeWidth="2"
        d="M37 7H16L3 17v33h104l2 2h12l2-2h14l13-12V7H57l-3-3H39l-2 3z"
      ></path>
    </svg>
  );
};

const PlayButtonPattern: FC<{ children: string; on_click: () => void }> = ({
  children,
  on_click,
}) => {
  const theme = useTheme() as ITheme;
  return (
    <StyledPlayButton onClick={on_click}>
      <StyledPlayButtonWrapper>
        <PlayButtonPatternSvg
          color={theme.palette.primary.dark}
          shadow_color={theme.palette.primary.contrast}
        />
      </StyledPlayButtonWrapper>
      <StyledArrowVectorWrapper>
        <ArrowSvg color={theme.palette.primary.light} />
      </StyledArrowVectorWrapper>
      <StyledText>{children}</StyledText>
    </StyledPlayButton>
  );
};

export default PlayButtonPattern;
