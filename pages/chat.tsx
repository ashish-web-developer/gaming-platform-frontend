// types
import { NextPage } from "next"
import type Colors from "@/types/data/colors";


// Mui
import { Grid } from "@mui/material";

// Local components
import ChatContainer from "@/components/chat/chat-container";

// helpers package
import fs from "fs";
import path from "path";



// Local Components
import Profile from "@/components/chat/profile";




const Chat:NextPage<{colors:Colors}> = ({colors})=>{
    return(
        <ChatContainer colors = {colors}/>
    )
}

export const getStaticProps = async()=>{
    const dataFolderPath = path.join(process.cwd(),"./data/colors.json");
    let colors = fs.readFileSync(dataFolderPath,'utf-8');
    colors = JSON.parse(colors);
    return {
        props:{
            colors
        }
    }
}


export default Chat;