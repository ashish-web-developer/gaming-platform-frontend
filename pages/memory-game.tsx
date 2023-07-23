import { GetStaticProps, NextPage } from "next";
// Mui
import { Grid,Box ,useMediaQuery,useTheme} from "@mui/material"
import styled  from "styled-components";

// Local components
import Card from "@/components/game/card/Card"


// helpers 
import { getRandomCard,getRandomImage} from "@/helpers/memory-game/game";
import { insertSameElementsRandomly } from "@/helpers/common";

// files readers
import fs from "fs";
import path from "path";


const color = {
    primary:"rgb(3 13 9)",
    secondary:"rgb(16 9 22)",
    text:"#fffdff",
    button:"#8102f7",
    errors :"#d11534"
}
const StyledContainer = styled(Box)`
    display:flex;
    justify-content:center;
    align-items:center;
    padding:60px 100px;
    min-height:100vh;
    background-color:${color.primary};
    @media (max-width: 600px) {
        padding:30px 20px;
    }
`

const gameComplexity = 14;

const cardArray:Array<{
    suit:string,
    card:string|number,
    cardColor:"red"|"black"
}> = new Array(gameComplexity);

for(let i = 0;i< gameComplexity/2;i++){
    insertSameElementsRandomly(cardArray,getRandomCard());
}


interface Props {
    files:string[]
}
const MemoryGame:NextPage<Props> = ({files})=>{
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <StyledContainer>
            <Grid container spacing = {2} >
                {
                    cardArray.map((element,i)=>{
                        return(
                            <Grid key = {i} xs = {6} sm = {2} item>
                                <Card backgroundImage= {getRandomImage(files)} width = {isMobile?150:200} {...element} />
                            </Grid>
                        )
                    })
                }

            </Grid>

        </StyledContainer>
    )
}

export async function getStaticProps() {
  const publicFolderPath = './public/memory-game'; // Path to the 'public' folder
  let files:string[] = [];

  try {
    // Read files from the 'public' folder using fs.readdirSync
    files = fs.readdirSync(path.join(process.cwd(), publicFolderPath));
    files = files.filter((file) => file !== '.DS_Store');
  } catch (err) {
    console.error('Error reading folder:', err);
  }

  return {
    props: {
      files,
    },
  };
}
export default MemoryGame;