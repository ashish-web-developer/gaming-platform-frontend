import { useRef, useState } from "react";
// types
import type { NextPage } from "next";

// local components
import LoginContainer from "@/components/login/login-container";
import WelcomeLoginScreen from "@/components/login/welcome-login-screen";

// theme provider
import { ThemeProvider } from "styled-components";

// theme
import { Theme } from "@/theme/login.theme";

// helpers
import MutableSpeechUtterance from "@/helpers/mutable-speech-uttrance";

// context
import { UttranceContext } from "context";

const Login: NextPage = () => {
  const [show_login, setShowLogin] = useState(false);
  const gsap_context_ref = useRef<gsap.Context>(null);
  const speech_uttrance_ref = useRef<MutableSpeechUtterance | null>(null);
  const page_container_ref = useRef<HTMLDivElement>(null);
  return (
    <ThemeProvider theme={Theme}>
      <UttranceContext.Provider value={speech_uttrance_ref}>
        <div ref={page_container_ref}>
          {show_login ? (
            <LoginContainer />
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
