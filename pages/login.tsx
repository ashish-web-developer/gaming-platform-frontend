import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

// Components
import LoginModal from "../components/login/login-modal";

// styles
import { RootContainer } from "@/styles/pages/login.style";

// Redux
import { user } from "@/store/slice/user.slice";
import { useAppSelector } from "@/hooks/redux";

const Login: NextPage = () => {
  const _user = useAppSelector(user);
  const router = useRouter();

  useEffect(() => {
    if (_user.username) {
      router.push("/chat");
    }
  }, [_user]);
  return (
    <>
      <RootContainer>
        <LoginModal keepShowingModal={true} />
      </RootContainer>
    </>
  );
};

export default Login;
