import { GetStaticProps, NextPage } from "next";
import { useState } from "react";
// Mui
import { Grid, Box, useMediaQuery, useTheme ,Button} from "@mui/material";
import styled from "styled-components";

// Local components
import Card from "@/components/game/card/Card";

// helpers
import { getRandomCard} from "@/helpers/memory-game/game";
import { insertSameElementsRandomly } from "@/helpers/common";

// files readers
import fs from "fs";
import path from "path";

// Swiper
import SwiperCard from "@/components/common/swiper";
import { SwiperSlide } from "swiper/react";


// Redux
import { useAppDispatch } from "@/hooks/redux";
import { updateCard } from "@/store/memory-game.slice";

// types
import type { GetRandomCard } from "@/types/helpers/memory-game/game";


// uuidv4 
import {v4 as uuidv4} from "uuid";

const color = {
  primary: "rgb(3 13 9)",
  secondary: "rgb(16 9 22)",
  text: "#fffdff",
  button: "#8102f7",
  errors: "#d11534",
};
const StyledContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 100px;
  min-height: 100vh;
  background-color: ${color.primary};
  @media (max-width: 600px) {
    padding: 30px 20px;
  }
`;
const WelcomeScreenContainer = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  gap:30px;
  min-height: 100vh;
  background-color: ${color.primary};
  @media (max-width: 600px) {
    padding: 30px 20px;
  }
`


const PlayButton = styled(Button)`
    padding:16px 50px;
    color:${color.text};
    background-color:${color.button};
    font-size:18px;
    font-family:'Rubik Moonrocks', cursive;
    border-radius:8px;
    &:hover {
      background-color:${color.button};
    }
`

const gameComplexity = 14;

const cardArray:GetRandomCard[] = new Array(gameComplexity)
for (let i = 0; i < gameComplexity / 2; i++) {
  insertSameElementsRandomly(cardArray, getRandomCard());
}

interface Props {
  files: string[];
}
const MemoryGame: NextPage<Props> = ({ files }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isPlay, setPlay] = useState(false);

  return (
    <>
      {isPlay ? 
        (
        <StyledContainer>
          <Grid container spacing={2}>
            {cardArray.map((element, i) => {
              return (
                <Grid key={uuidv4()} xs={6} sm={2} item>
                  <Card
                    cardId={uuidv4()}
                    files = {files}
                    width={isMobile ? 150 : 200}
                    {...element}
                    isPlay = {isPlay}
                  />
                </Grid>
              );
            })}
          </Grid>
        </StyledContainer>
      ):(
        <WelcomeScreenContainer>
          <SwiperCard>
            {cardArray.map((element, i) => {
              return (
                <SwiperSlide key = {uuidv4()}>
                  <Card
                    cardId = {uuidv4()}
                    files = {files}
                    width={isMobile ? 150 : 200}
                    isPlay = {isPlay}
                    {...element}
                  />
                </SwiperSlide>
              );
            })}
          </SwiperCard>
          <PlayButton 
            variant="contained"
            onClick={()=>setPlay(true)}
          >
            Lets Play
        </PlayButton>
        </WelcomeScreenContainer>
      )
      }
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
