import styled from "styled-components";
// mui
import {  Box } from "@mui/material";


const StyledSidebarContainer = styled(Box)`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;


const StyledProfileContainer = styled(Box)`
  flex-grow: 1;
  flex-basis: 92%;
  overflow: scroll;
`;

export {
  StyledSidebarContainer,
  StyledProfileContainer,
};
