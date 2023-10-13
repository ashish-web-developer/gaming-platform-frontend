import { NextPage } from "next";
import { useEffect, useRef, useContext } from "react";
// Mui

// Local components
import MemoryGame from "@/components/memory-game/memory-game";

// files readers
import fs from "fs";
import path from "path";

// types
import type Colors from "@/types/data/colors";

// redux
import { useAppDispatch } from "@/hooks/redux";
import {
  updateCardList,
  updateCardTurnCount,
  updateGameRules,
  updateIsGamingUserIn,
  updateIsGamingUserLeaving,
  updateShowGameBoard,
} from "@/store/slice/memory-game.slice";

// theme provider
import { ThemeProvider } from "styled-components";

// theme
import getTheme from "@/theme/memory-game.theme";

// context
import { ThemeMode } from "context";
import { ColorsContext } from "context";
import { UttranceContext } from "context";

// helpers
import MutableSpeechUtterance from "@/helpers/mutable-speech-uttrance";

interface Props {
  files: string[];
  colors: Colors;
  rules: [string, string][];
}
const MemoryGamePage: NextPage<Props> = ({ files, colors, rules }) => {
  const dispatch = useAppDispatch();
  const mode = useContext(ThemeMode);
  const theme = getTheme(mode);
  const speechUttranceRef = useRef<MutableSpeechUtterance | null>(null);

  useEffect(() => {
    dispatch(updateGameRules(rules));
    speechUttranceRef.current = new MutableSpeechUtterance();
    return () => {
      dispatch(updateIsGamingUserLeaving(false));
      dispatch(updateShowGameBoard(false));
      dispatch(updateCardList([]));
      dispatch(updateCardTurnCount(0));
      dispatch(updateIsGamingUserIn(false));
    };
  }, []);

  return (
    <>
      <UttranceContext.Provider value={speechUttranceRef.current}>
        <ColorsContext.Provider value={colors}>
          <ThemeProvider theme={theme}>
            <MemoryGame />
          </ThemeProvider>
        </ColorsContext.Provider>
      </UttranceContext.Provider>
    </>
  );
};

export async function getStaticProps() {
  try {
    // Getting the colors
    const colorsFolderPath = path.join(process.cwd(), "./data/colors.json");
    let colors: Colors | string = fs.readFileSync(colorsFolderPath, "utf-8");
    colors = JSON.parse(colors) as Colors;

    // getting all the rules to play memory game
    const rulesFolderPath = path.join(
      process.cwd(),
      "./data/memory-game/rules.json"
    );
    let rules = fs.readFileSync(rulesFolderPath, "utf-8");
    rules = JSON.parse(rules);
    console.log("value or rules", rules);
    // Read files from the 'public' folder using fs.readdirSync
    const publicFolderPath = "./public/memory-game"; // Path to the 'public' folder
    let files: string[] = fs.readdirSync(
      path.join(process.cwd(), publicFolderPath)
    );
    files = files.filter((file) => file !== ".DS_Store");
    return {
      props: {
        files,
        colors,
        rules,
      },
    };
  } catch (err) {
    return {
      props: {
        files: [],
        colors: [],
        rules: [],
      },
    };
  }
}
export default MemoryGamePage;
