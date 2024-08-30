import { useRef } from "react";
// types
import type { NextPage } from "next";

// local components
import LoginContainer from "@/components/login/login-container";

// theme provider
import { ThemeProvider } from "styled-components";

// theme
import { Theme } from "@/theme/login.theme";

// helpers
import MutableSpeechUtterance from "@/helpers/mutable-speech-uttrance";
// context
import { UttranceContext } from "context";

const Login: NextPage = () => {
  const speech_uttrance_ref = useRef<MutableSpeechUtterance | null>(null);
  return (
    <ThemeProvider theme={Theme}>
      <UttranceContext.Provider value={speech_uttrance_ref}>
        <LoginContainer />
      </UttranceContext.Provider>
    </ThemeProvider>
  );
};

export default Login;
