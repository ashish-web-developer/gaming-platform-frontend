import dynamic from "next/dynamic";
// types
import type { FC } from "react";
import type { ITheme } from "@/theme/cognimatch.theme";

// local components
import InfoSnackbar from "@/components/memory-game/info-snackbar/info-snackbar";

import WelcomeBanner from "@/components/memory-game/welcome-banner/welcome-banner";
import TimerBanner from "@/components/memory-game/timer-banner/timer-banner";
import Nav from "@/components/memory-game/nav/nav";
import HelpTooltip from "@/components/memory-game/help-tooltip/help-tooltip";
import LiveStreamChat from "@/components/memory-game/live-stream-chat/live-stream-chat";

const GameBoard = dynamic(
  () => import("@/components/memory-game/game-board/game-board"),
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
} from "@/styles/components/memory-game/cognimatch-container.style";

// styled theme
import { useTheme } from "styled-components";
// mui
import { Tooltip } from "@mui/material";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import { user } from "@/store/slice/user.slice";
import {
  score,
  show_cognimatch_board,
  info_snackbar,
  updateShowHelpTooltip,
} from "@/store/slice/cognimatch.slice";
import { mode } from "@/store/slice/common.slice";

// icons
import HelpIcon from "@/components/memory-game/icons/help";

// hooks
import { useIsMobile } from "@/hooks/common.hook";

const CognimatchContainer: FC = () => {
  const theme = useTheme() as ITheme;
  const dispatch = useAppDispatch();
  const _mode = useAppSelector(mode);
  const _show_cognimatch_board = useAppSelector(show_cognimatch_board);
  const is_mobile = useIsMobile();
  const { name } = useAppSelector(user);
  const _score = useAppSelector(score);
  const _score_list = _score && Object.values(_score);
  return (
    <StyledPage>
      <StyledContainer $mode={_mode}>
        <HelpTooltip />
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
        <StyledContentContainer>
          <Nav />
          {!_show_cognimatch_board && (
            <StyledMainText $mode={_mode}>Good Morning, {name}</StyledMainText>
          )}
          <StyledGrid>
            <StyledLeftContainer>
              {!_show_cognimatch_board ? (
                <>
                  <WelcomeBanner />
                  <TimerBanner />
                </>
              ) : _score_list?.reduce(
                  (acc, currentValue) => acc + currentValue,
                  0
                ) == 9 ? (
                <ResultBoard />
              ) : (
                <GameBoard />
              )}
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
            </StyledRightContainer>
          </StyledGrid>
        </StyledContentContainer>
      </StyledContainer>
    </StyledPage>
  );
};

export default CognimatchContainer;
