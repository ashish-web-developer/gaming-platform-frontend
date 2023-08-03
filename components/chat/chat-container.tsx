import dynamic from "next/dynamic";

// types
import type { FC } from "react";
import type Colors from "@/types/data/colors";

// mui
import { Grid, Box } from "@mui/material";

// local components
import ChatSidebar from "./chat-sidebar";
const MobileBottomNav = dynamic(
  () => import("@/components/chat/mobile-navigation")
);

// styled components
import {
  StyledContainer,
  StyledChatContainer,
  StyledChatWrapper,
  StyledChatInput,
  StyledSendIcon,
} from "@/styles/components/chat/chat-container.style";

// react device detect
import { isMobile } from "react-device-detect";

const ChatContainer: FC<{ colors: Colors }> = ({ colors }) => {
  return (
    <>
      <StyledContainer>
        <Grid sx={{ height: "100%" }} container spacing={2}>
          <Grid sx={{ height: "100%" }} item xs={12} sm={3.5}>
            <ChatSidebar colors={colors} />
          </Grid>
          <Grid item xs={12} sm={6.5}>
            {
              <StyledChatContainer>
                <StyledChatWrapper></StyledChatWrapper>
                <StyledChatInput
                  disableUnderline
                  placeholder="Your Message"
                  fullWidth
                  endAdornment={<StyledSendIcon />}
                />
              </StyledChatContainer>
            }
          </Grid>
        </Grid>
      </StyledContainer>
      {isMobile && <MobileBottomNav />}
    </>
  );
};

export default ChatContainer;
