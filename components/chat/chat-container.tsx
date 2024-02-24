import { useRouter } from "next/router";
// types
import type { FC } from "react";
import type { Theme } from "@/theme/chat.theme";
import type {
  IUsersWithConversation,
  IConversation,
  IGroup,
} from "@/types/store/slice/chat";
// styled components
import {
  StyledPage,
  StyledChatContainer,
  StyledChatMainContainer,
  StyledChatMainContentContainer,
  StyledMessageWrapper,
  StyledChatInputWrapper,
  StyledNotificationContainer,
  StyledGroupSuggestionContainer,
  StyledNotificationHeading,
} from "@/styles/components/chat/chat-container.style";

// local components
import ChatHeader from "@/components/chat/chat-header/chat-header";
import ChatSidebar from "@/components/chat/chat-sidebar/chat-sidebar";
import ChatMessageContainer from "@/components/chat/chat-message-container/chat-message-container";
import ChatInput from "@/components/chat/chat-input/chat-input";
import InvitationCard from "@/components/common/invitation-card";
import GroupSuggestion from "@/components/chat/group-suggestion/group-suggestion";

// theme
import { useTheme } from "styled-components";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import {
  // state
  active_user,
  active_group,
  show_memory_game_snackbar,
  // action
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
import { useDefault, useFirstUserConversation } from "@/hooks/chat/chat.hook";
import { usePrivateChannel, usePresenceChannel } from "@/hooks/pusher.hook";
import { updateGamingUser, updateRoomId } from "@/store/slice/game.slice";

const ChatContainer: FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const theme = useTheme() as Theme;
  const _mode = useAppSelector(mode);
  const _user = useAppSelector(user);
  const _active_user = useAppSelector(active_user);
  const _active_group = useAppSelector(active_group);
  const _show_memory_game_snackbar = useAppSelector(show_memory_game_snackbar);
  const _show_profile_upload_modal = useAppSelector(show_profile_upload_modal);
  useDefault();
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

  usePresenceChannel<IGroup | null>({
    channel: `group-chat.${_active_group?.id}`,
    handler: (user_ids, type, active_group) => {
      console.log("user connected", user_ids, type);
    },
    events: [
      {
        event: "Chat.GroupChatEvent",
        callback: (data: { conversation: IConversation }) => {
          if (data.conversation.sender_id !== _user.id) {
            dispatch(updateActiveUserConversation(data.conversation));
          }
        },
      },
    ],
    dependency: _active_group,
  });
  return (
    <StyledPage $background_image={_mode == "light" ? true : false}>
      <div id="upload-profile-modal-container"></div>
      <StyledChatContainer>
        <ChatHeader />
        <StyledChatMainContainer>
          <ChatSidebar />
          <StyledChatMainContentContainer $mode={_mode}>
            <StyledMessageWrapper>
              <ChatMessageContainer />
            </StyledMessageWrapper>
            <StyledChatInputWrapper>
              <ChatInput />
            </StyledChatInputWrapper>
          </StyledChatMainContentContainer>
          {/* {_show_memory_game_snackbar && (
            <StyledNotificationContainer>
              <StyledNotificationHeading $mode={_mode}>
                Notifications
                <InvitationCard />
              </StyledNotificationHeading>
            </StyledNotificationContainer>
          )} */}
          <StyledGroupSuggestionContainer>
            <GroupSuggestion />
          </StyledGroupSuggestionContainer>
        </StyledChatMainContainer>
      </StyledChatContainer>
    </StyledPage>
  );
};

export default ChatContainer;
