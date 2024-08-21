import styled from "styled-components";

type IStyledBackgroundCircle = {
  $mode: "dark" | "light";
};

const StyledPage = styled.div`
  background: ${({ theme }) => theme.palette.primary.main} !important;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100vw;
  height: 100vh;
`;
const StyledContainer = styled.div<{
  $mode: "light" | "dark";
}>`
  width: 100%;
  height: 100vh;
  background: ${(props) =>
    props.$mode == "light"
      ? "url('/memory-game/background/light-background.jpg')"
      : "url('/memory-game/background/dark-background.png')"};
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
  position: relative;
`;

const StyledContentContainer = styled.div`
  width: 70rem;
  height: 100%;
  margin: auto;
  padding: 34px 0px;
  position: relative;
`;

const StyledGrid = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 20px;
  padding-top: 70px;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 90%;
  }
`;

const StyledLeftContainer = styled.div`
  width: 60%;
  flex-grow: 1;
`;

const StyledRightContainer = styled.div`
  width: 40%;
  flex-grow: 1;
`;

const StyledBackgroundCircleOne = styled.div<IStyledBackgroundCircle>`
  display: ${(props) => (props.$mode == "light" ? "none" : "block")};
  width: 698px;
  height: 698px;
  border-radius: 50%;
  background: #f65be3;
  position: absolute;
  bottom: 0px;
  right: 0px;
  transform: translate(40%, 40%);
  filter: blur(500px);
  z-index: 1;
`;

const StyledBackgroundCircleTwo = styled.div<IStyledBackgroundCircle>`
  display: ${(props) => (props.$mode == "light" ? "none" : "block")};
  width: 698px;
  height: 698px;
  border-radius: 50%;
  background: #f65be3;
  position: absolute;
  top: 0px;
  left: 0px;
  transform: translate(-40%, -40%);
  filter: blur(500px);
  z-index: 1;
`;

const StyledMainText = styled.div<{
  $mode: "light" | "dark";
}>`
  position: relative;
  color: ${(props) =>
    props.$mode == "light"
      ? props.theme.palette.primary.dark
      : props.theme.palette.primary.light};
  font-family: ${({ theme }) => theme.fontFamily.poppins};
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: capitalize;
  z-index: 2;
`;

const StyledInfoSnackbarContainer = styled.div`
  width: 412px;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    position: absolute;
    bottom: 80px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const StyledHelpCtaContainer = styled.div`
  width: 285px;
  height: 285px;
  border-radius: 50%;
  background: ${({ theme }) => theme.palette.primary.contrast};
  position: absolute;
  left: -130px;
  bottom: -130px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

const StyledHelpCta = styled.button`
  position: absolute;
  right: 65px;
  top: 65px;
  background: transparent;
  border: none;
  cursor: pointer;
`;

export {
  StyledPage,
  StyledContainer,
  StyledGrid,
  StyledLeftContainer,
  StyledRightContainer,
  StyledContentContainer,
  StyledBackgroundCircleOne,
  StyledBackgroundCircleTwo,
  StyledMainText,
  StyledInfoSnackbarContainer,
  StyledHelpCtaContainer,
  StyledHelpCta,
};
