import { useState, useEffect } from "react";
// styled components
import {
  StyledTimer,
  StyledSpan,
  StyledTimeContainer,
  StyledTime,
} from "@/styles/components/memory-game/game-board/timer.style";

// icons
import TimerIcon from "@/components/memory-game/game-board/icons/timer";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { user } from "@/store/slice/user.slice";
import { player_turn_id , updateCardTurnCount} from "@/store/slice/memory-game.slice";
import { gaming_user, updatePlayerTurn } from "@/store/slice/game.slice";

const Timer = () => {
  const dispatch = useAppDispatch();
  const [timerCount, setTimerCount] = useState(30);
  const _user = useAppSelector(user);
  const _player_turn_id = useAppSelector(player_turn_id);
  const _gaming_user = useAppSelector(gaming_user);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimerCount((prev)=>{
        if(prev == 0){
          dispatch(updatePlayerTurn());
          dispatch(updateCardTurnCount(0));
          return 30;
        }
        return prev-1;
      })
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  useEffect(() => {
    setTimerCount(30);
  }, [_player_turn_id]);
  return (
    <StyledTimer>
      {_player_turn_id == _user.id ? (
        <StyledSpan>Your Turn!</StyledSpan>
      ) : (
        <StyledSpan>Waiting...</StyledSpan>
      )}
      <StyledTimeContainer>
        <TimerIcon size={18} />
        <StyledTime>00 : {timerCount}</StyledTime>
      </StyledTimeContainer>
    </StyledTimer>
  );
};

export default Timer;
