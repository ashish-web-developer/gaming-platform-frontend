
import styled, {createGlobalStyle} from "styled-components";

// Mui
import { Box ,Button} from "@mui/material";


const GlobalStyles = createGlobalStyle`
    body {
        background-color: ${({theme})=>theme.palette.background.main};
    }
`;

const color = {
  primary: "rgb(3 13 9)",
  secondary: "rgb(16 9 22)",
  text: "#fffdff",
  button: "#8102f7",
  errors: "#d11534",
};


const StyledContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 100px;
  min-height: 100vh;
  background-color: ${color.primary};
  @media (max-width: 600px) {
    padding: 30px 20px;
  }
`;
const WelcomeScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  min-height: 100vh;
  background-color: ${color.primary};
  @media (max-width: 600px) {
    padding: 30px 20px;
  }
`;

const PlayButton = styled(Button)`
  padding: 16px 50px;
  color: ${color.text};
  background-color: ${color.button};
  font-size: 18px;
  font-family: "Rubik Moonrocks", cursive;
  border-radius: 8px;
  &:hover {
    background-color: ${color.button};
  }
`;


export {
    StyledContainer,
    WelcomeScreenContainer,
    PlayButton,
    GlobalStyles
}