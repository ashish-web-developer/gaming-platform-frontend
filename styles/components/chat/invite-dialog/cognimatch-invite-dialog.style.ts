import styled from "styled-components";

const StyledCogniMatchInviteDialog = styled.dialog<{
  $mode: "light" | "dark";
}>`
  width: 300px;
  height: 300px;
  background: url("/chat/invite-dialog/cognimatch-background.jpg");
  background-size: cover;
  background-position: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 6;
  border-radius: 25px;
  border: 2px solid ${({ theme }) => theme.palette.primary.dark};
  overflow: hidden;
  &::after {
    content: "";
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 208px;
    ${(props) => {
      switch (props.$mode) {
        case "dark":
          return `
            background: linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0) 0%,
              rgba(0, 0, 0, 1) 100%
            );
      }
            `;
        case "light":
          return `
            background: linear-gradient(
              to bottom,
              rgba(255, 255, 255, 0) 0%,
              rgba(255, 255, 255, 1) 100%
            );
            }
        `;
      }
    }}
`;

const StyledMainContent = styled.div`
  background: transparent;
  width: 100%;
  position: absolute;
  bottom: 78px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledMainText = styled.h2`
  font-family: ${({ theme }) => theme.fontFamily.poppins};
  font-size: 2rem;
  color: #fff;
  text-shadow: 0px 4px 4px #000;
`;

const StyledTextSpan = styled.span<{
  $color: string;
}>`
  color: ${(props) => props.$color};
`;

const StyledSubtitle = styled.p<{
  $mode: "light" | "dark";
}>`
  color: ${(props) =>
    props.$mode == "dark"
      ? props.theme.palette.primary.light
      : props.theme.palette.primary.dark};
  font-size: 1rem;
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  text-align: center;
`;

const StyledVsText = styled.h6<{
  $mode: "light" | "dark";
}>`
  color: ${(props) =>
    props.$mode == "dark"
      ? props.theme.palette.primary.light
      : props.theme.palette.primary.dark};
  font-size: 1.125rem;
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  position: absolute;
  right: 20px;
  bottom: 18px;
  z-index: 2;
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

export {
  StyledCogniMatchInviteDialog,
  StyledMainContent,
  StyledMainText,
  StyledTextSpan,
  StyledSubtitle,
  StyledVsText,
  StyledPlayButton,
  StyledCloseCta,
};
