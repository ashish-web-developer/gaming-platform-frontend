import styled from "styled-components";

type IStyledCard = {
  $showBackground: boolean;
};

type IStyledBorder = {
  $borderColor?: string;
  $backgroundColor: string;
};

type IStyledCardNumber = {
  $color: string;
  $position: "top" | "bottom";
};

type IStyledCardSuit = {
  $color: string;
  $position: "top" | "bottom";
};

type IStyledCardName = {
  $color: string;
};

const StyledCard = styled.div<IStyledCard>`
  width: 80px;
  height: 120px;
  background: #fff;
  border-radius: 6px;
  border-radius: 6px;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    border-radius: 6px;
    border-radius: 6px;
    background: url("/memory-game/game-board/card/background-1.jpg"),
      url("/memory-game/game-board/card/background-2.jpg");
    background-size: cover;
    opacity: 0.2;
    display: ${(props) => (props.$showBackground ? "block" : "none")};
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

const StyledText = styled.div`
  color: #000;
  font-family: Poppins;
  font-size: 10px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  text-decoration-line: underline;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-37deg);
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

export {
  StyledCard,
  StyledBorder,
  StyledText,
  StyledTextSpan,
  StyledCardNumber,
  StyledCardName,
};
