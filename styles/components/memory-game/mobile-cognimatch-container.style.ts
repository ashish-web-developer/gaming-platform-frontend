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
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    overflow: auto;
  }
`;

const StyledBackgroundCircleOne = styled.div<IStyledBackgroundCircle>`
  display: ${(props) => (props.$mode == "light" ? "none" : "block")};
  position: fixed;
  width: 615px;
  height: 615px;
  border-radius: 50%;
  background: #f65be3;
  bottom: 0px;
  right: 0px;
  transform: translate(40%, 40%);
  filter: blur(500px);
  z-index: 1;
`;

const StyledContentContainer = styled.div`
  width: 90%;
  height: 100%;
  margin: auto;
  padding: 34px 0px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: capitalize;
  z-index: 2;
  width: 100%;
`;

export {
  StyledPage,
  StyledContainer,
  StyledBackgroundCircleOne,
  StyledContentContainer,
  StyledMainText,
};
