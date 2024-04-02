import dynamic from "next/dynamic";
// types
import type { FC } from "react";
import type { ITheme } from "@/theme/memory-game.theme";

// local components
import InfoSnackbar from "@/components/memory-game/info-snackbar/info-snackbar";

const WelcomeBanner = dynamic(
  () => import("@/components/memory-game/welcome-banner/welcome-banner"),
  {
    ssr: false,
  }
);

const MobileWelcomeBanner = dynamic(
  () =>
    import(
      "@/components/memory-game/welcome-banner/mobile/mobile-welcome-banner"
    ),
  {
    ssr: false,
  }
);

const TimerBanner = dynamic(
  () => import("@/components/memory-game/timer-banner/timer-banner"),
  {
    ssr: false,
  }
);

const MobileTimerBanner = dynamic(
  () =>
    import("@/components/memory-game/timer-banner/mobile/mobile-timer-banner"),
  {
    ssr: false,
  }
);

const Nav = dynamic(() => import("@/components/memory-game/nav/nav"), {
  ssr: true,
});

const MobileNav = dynamic(
  () => import("@/components/memory-game/nav/mobile/mobile-nav"),
  {
    ssr: false,
  }
);

import HelpTooltip from "@/components/memory-game/help-tooltip/help-tooltip";
// const HelpTooltip = dynamic(
//   () => import("@/components/memory-game/help-tooltip/help-tooltip"),
//   {
//     ssr: false,
//   }
// );

// const MobileHelpTooltip = dynamic(
//   () =>
//     import("@/components/memory-game/help-tooltip/mobile/mobile-help-tooltip"),
//   {
//     ssr: false,
//   }
// );
import MobileHelpTooltip from "@/components/memory-game/help-tooltip/mobile/mobile-help-tooltip";

const GameBoard = dynamic(
  () => import("@/components/memory-game/game-board/game-board"),
  {
    ssr: false,
  }
);

const MobileGameBoard = dynamic(
  () =>
    import(
      "@/components/memory-game/game-board/mobile/game-board/mobile-game-board"
    ),
  {
    ssr: false,
  }
);

const ScoreBoard = dynamic(
  () => import("@/components/memory-game/result-board/score-board"),
  {
    ssr: false,
  }
);
const ResultBoard = dynamic(
  () => import("@/components/memory-game/result-board/result-board"),
  {
    ssr: false,
  }
);
const MobileLiveStreamChat = dynamic(
  () =>
    import(
      "@/components/memory-game/live-stream-chat/mobile/mobile-live-stream-chat"
    ),
  {
    ssr: false,
  }
);
const LiveStreamChat = dynamic(
  () => import("@/components/memory-game/live-stream-chat/live-stream-chat"),
  {
    ssr: true,
  }
);

// styled components
import {
  StyledPage,
  StyledContainer,
  StyledGrid,
  StyledLeftContainer,
  StyledRightContainer,
  StyledBackgroundCircleOne,
  StyledBackgroundCircleTwo,
  StyledMainText,
  StyledContentContainer,
  StyledInfoSnackbarContainer,
  StyledHelpCtaContainer,
  StyledHelpCta,
} from "@/styles/components/memory-game/memory-game.style";

// styled theme
import { useTheme } from "styled-components";
// mui
import { Tooltip } from "@mui/material";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import { user } from "@/store/slice/user.slice";
import {
  // state
  show_game_board,
  score,
  show_chat_streaming_modal,
  info_snackbar,
  show_leaving_snackbar,
  // action
  updateShowHelpTooltip,
} from "@/store/slice/memory-game.slice";
import { gaming_user } from "@/store/slice/game.slice";
import { mode } from "@/store/slice/common.slice";

// icons
import HelpIcon from "@/components/memory-game/icons/help";

// hooks
import { useIsMobile } from "@/hooks/common.hook";

const MemoryGame: FC = () => {
  const theme = useTheme() as ITheme;
  const dispatch = useAppDispatch();
  const _mode = useAppSelector(mode);
  const _show_game_board = useAppSelector(show_game_board);
  const _gaming_user = useAppSelector(gaming_user);
  const is_mobile = useIsMobile();
  const _user = useAppSelector(user);
  const _score = useAppSelector(score);
  const _score_list = _score && Object.values(_score);
  const _show_chat_streaming_modal = useAppSelector(show_chat_streaming_modal);
  const _info_snackbar = useAppSelector(info_snackbar);
  const _show_leaving_snackbar = useAppSelector(show_leaving_snackbar);

  return (
    <StyledPage>
      {is_mobile && _show_chat_streaming_modal && <MobileLiveStreamChat />}
      {is_mobile && <MobileHelpTooltip />}
      <StyledContainer $mode={_mode}>
        {!is_mobile && <HelpTooltip />}
        <StyledHelpCtaContainer>
          <Tooltip title="Need Help?" placement="right-start">
            <StyledHelpCta
              onClick={() => dispatch(updateShowHelpTooltip(true))}
            >
              <HelpIcon
                width={60}
                height={60}
                color={theme.palette.primary.light}
              />
            </StyledHelpCta>
          </Tooltip>
        </StyledHelpCtaContainer>
        <StyledBackgroundCircleOne $mode={_mode} />
        <StyledBackgroundCircleTwo $mode={_mode} />
        {(_show_leaving_snackbar || _info_snackbar.show_info_snackbar) &&
          is_mobile && (
            <StyledInfoSnackbarContainer>
              <InfoSnackbar
                receiver_name={
                  _info_snackbar.name
                    ? _info_snackbar.name
                    : (_gaming_user?.name as string)
                }
                show_count_down={_show_leaving_snackbar}
              >
                {_info_snackbar.message
                  ? _info_snackbar.message
                  : "👋 I am leaving the game"}
              </InfoSnackbar>
            </StyledInfoSnackbarContainer>
          )}
        <StyledContentContainer>
          {is_mobile ? <MobileNav /> : <Nav />}
          {!_show_game_board && (
            <>
              {is_mobile ? (
                <StyledMainText $mode={_mode}>
                  Good Morning,
                  <br />
                  {_user.name}
                </StyledMainText>
              ) : (
                <StyledMainText $mode={_mode}>
                  Good Morning, {_user.name}
                </StyledMainText>
              )}
            </>
          )}
          <StyledGrid
            $paddingTop={_show_game_board && !is_mobile ? "70px" : null}
          >
            <StyledLeftContainer>
              {!_show_game_board && (
                <>
                  {is_mobile ? (
                    <>
                      <MobileWelcomeBanner />
                      <MobileTimerBanner />
                    </>
                  ) : (
                    <>
                      <WelcomeBanner />
                      <TimerBanner />
                    </>
                  )}
                </>
              )}
              {_show_game_board &&
                (_score_list?.reduce(
                  (acc, currentValue) => acc + currentValue,
                  0
                ) == 9 ? (
                  <ResultBoard />
                ) : (
                  <>{is_mobile ? <MobileGameBoard /> : <GameBoard />}</>
                ))}
            </StyledLeftContainer>
            <StyledRightContainer>
              {_score_list?.reduce(
                (acc, currentValue) => acc + currentValue,
                0
              ) == 9 ? (
                <ScoreBoard />
              ) : (
                <LiveStreamChat />
              )}

              {(_show_leaving_snackbar ||
                _info_snackbar.show_info_snackbar) && (
                <StyledInfoSnackbarContainer>
                  <InfoSnackbar
                    receiver_name={
                      _info_snackbar.name
                        ? _info_snackbar.name
                        : (_gaming_user?.name as string)
                    }
                    show_count_down={_show_leaving_snackbar}
                  >
                    {_info_snackbar.message
                      ? _info_snackbar.message
                      : "👋 I am leaving the game"}
                  </InfoSnackbar>
                </StyledInfoSnackbarContainer>
              )}
            </StyledRightContainer>
          </StyledGrid>
        </StyledContentContainer>
      </StyledContainer>
    </StyledPage>
  );
};

export default MemoryGame;
