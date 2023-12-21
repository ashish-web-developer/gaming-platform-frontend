// types
import type { FC } from "react";

// styled components
import {
  StyledMobileChatContainer,
  StyledDivider,
  StyledMainContainer,
  StyledBottomContainer,
  StyledInvitationCta,
} from "@/styles/components/chat/mobile-chat-container.style";

// styled theme
import { useTheme } from "styled-components";

// local components
import MobileChatHeader from "@/components/chat/chat-header/mobile/mobile-chat-header";
import ChatUsersList from "@/components/chat/chat-sidebar/chat-users-list/chat-users-list";
import MobileChatMessageContainer from "@/components/chat/chat-message-container/mobile/mobile-chat-message-container";
import ChatInput from "@/components/chat/chat-input/chat-input";

// redux
import { useAppSelector } from "@/hooks/redux";
import { show_chat } from "@/store/slice/chat.slice";

// hooks
import { useDefaultUser } from "@/hooks/chat/chat.hook";

// icon
import GameIcon from "@/components/chat/chat-input/icon/game-icon";

const MobileChatContainer: FC = () => {
  const theme = useTheme();
  const _show_chat = useAppSelector(show_chat);
  useDefaultUser();
  return (
    <StyledMobileChatContainer>
      <div id="search-dialog-container"></div>
      <MobileChatHeader />
      {!_show_chat && (
        <>
          <StyledDivider />
          <ChatUsersList />
        </>
      )}
      {_show_chat && (
        <StyledMainContainer>
          <MobileChatMessageContainer />
          <StyledBottomContainer>
            <ChatInput />
            <StyledInvitationCta>
              <GameIcon
                color={theme.palette.secondary.main}
                width={40}
                height={25}
              />
            </StyledInvitationCta>
          </StyledBottomContainer>
        </StyledMainContainer>
      )}
    </StyledMobileChatContainer>
  );
};

export default MobileChatContainer;
