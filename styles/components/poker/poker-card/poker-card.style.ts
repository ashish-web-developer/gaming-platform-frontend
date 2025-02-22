import styled from "styled-components";

const StyledContainer = styled.div<{
  $is_flipped: boolean;
  $scale?: number;
  $hide: boolean;
}>`
  width: 100px;
  height: 150px;
  background-color: white;
  border-radius: 6px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  scale: ${(props) => props.$scale ?? 1};
  visibility: ${(props) => (props.$hide ? "hidden" : "visible")};
`;

const StyledDesignPattern = styled.div`
  width: calc(100% - 12px);
  height: calc(100% - 12px);
  background: url("/poker/poker-card/background.png");
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 6px;
`;

const StyledVectorWrappper = styled.div<{
  $top?: string;
  $bottom?: string;
  $left?: string;
  $right?: string;
  $translateX?: string;
  $translateY?: string;
  $rotate?: string;
}>`
  position: absolute;
  top: ${(props) => props.$top ?? "auto"};
  bottom: ${(props) => props.$bottom ?? "auto"};
  left: ${(props) => props.$left ?? "auto"};
  right: ${(props) => props.$right ?? "auto"};
  rotate: ${(props) => props.$rotate ?? "0deg"};
`;

const StyledCardDetailsWrapper = styled.div<{
  $position: "top" | "bottom";
}>`
  position: absolute;
  top: ${(props) => (props.$position == "top" ? "6px" : "auto")};
  left: ${(props) => (props.$position == "top" ? "6px" : "auto")};
  bottom: ${(props) => (props.$position == "bottom" ? "6px" : "auto")};
  right: ${(props) => (props.$position == "bottom" ? "6px" : "auto")};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${(props) => (props.$position == "top" ? "4px" : "0px")};
`;

const StyledRank = styled.span`
  font-family: ${({ theme }) => theme.fontFamily.bangers};
  font-size: 1.25rem;
  color: ${({ theme }) => theme.palette.primary.main};
  line-height: 1;
`;
export {
  StyledContainer,
  StyledDesignPattern,
  StyledVectorWrappper,
  StyledCardDetailsWrapper,
  StyledRank,
};
