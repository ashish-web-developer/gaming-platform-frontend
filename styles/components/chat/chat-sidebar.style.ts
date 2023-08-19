import styled from "styled-components";
// mui
import {  Box } from "@mui/material";


const StyledSidebarContainer = styled(Box)`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding:10px 0px 0px 10px;
  gap:20px;
`;


const StyledSideBarSearchContainer = styled.div`
  flex-basis:56px;
`

const StyledProfileContainer = styled(Box)`
  flex-grow: 1;
  overflow: scroll;
`;

export {
  StyledSidebarContainer,
  StyledSideBarSearchContainer,
  StyledProfileContainer,
};
