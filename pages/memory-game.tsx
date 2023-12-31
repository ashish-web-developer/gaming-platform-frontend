import { NextPage } from "next";
import { useState, useEffect } from "react";
// Mui

// Local components
import MemoryGame from "@/components/memory-game/memory-game";

// files readers
import fs from "fs";
import path from "path";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import {
  updateCardTurnCount,
  updateGameRules,
  updatePlayAudio,
  updateShowGameBoard,
} from "@/store/slice/memory-game.slice";
import { mode } from "@/store/slice/common.slice";

// theme provider
import { ThemeProvider } from "styled-components";

// theme
import getTheme from "@/theme/memory-game.theme";

import { UttranceContext } from "context";

// helpers
import MutableSpeechUtterance from "@/helpers/mutable-speech-uttrance";

interface Props {
  files: string[];
  rules: [string, string][];
}
const MemoryGamePage: NextPage<Props> = ({ files, rules }) => {
  const dispatch = useAppDispatch();
  const _mode = useAppSelector(mode);
  const theme = getTheme(_mode);
  const [speechUttrance, setSpeechUttrance] =
    useState<MutableSpeechUtterance | null>(null);

  useEffect(() => {
    dispatch(updateGameRules(rules));
    setSpeechUttrance(new MutableSpeechUtterance());
    return () => {
      dispatch(updateShowGameBoard(false));
      dispatch(updateCardTurnCount(0));
      dispatch(updatePlayAudio(true));
    };
  }, []);

  return (
    <>
      <UttranceContext.Provider value={speechUttrance}>
        <ThemeProvider theme={theme}>
          <MemoryGame />
        </ThemeProvider>
      </UttranceContext.Provider>
    </>
  );
};

export async function getStaticProps() {
  try {
    // getting all the rules to play memory game
    const rulesFolderPath = path.join(
      process.cwd(),
      "./data/memory-game/rules.json"
    );
    let rules = fs.readFileSync(rulesFolderPath, "utf-8");
    rules = JSON.parse(rules);
    // Read files from the 'public' folder using fs.readdirSync
    const publicFolderPath = "./public/memory-game"; // Path to the 'public' folder
    let files: string[] = fs.readdirSync(
      path.join(process.cwd(), publicFolderPath)
    );
    files = files.filter((file) => file !== ".DS_Store");
    return {
      props: {
        files,
        rules,
      },
    };
  } catch (err) {
    return {
      props: {
        files: [],
        rules: [],
      },
    };
  }
}
export default MemoryGamePage;
