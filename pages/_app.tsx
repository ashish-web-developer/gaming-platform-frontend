import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createContext } from "react";

// Redux
import { Provider } from "react-redux";
import store from "@/store/rootReducer";

// Provider
import CsrfTokenProvider from "@/providers/CsrfTokenProvider";
import UserProvider from "@/providers/UserProvider";

// context 
import { ThemeMode } from "context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeMode.Provider value="dark">
      <Provider store={store}>
        <CsrfTokenProvider>
          <UserProvider>
            <Component {...pageProps} />
          </UserProvider>
        </CsrfTokenProvider>
      </Provider>
    </ThemeMode.Provider>
  );
  //return <Component {...pageProps} />
}

export default MyApp;
