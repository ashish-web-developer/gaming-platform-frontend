import styled from "styled-components";

// Mui
import { BottomNavigation, Paper } from "@mui/material";

// icons
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";

const StyledPaper = styled(Paper)`
  position: absolute;
  bottom: 0px;
  width: 100%;
`;
const StyledBottomNavigation = styled(BottomNavigation)`
  background-color: #2e333d;
`;
const StyledHomeIcon = styled(HomeIcon)`
  font-size: 24px;
  color: #fff;
`;

const StyledSearchIcon = styled(SearchIcon)`
  font-size: 24px;
  color: #fff;
`;

export {
  StyledPaper,
  StyledBottomNavigation,
  StyledHomeIcon,
  StyledSearchIcon,
};
