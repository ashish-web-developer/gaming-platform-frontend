import type { ReactNode, FC } from "react";
import { useEffect } from "react";

// Redux
import { useAppDispatch } from "@/hooks/redux.hook";
import { getUser } from "@/store/slice/user.slice";

const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, []);
  return <>{children}</>;
};

export default UserProvider;
