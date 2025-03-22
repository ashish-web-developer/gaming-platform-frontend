import { useContext, useEffect, useRef } from "react";

// types
import type { FC } from "react";
import type { ITheme } from "@/theme/poker.theme";

// theme
import { useTheme } from "styled-components";

// hoc
import withCountDownFunctionality from "@/hoc/common/with-count-down-functionality";

// styled components
import {
  StyledPokerTimerWrapper,
  StyledTimer,
  StyledTimerCount,
  StyledTimerUnit,
} from "@/styles/components/poker/poker-timer/poker-timer.style";

// context
import { MediaContext } from "context";

// gsap
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const PokerTimer: FC<{
  count: number;
  is_finished: boolean;
  add_ticker_animation: boolean;
  handleOnFinish: () => void;
}> = ({ count, is_finished, add_ticker_animation, handleOnFinish }) => {
  const theme = useTheme() as ITheme;
  const timer_container_ref = useRef<HTMLDivElement>(null);
  const {
    current: { clock_ticking_sound },
  } = useContext(MediaContext);
  let minutes = Math.floor(count / 60);
  let seconds = count % 60;

  useEffect(() => {
    if (is_finished) {
      handleOnFinish();
    }
  }, [is_finished]);

  useGSAP(
    () => {
      if (add_ticker_animation && count <= 8) {
        gsap.from(timer_container_ref.current, {
          scale: 1.2,
          duration: 0.3,
          ease: "bounce",
        });
        if (clock_ticking_sound && count == 8) {
          clock_ticking_sound.play();
        }
      }
    },
    {
      dependencies: [count, add_ticker_animation],
    }
  );

  return (
    <StyledPokerTimerWrapper ref={timer_container_ref}>
      <StyledTimer
        $border_color={
          add_ticker_animation && count <= 8
            ? theme.palette.secondary.main
            : theme.palette.info.main
        }
      >
        <StyledTimerCount>
          {minutes.toString().padStart(2, "0")}
        </StyledTimerCount>
        <StyledTimerUnit>MIN</StyledTimerUnit>
      </StyledTimer>
      <StyledTimer
        $border_color={
          add_ticker_animation && count <= 8
            ? theme.palette.secondary.main
            : theme.palette.info.main
        }
      >
        <StyledTimerCount>
          {seconds.toString().padStart(2, "0")}
        </StyledTimerCount>
        <StyledTimerUnit>SEC</StyledTimerUnit>
      </StyledTimer>
    </StyledPokerTimerWrapper>
  );
};
export default withCountDownFunctionality<{
  initial_count: number;
  handleOnFinish: () => void;
  add_ticker_animation: boolean;
}>(PokerTimer);
