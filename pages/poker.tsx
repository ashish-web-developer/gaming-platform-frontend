import type { NextPage } from "next";

// local components
import PokerContainer from "@/components/poker/poker-container/poker-container";

// theme provider
import { ThemeProvider } from "styled-components";

// theme
import { Theme } from "@/theme/poker.theme";

const PokerPage: NextPage = () => {
  return (
    <ThemeProvider theme={Theme}>
      <PokerContainer />
    </ThemeProvider>
  );
};
export default PokerPage;
