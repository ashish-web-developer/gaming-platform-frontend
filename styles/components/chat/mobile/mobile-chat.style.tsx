import styled from "styled-components";
// mui
import { Box } from "@mui/material";

const StyledContainer = styled(Box)`
  width: 100%;
  height: 100vh;
  background-color: ${({theme})=>theme.palette.primary.main};
  padding: 20px 20px 0px 20px;
  display: flex;
  gap: 60px;
  @media (max-width: 600px) {
    padding: 0;
    display:block;
  }
`;


export {
    StyledContainer
}