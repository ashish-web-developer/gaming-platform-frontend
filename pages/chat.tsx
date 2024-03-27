import dynamic from "next/dynamic";
import { useRouter } from "next/router";

// types
import type {
  IUsersWithConversation,
  IConversation,
} from "@/types/store/slice/chat";
import { IGroup } from "@/types/store/slice/group";

// local components
import ChatContainer from "@/components/chat/chat-container";
const MobileChatContainer = dynamic(
  () => import("@/components/chat/mobile-chat-container"),
  {
    ssr: false,
  }
);

// themes
import { darkTheme, lightTheme } from "@/theme/chat.theme";
// theme provider
import { ThemeProvider } from "styled-components";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import { mode } from "@/store/slice/common.slice";
import { user } from "@/store/slice/user.slice";
import {
  active_user,
  updateActiveUserConversation,
  updateDefaultUserConversation,
  updateConversationView,
  updateShowMemoryGameSnackbar,
} from "@/store/slice/chat.slice";

import {
  usePrivateChannel,
  usePresenceChannel,
  useNotificationChannel,
} from "@/hooks/pusher.hook";
import { updateGamingUser, updateRoomId } from "@/store/slice/game.slice";
import {
  active_group,
  updateDefaultGroupLatestConversation,
  updateDefaultGroup,
  updateGroupsUsers,
} from "@/store/slice/group.slice";

// hooks
import { useIsMobile } from "@/hooks/common.hook";
import { useDefault, useDefaultConversation } from "@/hooks/chat/chat.hook";

const ChatPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const _user = useAppSelector(user);
  const _active_user = useAppSelector(active_user);
  const _active_group = useAppSelector(active_group);
  const _mode = useAppSelector(mode);
  const is_mobile = useIsMobile();
  useDefault();
  useDefaultConversation();
  useNotificationChannel();
  usePrivateChannel(`chat.${_user.id}`, [
    {
      event: "Chat.ChatEvent",
      callback: (data: {
        user: IUsersWithConversation;
        conversation: IConversation;
      }) => {
        dispatch(updateDefaultUserConversation(data));
        if (data.user.id == _active_user?.id) {
          console.log("value of conversation", data.conversation);
          dispatch(updateActiveUserConversation(data.conversation));
        }
      },
    },
    {
      event: "Chat.ChatViewEvent",
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
    {
      event: "Group.GroupAccessGiven",
      callback: (data: { group: IGroup }) => {
        dispatch(updateDefaultGroup(data.group));
      },
    },
    {
      event: "Group.GroupJoinedEvent",
      callback: (data: { group: IGroup }) => {
        dispatch(updateGroupsUsers(data.group));
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
            dispatch(updateDefaultGroupLatestConversation(data.conversation));
          }
        },
      },
    ],
    dependency: _active_group,
  });

  return (
    <ThemeProvider theme={_mode == "light" ? lightTheme : darkTheme}>
      {is_mobile ? <MobileChatContainer /> : <ChatContainer />}
    </ThemeProvider>
  );
};

export default ChatPage;
