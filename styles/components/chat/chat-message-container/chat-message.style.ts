import styled from "styled-components";
import Image from "next/image";

const StyledMessageContent = styled.div<{
  $justifyContent: "flex-start" | "flex-end";
}>`
  display: flex;
  gap: 16px;
  justify-content: ${(props) => props.$justifyContent};
`;
const StyledUserProfile = styled(Image)<{
  $order: 1 | 2;
  $border_color: string;
}>`
  border-radius: 8px;
  border: 2px solid ${(props) => props.$border_color};
  order: ${(props) => props.$order};
  object-fit: cover;
  object-position: top;
`;

const StyledMessageWrapper = styled.div<{
  $order: 1 | 2;
  $align_items: "flex-end" | "flex-start";
}>`
  order: ${(props) => props.$order};
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.$align_items};
  gap: 2rem;
`;

const StyledMessage = styled.div<{
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
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border-radius: ${(props) => props.$border_radius};
  border: 2px solid ${(props) => props.$border_color};
  padding: 12px 12px 12px 12px;
  position: relative;
  &::after {
    content: "${(props) => props.$content}";
    position: absolute;
    bottom: -25px;
    left: ${(props) => (props.$left ? props.$left + "px" : "auto")};
    right: ${(props) => (props.$right ? props.$right + "px" : "auto")};
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

const StyledUploadedImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

const StyledUploadedImageWrapper = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  border: 2px solid ${({ theme }) => theme.palette.primary.dark};
  border-radius: 16px;
  overflow: hidden;
`;
const StyledUploadedImage = styled(Image)`
  object-fit: cover;
  object-position: center 20%;
`;
export {
  StyledMessageContent,
  StyledUserProfile,
  StyledMessage,
  StyledMessageWrapper,
  StyledUploadedImageContainer,
  StyledUploadedImageWrapper,
  StyledUploadedImage,
};
