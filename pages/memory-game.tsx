import { GetStaticProps, NextPage } from "next";
import { useState, useEffect } from "react";
// Mui
import { Grid, useMediaQuery, useTheme } from "@mui/material";

// Local components
import Card from "@/components/memory-game/card";

// helpers
import { getRandomCard } from "@/helpers/memory-game/game";
import { insertSameElementsRandomly } from "@/helpers/common";

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

// uuidv4
import { v4 as uuidv4 } from "uuid";

import { useAppSelector } from "@/hooks/redux";
import { room_id } from "@/store/slice/game.slice";

// hooks
import { usePresenceChannel } from "@/hooks/pusher";

const gameComplexity = 14;

const cardArray: GetRandomCard[] = new Array(gameComplexity);
for (let i = 0; i < gameComplexity / 2; i++) {
  insertSameElementsRandomly(cardArray, getRandomCard());
}

interface Props {
  files: string[];
}
const MemoryGame: NextPage<Props> = ({ files }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isPlay, setPlay] = useState(false);
  const _room_id = useAppSelector(room_id);
  usePresenceChannel(`game.${_room_id}`);

  return (
    <>
      {isPlay ? (
        <StyledContainer>
          <Grid container spacing={2}>
            {cardArray.map((element, i) => {
              return (
                <Grid key={uuidv4()} xs={6} sm={2} item>
                  <Card
                    cardId={`deck-${i}`}
                    files={files}
                    width={isMobile ? 150 : 200}
                    {...element}
                    isPlay={isPlay}
                  />
                </Grid>
              );
            })}
          </Grid>
        </StyledContainer>
      ) : (
        <WelcomeScreenContainer>
          <SwiperCard>
            {cardArray.map((element, i) => {
              return (
                <SwiperSlide key={uuidv4()}>
                  <Card
                    cardId={`card-${i}`}
                    files={files}
                    width={isMobile ? 150 : 200}
                    isPlay={isPlay}
                    {...element}
                  />
                </SwiperSlide>
              );
            })}
          </SwiperCard>
          <PlayButton variant="contained" onClick={() => setPlay(true)}>
            Lets Play
          </PlayButton>
        </WelcomeScreenContainer>
      )}
    </>
  );
};

export async function getStaticProps() {
  const publicFolderPath = "./public/memory-game"; // Path to the 'public' folder
  let files: string[] = [];

  try {
    // Read files from the 'public' folder using fs.readdirSync
    files = fs.readdirSync(path.join(process.cwd(), publicFolderPath));
    files = files.filter((file) => file !== ".DS_Store");
  } catch (err) {
    console.error("Error reading folder:", err);
  }

  return {
    props: {
      files,
    },
  };
}
export default MemoryGame;
