
// Mui
import { Grid,Box } from "@mui/material"
import styled  from "styled-components";

// Local components
import Card from "@/components/game/card/Card"


// helpers 
import { getRandomCard} from "@/helpers/memory-game/game";
import { insertSameElementsRandomly } from "@/helpers/common";


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
`

const gameComplexity = 14;

const cardArray:Array<{
    suit:string,
    backgroundImage:string,
    card:string|number,
    cardColor:"red"|"black"
}> = new Array(gameComplexity);

for(let i = 0;i< gameComplexity/2;i++){
    insertSameElementsRandomly(cardArray,getRandomCard());
}

const MemoryGame = ()=>{
    console.log(cardArray);
    return (
        <StyledContainer>
            <Grid container spacing = {2} >
                {
                    cardArray.map((element,i)=>{
                        return(
                            <Grid xs = {2} item>
                                <Card width = {200} {...element} />
                            </Grid>
                        )
                    })
                }

            </Grid>

        </StyledContainer>
    )
}


export default MemoryGame;