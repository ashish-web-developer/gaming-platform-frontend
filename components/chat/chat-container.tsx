import { useRouter } from "next/router";
// types
import type { FC } from "react";
import type { Theme } from "@/theme/chat.theme";
import type {
  IUsersWithConversation,
  IConversation,
} from "@/types/store/slice/chat";
// styled components
import {
  StyledPage,
  StyledChatContainer,
  StyledChatMainContainer,
  StyledChatMainContentContainer,
  StyledChatMainContent,
  StyledMessageContainer,
  StyledMessageInputContainer,
  StyledThemeTogglerIcon,
  StyledNotificationContainer,
  StyledNotificationHeading,
} from "@/styles/components/chat/chat-container.style";

// local components
import ChatHeader from "@/components/chat/chat-header/chat-header";
import ChatSidebar from "@/components/chat/chat-sidebar/chat-sidebar";
import ChatMessageContainer from "@/components/chat/chat-message-container/chat-message-container";
import ChatInput from "@/components/chat/chat-input/chat-input";
import InvitationCard from "@/components/common/invitation-card";
import UploadProfileModal from "@/components/common/user-profile/upload-profile-modal";

// theme
import { useTheme } from "styled-components";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import {
  active_user,
  show_memory_game_snackbar,
  updateActiveUserConversation,
  updateDefaultUserConversation,
  updateConversationView,
  updateShowMemoryGameSnackbar,
} from "@/store/slice/chat.slice";
import {
  show_profile_upload_modal,
  updateMode,
} from "@/store/slice/common.slice";
import { user } from "@/store/slice/user.slice";
import { mode } from "@/store/slice/common.slice";

// hooks
import {
  useDefaultUser,
  useFirstUserConversation,
} from "@/hooks/chat/chat.hook";
import { usePrivateChannel } from "@/hooks/pusher.hook";
import { updateGamingUser, updateRoomId } from "@/store/slice/game.slice";

const ThemeTogglerIcon: FC<{
  color: string;
  width: number;
  height: number;
}> = ({ color, width, height }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 44 46"
    >
      <path
        fill={color}
        d="M27.25 45.245c6.797-1.198 12.457-5.403 15.672-11.223.476-.861-.382-1.845-1.29-1.5-10.332 3.933-21.605-2.578-23.518-13.43A17.633 17.633 0 0124.19 2.456c.75-.624.316-1.858-.663-1.867a22.449 22.449 0 00-4.092.34C7.27 3.074-.855 14.726 1.304 26.973c2.156 12.231 13.765 20.42 25.945 18.272z"
      ></path>
    </svg>
  );
};

const ChatContainer: FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const theme = useTheme() as Theme;
  const _mode = useAppSelector(mode);
  const _user = useAppSelector(user);
  const _active_user = useAppSelector(active_user);
  const _show_memory_game_snackbar = useAppSelector(show_memory_game_snackbar);
  const _show_profile_upload_modal = useAppSelector(show_profile_upload_modal);
  useDefaultUser();
  useFirstUserConversation();
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
        }
      },
    },
  ]);
  return (
    <StyledPage $background_image={_mode == "light" ? true : false}>
      <StyledThemeTogglerIcon
        onClick={() =>
          dispatch(updateMode(_mode == "light" ? "dark" : "light"))
        }
      >
        <ThemeTogglerIcon
          width={40}
          height={45}
          color={
            _mode == "dark"
              ? theme.palette.primary.light
              : theme.palette.primary.dark
          }
        />
      </StyledThemeTogglerIcon>
      <StyledChatContainer>
        <ChatHeader />
        <StyledChatMainContainer>
          <ChatSidebar />
          <StyledChatMainContentContainer $mode={_mode}>
            <StyledChatMainContent>
              <StyledMessageContainer>
                <ChatMessageContainer />
              </StyledMessageContainer>
              <StyledMessageInputContainer>
                <ChatInput />
              </StyledMessageInputContainer>
            </StyledChatMainContent>
          </StyledChatMainContentContainer>
          <UploadProfileModal key={Number(_show_profile_upload_modal)} />
          {_show_memory_game_snackbar && (
            <StyledNotificationContainer>
              <StyledNotificationHeading $mode={_mode}>
                Notifications
                <InvitationCard />
              </StyledNotificationHeading>
            </StyledNotificationContainer>
          )}
        </StyledChatMainContainer>
      </StyledChatContainer>
    </StyledPage>
  );
};

export default ChatContainer;
