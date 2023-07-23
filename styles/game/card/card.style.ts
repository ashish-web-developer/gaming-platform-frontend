
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";


const useCardStyles = makeStyles((theme:Theme)=>({
    container:({width}:{width:number})=>({
        width:`${width}px`,
        height:`${width*1.4}px`,
        border:"2px solid #000",
        textTransform:"uppercase",
        borderRadius:"8px"
    })
}))


export default useCardStyles;