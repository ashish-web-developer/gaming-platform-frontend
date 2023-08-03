// mui
import { BottomNavigationAction } from "@mui/material";

// styled components
import {
  StyledPaper,
  StyledBottomNavigation,
  StyledHomeIcon,
  StyledSearchIcon,
} from "@/styles/components/chat/mobile-navigation.style";
// redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  mobile_navigation,
  updateMobileNavigation,
} from "@/store/slice/chat.slice";

const MobileBottomNav = () => {
  const _mobile_navigation = useAppSelector(mobile_navigation);
  const dispatch = useAppDispatch();
  return (
    <StyledPaper elevation={8}>
      <StyledBottomNavigation
        showLabels
        value={_mobile_navigation}
        onChange={(event, newValue) => {
          dispatch(updateMobileNavigation(newValue));
        }}
      >
        <BottomNavigationAction label="Home" icon={<StyledHomeIcon />} />
        <BottomNavigationAction label="Search" icon={<StyledSearchIcon />} />
      </StyledBottomNavigation>
    </StyledPaper>
  );
};

export default MobileBottomNav;
