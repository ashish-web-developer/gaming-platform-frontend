// types
import type { FC } from "react";
import EmojiMart from "emoji-mart"

// mui
import { Box } from "@mui/material";
// emoji library
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";


// redux
import { useAppSelector } from "@/hooks/redux";
import { showEmoji } from "@/store/slice/common.slice";


interface Props {
    className?:string;
    callback:(data:any)=>void;
}
const EmojiPicker:FC<Props> = ({className,callback})=>{
    const _showEmoji = useAppSelector(showEmoji);
    return(
        <>
        {
         _showEmoji && 
         <Box className = {className} >
            <Picker data={data} onEmojiSelect={(data:any)=>callback(data)} />
         </Box>
        }
        </>
    )
}


export default EmojiPicker;