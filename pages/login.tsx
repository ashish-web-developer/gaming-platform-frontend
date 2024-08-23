import type { NextPage } from "next";

// local components
import LoginContainer from "@/components/login/login-container";

// theme provider
import { ThemeProvider } from "styled-components";

// theme
import { Theme } from "@/theme/login.theme";

const Login: NextPage = () => {
  return (
    <>
      <ThemeProvider theme={Theme}>
        <LoginContainer />
      </ThemeProvider>
    </>
  );
};

export default Login;
