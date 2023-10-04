import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

// mui
import { IconButton } from "@mui/material";

type IStyledBackgroundCircle = {
  $mode: "dark" | "light";
};

const GlobalStyles = createGlobalStyle`
    body {
        background: ${({ theme }) => theme.palette.primary.main} !important;
        background-repeat:no-repeat;
        background-size:cover;
    }
`;
const StyledContainer = styled.div`
  width: 100%;
  height: 100vh;
  background: ${({ theme }) => theme.palette.primary.background};
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
  position: relative;
`;

const StyledChatContainer = styled.div`
  display: none;
  @media (max-width: ${({ theme }) => theme.palette.breakpoints.mobile}) {
    width: 100%;
    height: 60%;
    position: absolute;
    bottom: 150px;
    z-index: 6;
    display: flex;
    justify-content: center;
  }
`;

const StyledContentContainer = styled.div`
  width: 70rem;
  height: 100%;
  margin: auto;
  padding: 34px 0px;
  position: relative;
  @media (max-width: ${({ theme }) => theme.palette.breakpoints.mobile}) {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const StyledGrid = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 20px;
  @media (max-width: ${({ theme }) => theme.palette.breakpoints.mobile}) {
    width: 90%;
  }
`;

const StyledLeftContainer = styled.div`
  width: 60%;
  flex-grow: 1;
  @media (max-width: ${({ theme }) => theme.palette.breakpoints.mobile}) {
    height: 100%;
  }
`;

const StyledRightContainer = styled.div`
  width: 40%;
  flex-grow: 1;
  @media (max-width: ${({ theme }) => theme.palette.breakpoints.mobile}) {
    display: none;
  }
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
  @media (max-width: ${({ theme }) => theme.palette.breakpoints.mobile}) {
    width: 615px;
    height: 615px;
  }
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
  @media (max-width: ${({ theme }) => theme.palette.breakpoints.mobile}) {
    display: none;
  }
`;

const StyledMainText = styled.div`
  position: relative;
  color: ${({ theme }) => theme.palette.primary.info};
  font-family: ${({ theme }) => theme.palette.fontFamily.poppins};
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: capitalize;
  z-index: 2;
  @media (max-width: ${({ theme }) => theme.palette.breakpoints.mobile}) {
    width: 90%;
    font-size: 16px;
  }
`;

const StyledInfoSnackbarContainer = styled.div`
  display: none;
  @media (max-width: ${({ theme }) => theme.palette.breakpoints.mobile}) {
    position: absolute;
    bottom: 60px;
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
  background: ${({ theme }) =>
    theme.palette.help_tooltip.help_tooltip_cta.cta_container_background};
  position: absolute;
  left: -130px;
  bottom: -130px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  @media (max-width: ${({ theme }) => theme.palette.breakpoints.mobile}) {
    display: none;
  }
`;

const StyledHelpCta = styled(IconButton)`
  position: absolute;
  right: 60px;
  top: 60px;
`;

export default GlobalStyles;
export {
  StyledContainer,
  StyledGrid,
  StyledLeftContainer,
  StyledRightContainer,
  StyledChatContainer,
  StyledContentContainer,
  StyledBackgroundCircleOne,
  StyledBackgroundCircleTwo,
  StyledMainText,
  StyledInfoSnackbarContainer,
  StyledHelpCtaContainer,
  StyledHelpCta,
};
