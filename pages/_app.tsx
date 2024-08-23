import "../styles/globals.css";
import type { AppProps } from "next/app";

// Redux
import { Provider } from "react-redux";
import store from "@/store/rootReducer";

// Provider
import UserProvider from "@/providers/UserProvider";

// Axios
import axios from "axios";

if (typeof window !== "undefined") {
  // axios.get(`${process.env.NEXT_PUBLIC_API_END_POINT}/sanctum/csrf-cookie`);
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      {/* <UserProvider>
        <Component {...pageProps} />
      </UserProvider> */}

      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
