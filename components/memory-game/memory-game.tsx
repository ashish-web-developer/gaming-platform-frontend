// types
import type { FC } from "react";
import type CustomMemoryGameThemePalette from "@/types/theme/memory-game";

// local components
import WelcomeBanner from "@/components/memory-game/welcome-banner/welcome-banner";
import StartBanner from "@/components/memory-game/start-banner/start-banner";
import Chat from "@/components/memory-game/chat/chat";
import InfoSnackbar from "@/components/memory-game/info-snackbar/info-snackbar";

// styled components
import GlobalStyles, {
  StyledContainer,
  StyledGrid,
  StyledLeftContainer,
  StyledRightContainer,
  StyledBackgroundCircleOne,
  StyledBackgroundCircleTwo,
  StyledMainText,
  StyledContentContainer,
  StyledFabCta,
} from "@/styles/components/memory-game/memory-game.style";

// styled theme
import { useTheme } from "styled-components";
// mui
import { useMediaQuery } from "@mui/material";

// redux
import { useAppSelector } from "@/hooks/redux";
import { user } from "@/store/slice/user.slice";
const MemoryGame: FC = () => {
  const theme = useTheme() as CustomMemoryGameThemePalette;
  const isMobile = useMediaQuery(
    `(max-width:${theme.palette.breakpoints.mobile})`
  );
  const _user = useAppSelector(user);
  return (
    <>
      <GlobalStyles />
      <StyledContainer>
        <StyledBackgroundCircleOne />
        <StyledBackgroundCircleTwo />
        <StyledContentContainer>
          <StyledFabCta>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="24"
              viewBox="0 0 28 24"
              fill="none"
            >
              <path
                d="M23.6449 4.95699C19.9052 2.55041 14.9348 2.00262 10.8057 2.72843C6.18623 -1.61127 1.00965 0.384821 0 0.95865C0 0.95865 3.55249 3.89881 2.97548 6.47394C-1.23034 10.6498 0.769026 15.2992 2.97548 17.4946C3.55249 20.0697 0 23.0099 0 23.0099C0.999928 23.5856 6.16242 25.5755 10.8057 21.2581C14.9255 21.9792 19.896 21.4361 23.6449 19.0253C29.4422 15.4204 29.4612 8.58035 23.6449 4.95652V4.95699ZM14.3004 19.0021C12.8546 19.0061 11.4146 18.8251 10.0173 18.4638L9.05623 19.3676C8.52241 19.8718 7.92469 20.3076 7.27755 20.6644C6.49241 21.0494 5.63948 21.286 4.76388 21.3618C4.81249 21.2775 4.85527 21.1932 4.89853 21.1137C5.86006 19.3777 6.11931 17.8202 5.67631 16.4411C4.09499 15.2286 3.14853 13.679 3.14853 11.9845C3.14853 8.10216 8.14283 4.95699 14.3004 4.95699C20.4579 4.95699 25.4522 8.10216 25.4522 11.9845C25.4522 15.8668 20.4579 19.0021 14.3004 19.0021ZM8.95026 13.6558C8.50877 13.6619 8.08281 13.4973 7.76572 13.198C7.44863 12.8988 7.26627 12.4893 7.25859 12.0593C7.22457 9.91029 10.5559 9.86342 10.5894 12.0077V12.0318C10.5915 12.2434 10.5507 12.4533 10.4694 12.6495C10.3881 12.8457 10.2679 13.0243 10.1157 13.1752C9.96343 13.3262 9.78214 13.4464 9.58217 13.529C9.3822 13.6116 9.16747 13.655 8.95026 13.6568V13.6558ZM12.5363 12.0593C12.4979 9.91029 15.8292 9.85868 15.8676 12.003V12.0318C15.8866 14.1662 12.5747 14.1894 12.5363 12.0593ZM19.5061 13.6558C19.0646 13.6619 18.6386 13.4973 18.3214 13.198C18.0043 12.8988 17.8218 12.4893 17.814 12.0593C17.7804 9.91029 21.1118 9.86342 21.1453 12.0077V12.0318C21.1481 12.2436 21.1078 12.4538 21.0267 12.6503C20.9457 12.8468 20.8255 13.0257 20.6731 13.1768C20.5208 13.3278 20.3392 13.448 20.1389 13.5304C19.9386 13.6128 19.7236 13.6557 19.5061 13.6568V13.6558Z"
                fill="#F9F8F8"
              />
            </svg>
          </StyledFabCta>
          <StyledMainText>Good Morning, {_user.name}</StyledMainText>
          <StyledGrid>
            <StyledLeftContainer>
              <WelcomeBanner />
              <StartBanner />
              <InfoSnackbar>👋 I am leaving the game</InfoSnackbar>
            </StyledLeftContainer>
            <StyledRightContainer>
              <Chat />
              <InfoSnackbar>👋 I am leaving the game</InfoSnackbar>
            </StyledRightContainer>
          </StyledGrid>
        </StyledContentContainer>
      </StyledContainer>
    </>
  );
};

export default MemoryGame;
