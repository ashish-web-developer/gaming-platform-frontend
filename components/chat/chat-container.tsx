import dynamic from "next/dynamic";
import { useRef } from "react";

// types
import type { FC } from "react";
import type Colors from "@/types/data/colors";

// mui
import { Grid, IconButton } from "@mui/material";

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
  StyledChatContainerName,
} from "@/styles/components/chat/chat-container.style";

// react device detect
import { isMobile } from "react-device-detect";

// redux
import { useAppSelector } from "@/hooks/redux";
import { active_user } from "@/store/slice/chat.slice";
import { user } from "@/store/slice/user.slice";

// hooks
import { usePrivateChannel } from "@/hooks/pusher";
import { useConversation, useGetDefaultUser } from "@/hooks/chat";

// helpers
import { Axios } from "@/helpers/axios";

const ChatContainer: FC<{ colors: Colors }> = ({ colors }) => {
  const message = useRef<string | null>(null);
  const _active_user = useAppSelector(active_user);
  const _user = useAppSelector(user);
  usePrivateChannel(`chat`, `MemoryGameEvent`, function (data) {
    console.log("value of data", data);
  });
  useGetDefaultUser();
  useConversation();
  const handleSubmit = () => {
    Axios.post("/chat/send-message", {
      message: message.current,
      sender_id: _user.id,
      receiver_id: _active_user?.id,
    });
  };
  return (
    <>
      <StyledContainer>
        <Grid sx={{ height: "100%" }} container spacing={2}>
          <Grid sx={{ height: "100%" }} item xs={12} sm={3.5}>
            <ChatSidebar colors={colors} />
          </Grid>
          <Grid item xs={12} sm={6.5}>
            {_active_user && (
              <StyledChatContainer>
                <StyledChatContainerName>
                  {_active_user.name}
                </StyledChatContainerName>
                <StyledChatWrapper></StyledChatWrapper>
                <StyledChatInput
                  onChange={(event) => {
                    message.current = event.target.value;
                  }}
                  disableUnderline
                  placeholder="Your Message"
                  fullWidth
                  endAdornment={
                    <IconButton onClick={handleSubmit}>
                      <StyledSendIcon />
                    </IconButton>
                  }
                />
              </StyledChatContainer>
            )}
          </Grid>
        </Grid>
      </StyledContainer>
      {isMobile && <MobileBottomNav />}
    </>
  );
};

export default ChatContainer;
