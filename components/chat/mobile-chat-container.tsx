import { useRouter } from "next/router";
// types
import type { FC } from "react";
import type {
  IUsersWithConversation,
  IConversation,
} from "@/types/store/slice/chat";

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
import MemoryGameInvitationDrawer from "@/components/chat/chat-game-invitation/memory-game-invitation-drawer";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import {
  show_chat,
  show_memory_game_snackbar,
  active_user,
  updateDefaultUserConversation,
  updateActiveUserConversation,
  updateConversationView,
  updateShowMemoryGameSnackbar,
} from "@/store/slice/chat.slice";
import { user } from "@/store/slice/user.slice";
import {
  updateRoomId,
  udpateIsProposalSender,
  updateGamingUser,
} from "@/store/slice/game.slice";
import { sendInvitationApi } from "@/store/slice/chat.slice";

// hooks
import { useDefaultUser } from "@/hooks/chat/chat.hook";
import { usePrivateChannel } from "@/hooks/pusher.hook";

// icon
import GameIcon from "@/components/chat/chat-input/icon/game-icon";

// helpers package
import { v4 as uuidv4 } from "uuid";

const MobileChatContainer: FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const _active_user = useAppSelector(active_user);
  const _user = useAppSelector(user);
  const _show_memory_game_snackbar = useAppSelector(show_memory_game_snackbar);
  const _show_chat = useAppSelector(show_chat);
  useDefaultUser();
  usePrivateChannel(`chat.${_user.id}`, [
    {
      event: "ChatEvent",
      callback: (data: {
        user: IUsersWithConversation;
        conversation: IConversation;
      }) => {
        dispatch(updateDefaultUserConversation(data));
        if (data.user.id == _active_user?.id) {
          dispatch(updateActiveUserConversation(data.conversation));
        }
      },
    },
    {
      event: "ChatViewEvent",
      callback: (data: {
        user: IUsersWithConversation;
        conversation: IConversation;
      }) => {
        if (data.user.id == _active_user?.id) {
          dispatch(updateConversationView(data.conversation));
        }
      },
    },
    {
      event: "PlayGameInvitationEvent",
      callback: (data: {
        game: string;
        receiver_id: number;
        room_id: string;
        user: IUsersWithConversation;
      }) => {
        dispatch(updateGamingUser(data.user));
        dispatch(updateRoomId(data.room_id));
        dispatch(updateShowMemoryGameSnackbar(true));
      },
    },
    {
      event: "AcceptGameInvitationEvent",
      callback: (data: {
        user: IUsersWithConversation;
        is_accepted: boolean;
      }) => {
        if (data.is_accepted) {
          dispatch(updateGamingUser(data.user));
          router.push("/memory-game");
        } else {
          dispatch(updateRoomId(null));
          dispatch(udpateIsProposalSender(false));
        }
      },
    },
  ]);
  return (
    <StyledMobileChatContainer>
      {_show_memory_game_snackbar && <MemoryGameInvitationDrawer />}
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
            <StyledInvitationCta
              onClick={() => {
                let room_id = uuidv4();
                dispatch(updateRoomId(room_id));
                dispatch(sendInvitationApi({ game: "memory-game" }));
                dispatch(udpateIsProposalSender(true));
              }}
            >
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
