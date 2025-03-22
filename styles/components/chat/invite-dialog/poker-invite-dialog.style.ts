import styled from "styled-components";

const StyledPokerInviteDialog = styled.dialog<{
  $mode: "light" | "dark";
  $border_color: string;
}>`
  width: 300px;
  height: 300px;
  background: url("/chat/invite-dialog/poker-background.png");
  background-size: cover;
  background-position: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 6;
  border-radius: 25px;
  border: ${(prop) => prop.$border_color};
  box-shadow: 6px 6px 4px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  &::after {
    content: "";
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: url("/chat/invite-dialog/poker-girl-image.png");
    background-size: contain;
    background-position: center;
  }
`;
const StyledPokerInviteDialogContent = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 7;
  background: url("/chat/invite-dialog/poker-content-background.png");
`;

const StyledSuitWrapper = styled.span<{
  $top?: string;
  $bottom?: string;
  $left?: string;
  $right?: string;
}>`
  position: absolute;
  top: ${(prop) => prop.$top ?? "auto"};
  bottom: ${(prop) => prop.$bottom ?? "auto"};
  left: ${(prop) => prop.$left ?? "auto"};
  right: ${(prop) => prop.$right ?? "auto"};
`;

const StyledPlayButton = styled.button`
  position: absolute;
  left: 12px;
  top: 12px;
  background: transparent;
  cursor: pointer;
  border: none;
`;

const StyledCloseCta = styled.button`
  position: absolute;
  right: 20px;
  top: 20px;
  background: transparent;
  cursor: pointer;
  border: none;
`;
const StyledPokerCardWrapper = styled.span<{
  $left?: string;
  $right?: string;
  $top?: string;
  $bottom?: string;
  $rotate: string;
}>`
  position: absolute;
  top: ${(props) => props.$top ?? "auto"};
  bottom: ${(props) => props.$bottom ?? "auto"};
  left: ${(props) => props.$left ?? "auto"};
  right: ${(props) => props.$right ?? "auto"};
  transform: rotate(${(props) => props.$rotate});
  cursor: pointer;
`;

const StyledMainText = styled.h2`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  font-family: ${({ theme }) => theme.fontFamily.bangers};
  font-size: 1.5rem;
  text-shadow: 0px 2px 2px #000;
  text-align: center;
  line-height: 1.2;
  rotate: -8deg;
  -webkit-text-stroke-width: 0.5px;
  -webkit-text-stroke-color: #ffffff;
  color: transparent;
`;

const StyledInvitorDetails = styled.span`
  position: absolute;
  font-family: ${({ theme }) => theme.fontFamily.bangers};
  color: ${({ theme }) => theme.palette.info.main};
  left: 50%;
  bottom: 20px;
  transform: translateX(-50%);
  text-align: center;
  line-height: 1;
  font-size: 0.875rem;
`;

const StyledCountDown = styled.span`
  font-family: ${({ theme }) => theme.fontFamily.bangers};
  font-size: 2.25rem;
  line-height: 1;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: ${({ theme }) => theme.palette.secondary.main};
  color: ${({ theme }) => theme.palette.primary.main};
  position: absolute;
  right: 20px;
  bottom: 20px;
  text-shadow: 4px 4px 0px ${({ theme }) => theme.palette.info.main};
`;

export {
  StyledPokerInviteDialog,
  StyledPokerInviteDialogContent,
  StyledSuitWrapper,
  StyledPlayButton,
  StyledCloseCta,
  StyledPokerCardWrapper,
  StyledMainText,
  StyledInvitorDetails,
  StyledCountDown,
};
