import { useEffect, useState, useRef } from "react";
// types
import type { ComponentType } from "react";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import {
  show_game_board,
  updateShowGameBoard,
} from "@/store/slice/memory-game.slice";

type IBaseProps = {
  count_down: number;
};

const withCountDown = (BaseComponent: ComponentType<IBaseProps>) => {
  const EnhancedComponent = () => {
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
          return prev - 1;
        });
      }, 1000);
      return () => {
        timerRef.current && clearInterval(timerRef.current);
      };
    }, []);
    return <BaseComponent count_down={count} />;
  };
  return EnhancedComponent;
};

export default withCountDown;
