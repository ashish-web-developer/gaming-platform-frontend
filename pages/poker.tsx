import dynamic from "next/dynamic";
import { useState } from "react";
// types
import type { NextPage } from "next";

// local components
import WelcomePokerScreen from "@/components/poker/welcome-poker-screen/welcome-poker-screen";
const PokerContainer = dynamic(
  () => import("@/components/poker/poker-container/poker-container"),
  {
    ssr: false,
  }
);

// theme provider
import { ThemeProvider } from "styled-components";

// theme
import { Theme } from "@/theme/poker.theme";

// hooks

const PokerPage: NextPage = () => {
  const [show_welcome_screen, setShowWelcomeScreen] = useState(true);

  return (
    <ThemeProvider theme={Theme}>
      {show_welcome_screen ? (
        <WelcomePokerScreen
          updateShowWelcomeScreen={(show: boolean) =>
            setShowWelcomeScreen(show)
          }
        />
      ) : (
        <PokerContainer />
      )}
    </ThemeProvider>
  );
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { req, res } = context;
//   const referer = req.headers.referer;
//   if (referer) {
//     return {
//       props: {},
//     };
//   } else {
//     return {
//       redirect: {
//         destination: "/chat",
//         permanent: false,
//       },
//     };
//   }
// };

export default PokerPage;
