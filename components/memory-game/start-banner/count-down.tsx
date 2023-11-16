import { useState, useEffect, useRef, forwardRef } from "react";
// types
import type { FC, ForwardRefRenderFunction } from "react";
import type CustomMemoryGameThemePalette from "@/types/theme/memory-game";

// styled components
import { StyledCountDown } from "@/styles/components/memory-game/start-banner/count-down.style";

// theme
import { useTheme } from "styled-components";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import {
  show_game_board,
  updateShowGameBoard,
} from "@/store/slice/memory-game.slice";

const CountDown: ForwardRefRenderFunction<{
  count_down_audio: HTMLAudioElement | null;
}> = (props, count_down_sound_ref) => {
  const theme = useTheme() as CustomMemoryGameThemePalette;
  const dispatch = useAppDispatch();
  const [count, setCount] = useState(5);
  const _show_game_board = useAppSelector(show_game_board);
  const timerRef = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    if (count <= 0 && timerRef.current) {
      clearInterval(timerRef.current);
      dispatch(updateShowGameBoard(true));
    }
    if (_show_game_board && timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, [count, _show_game_board]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCount((prev) => {
        if (prev == 3 && typeof count_down_sound_ref !== "function") {
          count_down_sound_ref?.current?.count_down_audio?.play();
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      timerRef.current && clearInterval(timerRef.current);
    };
  }, []);

  return (
    <StyledCountDown>
      00:
      <span style={{ color: theme.palette.start_banner.timer.text_right }}>
        {String(count).padStart(2, "0")}
      </span>
    </StyledCountDown>
  );
};

export default forwardRef(CountDown);
