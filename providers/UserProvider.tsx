import type { ReactNode, FC } from "react";
import { useEffect } from "react";
import { Axios } from "@/helpers/axios";

// Redux
import { updateUser } from "@/store/slice/user.slice";
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
