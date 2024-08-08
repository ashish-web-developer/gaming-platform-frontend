import styled from "styled-components";

const StyledPokerInviteDialog = styled.dialog<{
  $mode: "light" | "dark";
}>`
  width: 300px;
  height: 300px;
  background: url("/poker/background.jpg");
  background-size: cover;
  background-position: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 6;
  border-radius: 25px;
  border: 2px solid ${({ theme }) => theme.palette.secondary.main};
  overflow: hidden;
  &::after {
    content: "";
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: url("/chat/invite-dialog/poker-background.png");
    background-size: contain;
    background-position: center;
  }
`;
const StyledPokerInviteDialogContent = styled.div`
  width: 100%;
  height: 100%;
  background: transparent;
  position: relative;
  z-index: 7;
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
  right: 18px;
  top: 18px;
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

const StyledMainContent = styled.div`
  background: transparent;
  width: 100%;
  position: absolute;
  bottom: 68px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledMainText = styled.h2`
  font-family: ${({ theme }) => theme.fontFamily.bangers};
  font-size: 1.5rem;
  color: ${({ theme }) => theme.palette.secondary.main};
  text-shadow: 0px 2px 2px #000;
  text-align: center;
  line-height:1.2;
`;

const StyledSubtitle = styled.p`
  color: #fff;
  font-size: 1rem;
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  text-align: center;
`;
const StyledProposalSenderName = styled.span`
  position: absolute;
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  color: ${({ theme }) => theme.palette.secondary.main};
  transform: rotate(90deg);
  bottom: 55%;
  right: -40px;
`;
export {
  StyledPokerInviteDialog,
  StyledPokerInviteDialogContent,
  StyledPlayButton,
  StyledCloseCta,
  StyledPokerCardWrapper,
  StyledMainContent,
  StyledMainText,
  StyledSubtitle,
  StyledProposalSenderName,
};
