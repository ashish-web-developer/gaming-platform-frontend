import styled from "styled-components";

type IStyledMessageContent = {
  $justifyContent: "flex-start" | "flex-end";
};

type IStyledUserProfile = {
  $order: 1 | 2;
  $borderColor: string;
};

type IStyledMessage = {
  $order: 1 | 2;
  $borderColor: string;
  $borderRadius: string;
  $left?: number;
  $right?: number;
  $content: string;
  $showDoubleTick: boolean;
};
const StyledMessageContent = styled.div<IStyledMessageContent>`
  display: flex;
  gap: 16px;
  justify-content: ${(props) => props.$justifyContent};
`;
const StyledUserProfile = styled.div<IStyledUserProfile>`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 2px solid ${(props) => props.$borderColor};
  order: ${(props) => props.$order};
`;

const StyledMessage = styled.div<IStyledMessage>`
  max-width: 230px;
  height: auto;
  color: ${({ theme }) => theme.palette.primary.info};
  font-family: ${({ theme }) => theme.palette.fontFamily.lobster};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border-radius: ${(props) => props.$borderRadius};
  border: 2px solid ${(props) => props.$borderColor};
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
    display: ${(props) => (props.$showDoubleTick ? "inline-block" : "none")};
    position: absolute;
    width: 20px;
    height: 20px;
    top: 10px;
    background: ${({ theme }) => theme.palette.messages.double_tick_img};
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
