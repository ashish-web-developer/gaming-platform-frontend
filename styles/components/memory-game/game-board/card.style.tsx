import styled from "styled-components";

type IStyledCard = {
  $showBackground: boolean;
  $cursor: boolean;
};

type IStyledBorder = {
  $borderColor?: string;
  $backgroundColor: string;
};

type IStyledCardNumber = {
  $color: string;
  $position: "top" | "bottom";
};

type IStyledCardName = {
  $color: string;
};

type IStyledText = {
  $top?: string;
  $left?: string;
  $right?: string;
  $bottom?: string;
  $rotate: string;
};

type IStyledPatternContainer = {
  $top?: string;
  $left?: string;
  $right?: string;
  $bottom?: string;
};

type IStyledCardContent = {
  $display: "block" | "none";
};

const StyledCard = styled.div<IStyledCard>`
  width: 80px;
  height: 120px;
  background: ${({ theme }) => theme.palette.game_board.card.background};
  border-radius: 6px;
  position: relative;
  cursor: ${(props) => (props.$cursor ? "pointer" : "not-allowed")};
  @media (max-width: ${({ theme }) => theme.palette.breakpoints.mobile}) {
    width: 100%;
    aspect-ratio: 1/1.5;
    height: auto;
  }
`;

const StyledBorder = styled.div<IStyledBorder>`
  width: calc(100% - 10px);
  height: calc(100% - 10px);
  border: 2px solid ${(props) => props.$borderColor ?? "#000"};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 6px;
  background-color: ${(props) => props.$backgroundColor};
`;

const StyledText = styled.div<IStyledText>`
  color: #000;
  font-family: ${({ theme }) => theme.palette.fontFamily.poppins};
  font-size: 6px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  position: absolute;
  top: ${(props) => props.$top ?? "auto"};
  left: ${(props) => props.$left ?? "auto"};
  right: ${(props) => props.$right ?? "auto"};
  bottom: ${(props) => props.$bottom ?? "auto"};
  transform: rotate(${(props) => props.$rotate});
  @media (max-width: 375px) {
    font-size: 6px;
  }
`;

const StyledTextSpan = styled.span`
  color: #f42c04;
`;

const StyledCardNumber = styled.span<IStyledCardNumber>`
  color: ${(props) => props.$color};
  font-size: 12px;
  position: absolute;
  left: ${(props) => (props.$position == "top" ? 4 : 0)}px;
  top: ${(props) => (props.$position == "top" ? 4 : 0)}px;
  right: ${(props) => (props.$position == "top" ? 0 : 4)}px;
  bottom: ${(props) => (props.$position == "top" ? 0 : 4)}px;
  transform: rotate(${(props) => (props.$position == "top" ? 0 : 180)}deg);
  font-family: ${({ theme }) => theme.palette.fontFamily.jim};
  display: flex;
  flex-direction: column;
  gap: 0px;
`;

const StyledCardName = styled.span<IStyledCardName>`
  color: ${(props) => props.$color};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-21deg);
  font-family: ${({ theme }) =>
    theme.palette.fontFamily.oleo_script_swash_caps};
  font-size: 12px;
`;

const StyledPatternContainer = styled.span<IStyledPatternContainer>`
  position: absolute;
  top: ${(props) => props.$top ?? "auto"};
  left: ${(props) => props.$left ?? "auto"};
  bottom: ${(props) => props.$bottom ?? "auto"};
  right: ${(props) => props.$right ?? "auto"};
`;

const StyledCardPattern = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const StyledCardContent = styled.div<IStyledCardContent>`
  display: ${(props) => props.$display};
`;

export {
  StyledCard,
  StyledBorder,
  StyledText,
  StyledTextSpan,
  StyledCardNumber,
  StyledCardName,
  StyledPatternContainer,
  StyledCardPattern,
  StyledCardContent,
};
