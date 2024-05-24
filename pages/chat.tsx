import dynamic from "next/dynamic";
import { useRouter } from "next/router";

// types
import type { FC } from "react";
import type { GetServerSideProps } from "next";
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
  updateInviteDialog,
  updateActiveUserStatus,
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

interface IProps {
  is_mobile: boolean;
}

const ChatPage: FC<IProps> = ({ is_mobile }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const client_is_mobile = useIsMobile();
  const _user = useAppSelector(user);
  const _active_user = useAppSelector(active_user);
  const _active_group = useAppSelector(active_group);
  const _mode = useAppSelector(mode);
  useDefault();
  useDefaultConversation();
  useNotificationChannel();
  /**
   * To handle personal chat
   */
  usePrivateChannel({
    channel: _user.id ? `chat.${_user.id}` : null,
    events: [
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
      {
        event: "Game.PlayGameInvitationEvent",
        callback: (data: {
          receiver_id: number;
          user: IUsersWithConversation;
          game: "cognimatch" | "poker";
          room_id: string;
        }) => {
          dispatch(
            updateInviteDialog({
              modal_type: data.game,
              is_open: true,
            })
          );
          dispatch(updateRoomId(data.room_id));
          if (data.game == "cognimatch") {
            dispatch(updateGamingUser(data.user));
          }
        },
      },
      {
        event: "Game.AcceptGameInvitationEvent",
        callback: (data: {
          is_accepted: boolean;
          user: IUsersWithConversation;
        }) => {
          if (data.is_accepted) {
            dispatch(updateGamingUser(data.user));
            router.push("/memory-game");
          }
        },
      },
    ],
  });
  /**
   * To handle group chat
   */
  usePresenceChannel<IGroup | null>({
    channel: _active_group ? `group-chat.${_active_group?.id}` : null,
    handler: (user_ids, type) => {},
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
  });

  /**
   * To handle the active user status
   */
  usePresenceChannel<IUsersWithConversation | null>({
    channel: _active_user ? `user-status.${_active_user.id}` : null,
    handler: (user_ids, type, active_user) => {
      switch (type) {
        case "here":
          dispatch(
            updateActiveUserStatus(
              Array.isArray(user_ids)
                ? user_ids.some((user) => user.id == active_user?.id)
                : user_ids.id == active_user?.id
            )
          );
          return;
        case "joining":
          dispatch(
            updateActiveUserStatus(
              Array.isArray(user_ids)
                ? user_ids.some((user) => user.id == active_user?.id)
                : user_ids.id == active_user?.id
            )
          );
          return;
        case "leaving":
          dispatch(
            updateActiveUserStatus(
              !(Array.isArray(user_ids)
                ? user_ids.some((user) => user.id == active_user?.id)
                : user_ids.id == active_user?.id)
            )
          );
          return;
      }
    },
    events: [],
    dependency: _active_user,
  });

  /**
   * To send the user status to active user
   */
  usePresenceChannel({
    channel: _user ? `user-status.${_user.id}` : null,
    handler: (user_ids) => {},
    events: [],
  });
  return (
    <ThemeProvider theme={_mode == "light" ? lightTheme : darkTheme}>
      {is_mobile || client_is_mobile ? (
        <MobileChatContainer />
      ) : (
        <ChatContainer />
      )}
    </ThemeProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const user_agent = context.req.headers["user-agent"];
  const is_mobile = /Mobi|Android/i.test(user_agent as string);
  return {
    props: {
      is_mobile,
    },
  };
};

export default ChatPage;
