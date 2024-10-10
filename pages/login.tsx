import dynamic from "next/dynamic";
import { useRef, useState } from "react";
// types
import type { NextPage } from "next";

// local components
const LoginContainer = dynamic(
  () => import("@/components/login/login-container"),
  {
    ssr: false,
  }
);

import WelcomeLoginScreen from "@/components/login/welcome-login-screen/welcome-login-screen";
const MobileWelcomeLoginScreen = dynamic(
  () => import("@/components/login/welcome-login-screen/mobile-welcome-login-screen"),
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

const Login: NextPage = () => {
  const [show_login, setShowLogin] = useState(false);
  const uttrance_context = useRef<MutableSpeechUtterance | null>(null);
  const is_mobile = useIsMobile();

  return (
    <ThemeProvider theme={Theme}>
      <UttranceContext.Provider value={uttrance_context}>
        <div>
          {show_login ? (
            <LoginContainer />
          ) : is_mobile ? (
            <MobileWelcomeLoginScreen />
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

export default Login;
