import dynamic from "next/dynamic";
import { useRef, useState } from "react";
// types
import type { NextPage } from "next";
import type { GetServerSideProps } from "next";

// local components
const LoginContainer = dynamic(
  () => import("@/components/login/login-container/login-container"),
  {
    ssr: false,
  }
);

const MobileLoginContainer = dynamic(
  () => import("@/components/login/login-container/mobile-login-container"),
  {
    ssr: false,
  }
);

const WelcomeLoginScreen = dynamic(
  () => import("@/components/login/welcome-login-screen/welcome-login-screen"),
  {
    ssr: false,
  }
);
const MobileWelcomeLoginScreen = dynamic(
  () =>
    import(
      "@/components/login/welcome-login-screen/mobile-welcome-login-screen"
    ),
  {
    ssr: false,
  }
);

// theme provider
import { ThemeProvider } from "styled-components";

// theme
import { Theme } from "@/theme/login.theme";

// helpers
import MutableSpeechUtterance from "@/helpers/mutable-speech-uttrance";

// context
import { UttranceContext } from "context";

// hooks
import { useIsMobile } from "@/hooks/common.hook";

const Login: NextPage<{
  is_mobile: boolean;
}> = ({ is_mobile }) => {
  const [show_login, setShowLogin] = useState(false);
  const uttrance_context = useRef<MutableSpeechUtterance | null>(null);
  const is_client_mobile = useIsMobile();

  return (
    <ThemeProvider theme={Theme}>
      <UttranceContext.Provider value={uttrance_context}>
        <div>
          {show_login ? (
            is_mobile || is_client_mobile ? (
              <MobileLoginContainer />
            ) : (
              <LoginContainer />
            )
          ) : is_mobile || is_client_mobile ? (
            <MobileWelcomeLoginScreen
              updateShowLogin={(show) => setShowLogin(show)}
            />
          ) : (
            <WelcomeLoginScreen
              updateShowLogin={(show) => setShowLogin(show)}
            />
          )}
        </div>
      </UttranceContext.Provider>
    </ThemeProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const user_agent = context.req.headers["user-agent"];
  const is_mobile = /Mobi|Android/i.test(user_agent as string);
  return {
    props: {
      is_mobile,
    },
  };
};

export default Login;
