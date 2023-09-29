import { GetStaticProps, NextPage } from "next";
import { useState, useEffect, useRef, useContext } from "react";
// Mui
import { Grid, useMediaQuery, useTheme } from "@mui/material";

// Local components
import MemoryGame from "@/components/memory-game/memory-game";

// helpers
import { getRandomCard } from "@/helpers/memory-game/game";

// Styles
import {
  StyledContainer,
  WelcomeScreenContainer,
  PlayButton,
} from "@/styles/pages/memory-game.style";

// files readers
import fs from "fs";
import path from "path";

// Swiper
import SwiperCard from "@/components/common/swiper";
import { SwiperSlide } from "swiper/react";

// types
import type { GetRandomCard } from "@/types/helpers/memory-game/game";
import type Colors from "@/types/data/colors";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { room_id, is_proposal_sender } from "@/store/slice/game.slice";
import {
  // state
  is_gaming_user_in,
  updateGameRules,
  // actions
  updateIsGamingUserLeaving,
  updateShowInfoSnackbar,
} from "@/store/slice/memory-game.slice";
import { updateGamingUser } from "@/store/slice/game.slice";

// hooks
import { usePresenceChannel } from "@/hooks/pusher";
import { shuffleArray } from "@/helpers/common";

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

const cardArrayInitializaer = (gameComplexity: number) => {
  let index = 0;
  const cardArray: GetRandomCard[] = new Array(gameComplexity);
  while (index < gameComplexity) {
    const card = getRandomCard();
    cardArray[index] = card;
    cardArray[index + 1] = card;
    index += 2;
  }
  shuffleArray(cardArray);
  return cardArray;
};

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
  const cardArray = useRef<GetRandomCard[] | null>(null);
  const [isPlay, setPlay] = useState(false);
  const _room_id = useAppSelector(room_id);
  const _is_gaming_user_in = useAppSelector(is_gaming_user_in);
  usePresenceChannel(`game.${_room_id}`);
  const _is_proposal_sender = useAppSelector(is_proposal_sender);
  if (cardArray.current == null) {
    cardArray.current = cardArrayInitializaer(14);
  }

  useEffect(() => {
    dispatch(updateGameRules(rules));
    speechUttranceRef.current = new MutableSpeechUtterance();
    return () => {
      dispatch(updateIsGamingUserLeaving(false));
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
