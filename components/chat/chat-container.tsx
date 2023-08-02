import dynamic from "next/dynamic";


// types
import type { FC } from "react";
import type Colors from "@/types/data/colors";

// mui
import { Grid } from "@mui/material";

// local components
import ChatSidebar from "./chat-sidebar";
const MobileBottomNav = dynamic(()=>import("@/components/chat/mobile-navigation"))

// styles
import { StyledContainer } from "@/styles/components/chat/chat-container.style";

// react device detect
import { isMobile } from "react-device-detect";


const ChatContainer: FC<{ colors: Colors }> = ({ colors }) => {
  return (
    <>
    <StyledContainer>
      <Grid container>
        <Grid item xs = {12} sm={3.5}>
          <ChatSidebar colors={colors} />
        </Grid>
        <Grid item xs = {12} sm = {6.5}> 
        </Grid>
      </Grid>
    </StyledContainer>
    {isMobile && <MobileBottomNav/>}
    </>
  );
};

export default ChatContainer;
