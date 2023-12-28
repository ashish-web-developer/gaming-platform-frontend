import { useEffect, useState } from "react";
import { useRouter } from "next/router";
// types
import type { FC } from "react";

// styled components
import { StyledCountDown } from "@/styles/components/memory-game/info-snackbar/info-snackbar-countdown.style";

// redux
import { useAppDispatch } from "@/hooks/redux.hook";
import {
  updateGamingUser,
  udpateIsProposalSender,
  updateRoomId,
} from "@/store/slice/game.slice";
import {
  updateLastFlippedCard,
  updateShowHelpTooltip,
  updatePlayerTurnId,
} from "@/store/slice/memory-game.slice";

const InfoSnackbarCountdown: FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [count, setCount] = useState<number>(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev == 0) {
          dispatch(updateGamingUser(null));
          dispatch(udpateIsProposalSender(false));
          dispatch(updateRoomId(null));
          dispatch(updateShowHelpTooltip(false));
          dispatch(updatePlayerTurnId(null));
          dispatch(updateLastFlippedCard(null));
          router.push("/chat");
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return <StyledCountDown>{String(count).padStart(2, "0")}</StyledCountDown>;
};

export default InfoSnackbarCountdown;
