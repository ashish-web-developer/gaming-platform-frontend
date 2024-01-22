import styled from "styled-components";

const StyledMessageContent = styled.div<{
  $justifyContent: "flex-start" | "flex-end";
}>`
  display: flex;
  gap: 16px;
  justify-content: ${(props) => props.$justifyContent};
`;
const StyledUserProfile = styled.div<{
  $order: 1 | 2;
  $border_color: string;
}>`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 2px solid ${(props) => props.$border_color};
  order: ${(props) => props.$order};
`;

const StyledMessage = styled.div<{
  $order: 1 | 2;
  $border_color: string;
  $border_radius: string;
  $left?: number;
  $right?: number;
  $content: string;
  $show_double_tick: boolean;
  $mode: "light" | "dark";
}>`
  max-width: 230px;
  height: auto;
  color: ${(props) =>
    props.$mode == "light"
      ? props.theme.palette.primary.dark
      : props.theme.palette.primary.light};
  font-family: lobster;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border-radius: ${(props) => props.$border_radius};
  border: 2px solid ${(props) => props.$border_color};
  padding: 12px 12px 12px 12px;
  order: ${(props) => props.$order};
  position: relative;
  &::after {
    content: "${(props) => props.$content}";
    position: absolute;
    bottom: -25px;
    left: ${(props) => props.$left + "px" ?? "auto"};
    right: ${(props) => props.$right + "px" ?? "auto"};
    white-space: nowrap;
    font-size: 12px;
  }
  &::before {
    content: "";
    display: ${(props) => (props.$show_double_tick ? "inline-block" : "none")};
    position: absolute;
    width: 20px;
    height: 20px;
    top: 10px;
    background: url("/chat/chat-message-container/${(props) =>
      props.$mode == "light" ? "dark" : "light"}-double-tick.png");
    background-size: cover;
    background-repeat: no-repeat;
    left: ${(props) => {
      if (props.$left) {
        return `-${props.$left + 20}px`;
      }
      return "auto";
    }};
  }
`;
export { StyledMessageContent, StyledUserProfile, StyledMessage };
