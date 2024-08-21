// types
import type { FC } from "react";

// styled components
import {
  StyledPage,
  StyledContainer,
  StyledBackgroundCircleOne,
  StyledContentContainer,
  StyledMainText,
} from "@/styles/components/memory-game/mobile-cognimatch-container.style";

// local components
import MobileLiveStreamChat from "@/components/memory-game/live-stream-chat/mobile/mobile-live-stream-chat";
import MobileHelpTooltip from "@/components/memory-game/help-tooltip/mobile/mobile-help-tooltip";
import MobileNav from "@/components/memory-game/nav/mobile/mobile-nav";
import MobileWelcomeBanner from "@/components/memory-game/welcome-banner/mobile/mobile-welcome-banner";
import MobileTimerBanner from "@/components/memory-game/timer-banner/mobile/mobile-timer-banner";
import MobileGameBoard from "@/components/memory-game/game-board/mobile/game-board/mobile-game-board";

// redux
import { useAppSelector } from "@/hooks/redux.hook";
import {
  live_stream_chat,
  show_cognimatch_board,
} from "@/store/slice/cognimatch.slice";
import { user } from "@/store/slice/user.slice";
import { mode } from "@/store/slice/common.slice";

const MobileCognimatchContainer: FC = () => {
  const _mode = useAppSelector(mode);
  const { name } = useAppSelector(user);
  const show_mobile_stream_modal =
    useAppSelector(live_stream_chat).mobile.show_chat_modal;
  const _show_cognimatch_board = useAppSelector(show_cognimatch_board);
  return (
    <StyledPage>
      {show_mobile_stream_modal && <MobileLiveStreamChat />}
      <MobileHelpTooltip />
      <StyledContainer $mode={_mode}>
        <StyledBackgroundCircleOne $mode={_mode} />
        <StyledContentContainer>
          <MobileNav />
          {!_show_cognimatch_board ? (
            <>
              <StyledMainText $mode={_mode}>
                Good Morning,
                <br />
                {name}
              </StyledMainText>
              <MobileWelcomeBanner />
              <MobileTimerBanner />
            </>
          ) : (
            <MobileGameBoard />
          )}
        </StyledContentContainer>
      </StyledContainer>
    </StyledPage>
  );
};
export default MobileCognimatchContainer;
