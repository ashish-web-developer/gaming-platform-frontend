import { useEffect } from "react";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { updateActiveUser, fetchMessages } from "@/store/slice/chat.slice";
import { gaming_user } from "@/store/slice/game.slice";
const useChatInitializer = () => {
  const dispatch = useAppDispatch();
  const _gaming_user = useAppSelector(gaming_user);
  useEffect(() => {
    if (_gaming_user?.id) {
      dispatch(updateActiveUser(_gaming_user));
      dispatch(fetchMessages());
    }
  }, [_gaming_user]);
};

export { useChatInitializer };
