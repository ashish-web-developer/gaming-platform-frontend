import { useRouter } from "next/router";
import type { ReactNode, FC } from "react";
import { useEffect } from "react";

// Redux
import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch } from "@/hooks/redux.hook";
import { getUserApi } from "@/store/slice/login.slice";

const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    (async function () {
      const result = await dispatch(getUserApi());
      const response = unwrapResult(result);
      if (response.id && router.pathname.includes("login")) {
        router.push("/chat");
      }
    })();
  }, []);
  return <>{children}</>;
};

export default UserProvider;
