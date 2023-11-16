import { useState, useEffect, useRef, forwardRef } from "react";
// types
import type { ForwardRefRenderFunction } from "react";

// redux
import { useAppDispatch } from "@/hooks/redux";
import { updateShowGameBoard } from "@/store/slice/memory-game.slice";

const MobileCountDown: ForwardRefRenderFunction<{
  count_down_audio: HTMLAudioElement | null;
}> = (props, count_down_audio_ref) => {
  const dispatch = useAppDispatch();
  const timerRef = useRef<NodeJS.Timer | null>(null);
  const [count, setCount] = useState(5);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCount((prev) => {
        if (prev == 4 && typeof count_down_audio_ref !== "function") {
          count_down_audio_ref?.current?.count_down_audio?.play();
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      timerRef.current && clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (timerRef.current && count <= 0) {
      clearInterval(timerRef.current);
      dispatch(updateShowGameBoard(true));
    }
  }, [count]);
  return <>{count}</>;
};

export default forwardRef(MobileCountDown);
