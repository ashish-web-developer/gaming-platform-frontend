import dynamic from "next/dynamic";
import { useContext } from "react";
// types
import type { FC } from "react";
import type CustomMemoryGameThemePalette from "@/types/theme/memory-game";

// local components
import WelcomeBanner from "@/components/memory-game/welcome-banner/welcome-banner";
import StartBanner from "@/components/memory-game/start-banner/start-banner";
import Chat from "@/components/memory-game/chat/chat";
import InfoSnackbar from "@/components/memory-game/info-snackbar/info-snackbar";
import Nav from "@/components/memory-game/nav/nav";
import MobileNav from "@/components/memory-game/nav/mobile-nav";
const HelpTooltip = dynamic(
  () => import("@/components/memory-game/help-tooltip/help-tooltip"),
  {
    ssr: false,
  }
);

const MobileHelpTooltip = dynamic(
  () =>
    import("@/components/memory-game/help-tooltip/mobile/mobile-help-tooltip"),
  {
    ssr: false,
  }
);
// styled components
import GlobalStyles, {
  StyledContainer,
  StyledGrid,
  StyledLeftContainer,
  StyledRightContainer,
  StyledBackgroundCircleOne,
  StyledBackgroundCircleTwo,
  StyledMainText,
  StyledChatContainer,
  StyledContentContainer,
  StyledInfoSnackbarContainer,
  StyledHelpCtaContainer,
  StyledHelpCta,
} from "@/styles/components/memory-game/memory-game.style";

// styled theme
import { useTheme } from "styled-components";
// mui
import { useMediaQuery, Tooltip } from "@mui/material";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { user } from "@/store/slice/user.slice";
import {
  // state
  show_mobile_chat,
  show_help_tooltip,
  show_help_drawer,
  // action
  updateShowHelpTooltip,
} from "@/store/slice/memory-game.slice";

// context
import { ThemeMode } from "context";

// icons
import HelpIcon from "@/components/memory-game/icons/help";

const MemoryGame: FC = () => {
  const themeMode = useContext(ThemeMode);
  const theme = useTheme() as CustomMemoryGameThemePalette;
  const dispatch = useAppDispatch();
  const _show_mobile_chat = useAppSelector(show_mobile_chat);
  const _show_help_tooltip = useAppSelector(show_help_tooltip);
  const _show_help_drawer = useAppSelector(show_help_drawer);
  const isMobile = useMediaQuery(
    `(max-width:${theme.palette.breakpoints.mobile})`
  );
  const _user = useAppSelector(user);
  return (
    <>
      <GlobalStyles />
      {isMobile && _show_help_drawer && <MobileHelpTooltip />}
      <StyledContainer>
        {_show_help_tooltip && <HelpTooltip />}
        <StyledHelpCtaContainer>
          <Tooltip title="Need Help?" placement="right-start">
            <StyledHelpCta
              onClick={() => dispatch(updateShowHelpTooltip(true))}
            >
              <HelpIcon
                width={60}
                height={60}
                color={theme.palette.help_tooltip.help_tooltip_cta.cta_color}
              />
            </StyledHelpCta>
          </Tooltip>
        </StyledHelpCtaContainer>
        <StyledBackgroundCircleOne $mode={themeMode} />
        <StyledBackgroundCircleTwo $mode={themeMode} />
        {_show_mobile_chat && (
          <StyledChatContainer>
            <Chat />
          </StyledChatContainer>
        )}
        <StyledInfoSnackbarContainer>
          <InfoSnackbar>👋 I am leaving the game</InfoSnackbar>
        </StyledInfoSnackbarContainer>
        <StyledContentContainer>
          <Nav />
          <MobileNav />
          <StyledMainText>Good Morning, {_user.name}</StyledMainText>
          <StyledGrid>
            <StyledLeftContainer>
              <WelcomeBanner />
              <StartBanner />
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
