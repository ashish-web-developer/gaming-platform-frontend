import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
// types
import type { FC } from "react";
import type CustomMemoryGameThemePalette from "@/types/theme/memory-game";
import type { IUsersWithConversation } from "@/types/store/slice/chat";

// local components
import Chat from "@/components/memory-game/chat/chat";
import InfoSnackbar from "@/components/memory-game/info-snackbar/info-snackbar";

const WelcomeBanner = dynamic(
  () => import("@/components/memory-game/welcome-banner/welcome-banner"),
  {
    ssr: true,
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

const StartBanner = dynamic(
  () => import("@/components/memory-game/start-banner/start-banner"),
  {
    ssr: false,
  }
);

const MobileStartBanner = dynamic(
  () =>
    import("@/components/memory-game/start-banner/mobile/mobile-start-banner"),
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
const LiveStreamChat = dynamic(
  () => import("@/components/memory-game/live-stream-chat/live-stream-chat"),
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
  show_help_tooltip,
  show_help_drawer,
  show_game_board,
  is_gaming_user_in,
  score,
  show_chat_streaming_modal,
  info_snackbar,
  show_leaving_snackbar,
  // api call
  getCards,
  updateScoreEvent,
  // action
  updateShowHelpTooltip,
  updateCardList,
  updateCardState,
  updatePlayerTurnId,
  updateLastFlippedCard,
  updateScore,
  updateLiveStreamChatList,
  updateInfoSnackbar,
} from "@/store/slice/memory-game.slice";
import {
  room_id,
  is_proposal_sender,
  gaming_user,
  updateTimerStartCountEvent,
  updateTimerStartCount,
} from "@/store/slice/game.slice";
import { mode } from "@/store/slice/common.slice";

// icons
import HelpIcon from "@/components/memory-game/icons/help";

// hooks
import { usePresenceChannel } from "@/hooks/pusher.hook";
import { useIsMobile } from "@/hooks/common.hook";

const MemoryGame: FC = () => {
  const theme = useTheme() as CustomMemoryGameThemePalette;
  const dispatch = useAppDispatch();
  const _mode = useAppSelector(mode);
  const _show_help_tooltip = useAppSelector(show_help_tooltip);
  const _show_help_drawer = useAppSelector(show_help_drawer);
  const _show_game_board = useAppSelector(show_game_board);
  const _room_id = useAppSelector(room_id);
  const _is_gaming_user_in = useAppSelector(is_gaming_user_in);
  const _is_proposal_sender = useAppSelector(is_proposal_sender);
  const _gaming_user = useAppSelector(gaming_user);
  const is_mobile = useIsMobile();
  const _user = useAppSelector(user);
  const voiceRef = useRef<{ voice: SpeechSynthesisVoice[] }>({
    voice: [],
  });
  const _score = useAppSelector(score);
  const _score_list = _score && Object.values(_score);
  const _show_chat_streaming_modal = useAppSelector(show_chat_streaming_modal);
  const _info_snackbar = useAppSelector(info_snackbar);
  const _show_leaving_snackbar = useAppSelector(show_leaving_snackbar);

  usePresenceChannel(`game.${_room_id}`, [
    {
      event: "CardListDataEvent",
      callback: (data) => {
        dispatch(updateCardList(data.card_list));
      },
    },
    {
      event: "MemoryGameEvent",
      callback: (data) => {
        dispatch(updateCardState({ id: data.card_id, flipped: data.flipped }));
      },
    },
    {
      event: "UpdatePlayerTurnEvent",
      callback: (data) => {
        dispatch(updatePlayerTurnId(data.player_turn_id));
      },
    },
    {
      event: "UpdateLastFlippedCard",
      callback: (data) => {
        dispatch(updateLastFlippedCard(data.card_id));
      },
    },
    {
      event: "UpdateTimerStartCountEvent",
      callback: (data) => {
        dispatch(updateTimerStartCount(data.start_timer_count));
      },
    },
    {
      event: "UpdateMemoryGameScore",
      callback: (data) => {
        dispatch(updateScore(data.score));
        console.log(data);
      },
    },
    {
      event: "LiveChatStreamEvent",
      callback: (data: { user: IUsersWithConversation; message: string }) => {
        dispatch(updateLiveStreamChatList(data));
        if (data.user.id !== _user.id) {
          dispatch(
            updateInfoSnackbar({
              name: data.user.name,
              message: data.message,
              show_snacbar: true,
            })
          );
          setTimeout(() => {
            dispatch(
              updateInfoSnackbar({
                name: "",
                message: "",
                show_snacbar: false,
              })
            );
          }, 3000);
        }
      },
    },
  ]);

  useEffect(() => {
    if (_is_gaming_user_in && _is_proposal_sender) {
      dispatch(getCards());
      dispatch(
        updateTimerStartCountEvent({ timer_count: new Date().getTime() })
      );
      dispatch(
        updateScoreEvent({
          score: {
            [_gaming_user?.id as number]: 0,
            [_user.id as number]: 0,
          },
        })
      );
      dispatch(updatePlayerTurnId(_user.id));
    }
  }, [_is_proposal_sender, _is_gaming_user_in]);

  useEffect(() => {
    const updateVoices = () => {
      voiceRef.current.voice = speechSynthesis.getVoices();
    };
    updateVoices();
    window.speechSynthesis.addEventListener("voiceschanged", updateVoices);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", updateVoices);
    };
  }, []);

  return (
    <StyledPage>
      {is_mobile && _show_chat_streaming_modal && <LiveStreamChat />}
      {is_mobile && _show_help_drawer && <MobileHelpTooltip ref={voiceRef} />}
      <StyledContainer>
        {_show_help_tooltip && <HelpTooltip ref={voiceRef} />}
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
                <StyledMainText>
                  Good Morning,
                  <br />
                  {_user.name}
                </StyledMainText>
              ) : (
                <StyledMainText>Good Morning, {_user.name}</StyledMainText>
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
                      <MobileStartBanner />
                    </>
                  ) : (
                    <>
                      <WelcomeBanner />
                      <StartBanner />
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
                <Chat />
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
