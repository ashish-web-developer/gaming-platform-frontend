// types
import type { FC } from "react";
import type Colors from "@/types/data/colors";

// Local components
import Profile from "./profile";



const ChatSidebar:FC<{colors:Colors}> = ({colors})=>{
    const color = useColor(colors);
    return(
        <Profile color = {color}/>
    )
}


const useColor = (colors:Colors)=>{
    const colorsLength = colors.colors.length;
    return colors.colors[Math.floor(Math.random()*colorsLength)];
}

export default ChatSidebar;