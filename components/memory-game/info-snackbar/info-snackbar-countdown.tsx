import { useEffect, useState } from "react";
import { useRouter } from "next/router";
// types
import type { FC } from "react";

// styled components
import { StyledCountDown } from "@/styles/components/memory-game/info-snackbar/info-snackbar-countdown.style";

// redux
import { useAppDispatch } from "@/hooks/redux";
import {
  updateGamingUser,
  udpateIsProposalSender,
  updateRoomId,
} from "@/store/slice/game.slice";

const InfoSnackbarCountdown: FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [count, setCount] = useState<number>(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (count == 0) {
      router.push("/chat");
      dispatch(updateGamingUser(null));
      dispatch(udpateIsProposalSender(false));
      dispatch(updateRoomId(null));
    }
  }, [count]);
  return <StyledCountDown>{String(count).padStart(2, "0")}</StyledCountDown>;
};

export default InfoSnackbarCountdown;
