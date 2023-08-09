import styled from "styled-components";

// Mui
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";

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

const StyledBottomNavigationAction = styled(BottomNavigationAction)`
  .MuiBottomNavigationAction-label {
    color: #fff;
  }
  .Mui-selected {
    font-weight: 600;
  }
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
  StyledBottomNavigationAction,
  StyledHomeIcon,
  StyledSearchIcon,
};
