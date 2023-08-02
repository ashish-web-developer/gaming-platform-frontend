import { BottomNavigationAction } from "@mui/material";

// styled box
import {
  StyledPaper,
  StyledBottomNavigation,
  StyledHomeIcon,
  StyledSearchIcon,
} from "@/styles/components/chat/mobile-navigation.style";

const MobileBottomNav = () => {
  return (
    <StyledPaper elevation={8}>
      <StyledBottomNavigation>
        <BottomNavigationAction label="Home" icon={<StyledHomeIcon />} />
        <BottomNavigationAction label="Search" icon={<StyledSearchIcon />} />
      </StyledBottomNavigation>
    </StyledPaper>
  );
};

export default MobileBottomNav;
