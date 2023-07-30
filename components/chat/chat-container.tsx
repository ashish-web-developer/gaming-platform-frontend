// types
import type { FC } from "react";
import type Colors from "@/types/data/colors";

// mui
import {
    Grid
} from "@mui/material"


// local components
import ChatSidebar from "./chat-sidebar";


// styles
import { StyledContainer } from "@/styles/components/chat/chat-container.style";


const ChatContainer:FC<{colors:Colors}> = (colors)=>{
    return(
        <StyledContainer>
            <Grid container >
                <Grid item xs = {4}>
                    <ChatSidebar colors = {colors}/>
                </Grid>
            </Grid>
        </StyledContainer>
    )
}

export default ChatContainer;