import dynamic from "next/dynamic";
import { useRef } from "react";

// types
import type { FC } from "react";
import type { GetServerSideProps } from "next";
import type { IUser } from "@/types/store/slice/login";
import type {
  IUsersWithConversation,
  IConversation,
} from "@/types/store/slice/chat";
import type { IGroup } from "@/types/store/slice/group";

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
import { User } from "@/store/slice/login.slice";
import {
  activeUser,
  updateActiveUserConversation,
  updateDefaultUserConversation,
  updateConversationView,
  updateInviteDialog,
  updateActiveUserStatus,
  updateTypingUser,
} from "@/store/slice/chat.slice";

import {
  activeGroup,
  updateDefaultGroupLatestConversation,
  updateDefaultGroup,
  updateGroupsUsers,
  updateTypingUsers,
} from "@/store/slice/group.slice";
import { updatePokerRoomId } from "@/store/slice/poker/poker.slice";
import { updateCognimatchRoomId } from "@/store/slice/cognimatch.slice";

// hooks
import { useIsMobile } from "@/hooks/common.hook";
import { useDefault, useDefaultConversation } from "@/hooks/chat/chat.hook";
import {
  usePrivateChannel,
  usePresenceChannel,
  useNotificationChannel,
} from "@/hooks/pusher.hook";

interface IProps {
  is_mobile: boolean;
}

const ChatPage: FC<IProps> = ({ is_mobile }) => {
  const dispatch = useAppDispatch();
  const client_is_mobile = useIsMobile();
  const user = useAppSelector(User);
  const active_user = useAppSelector(activeUser);
  const active_group = useAppSelector(activeGroup);
  const timer_ref = useRef<NodeJS.Timer>();
  const group_timer_ref = useRef<{
    [key: number]: NodeJS.Timer;
  }>({});
  const _mode = useAppSelector(mode);
  useDefault();
  useDefaultConversation();
  useNotificationChannel<IUser | null>({
    dependency: user,
    channel_name: `notification.${user?.id}`,
  });

  /**
   * For handling the one to one chats
   */
  usePrivateChannel<IUser | null>({
    dependency: user,
    channel_name: `chat.${user?.id}`,
    events: [
      {
        event: "chat-event",
        handler: (data: { user: IUser; conversation: IConversation }) => {
          dispatch(updateDefaultUserConversation(data));
          if (data.user.id == active_user?.id) {
            dispatch(updateActiveUserConversation(data.conversation));
          }
        },
      },
      {
        event: "chat-view-event",
        handler: (data: { user: IUser; conversation: IConversation }) => {
          if (data.user.id == active_user?.id) {
            dispatch(updateConversationView(data.conversation));
          }
        },
      },
      {
        event: "group-access-given-event",
        handler: (data: { group: IGroup }) => {
          dispatch(updateDefaultGroup(data.group));
        },
      },
      {
        event: "group-joined-event",
        handler: (data: { group: IGroup }) => {
          dispatch(updateGroupsUsers(data.group));
        },
      },
      {
        event: "game-invitation-event",
        handler: (data: {
          receiver_id: number;
          user: IUser;
          game: "cognimatch" | "poker";
          room_id: string;
        }) => {
          dispatch(
            updateInviteDialog({
              modal_type: data.game,
              is_open: true,
            })
          );
          if (data.game == "cognimatch") {
            dispatch(updateCognimatchRoomId(data.room_id));
          } else if (data.game == "poker") {
            dispatch(updatePokerRoomId(data.room_id));
          }
        },
      },
      {
        event: "client-typing",
        handler: ({ user }: { user: IUser }) => {
          if (user.id == active_user?.id) {
            dispatch(
              updateTypingUser({
                user,
              })
            );
            timer_ref.current && clearTimeout(timer_ref.current);
            timer_ref.current = setTimeout(() => {
              dispatch(
                updateTypingUser({
                  user: null,
                })
              );
            }, 1000);
          }
        },
      },
    ],
  });

  /**
   * For handling the group related chats
   */
  usePresenceChannel<IGroup | null, { id: number }>({
    channel_name: `group-chat.${active_group?.id}`,
    events: [
      {
        event: "group-chat-event",
        handler: (data: { conversation: IConversation }) => {
          if (data.conversation.sender_id !== user?.id) {
            dispatch(updateActiveUserConversation(data.conversation));
            dispatch(updateDefaultGroupLatestConversation(data.conversation));
          }
        },
      },
      {
        event: "client-typing",
        handler: ({ user: typing_user }: { user: IUser }) => {
          if (typing_user.id !== user?.id) {
            dispatch(
              updateTypingUsers({
                user: typing_user,
                action_type: "add",
              })
            );
            typing_user.id in group_timer_ref.current &&
              clearTimeout(group_timer_ref.current[typing_user.id]);
            typing_user.id in group_timer_ref.current &&
              delete group_timer_ref.current[typing_user.id];
            group_timer_ref.current[typing_user.id] = setTimeout(() => {
              dispatch(
                updateTypingUsers({
                  user: typing_user,
                  action_type: "remove",
                })
              );
            }, 1000);
          }
        },
      },
    ],
    dependency: active_group,
    memberHandler: (member, action_type) => {},
  });

  /**
   * For handling the active use status
   * for one to one chat
   */

  usePresenceChannel<IUsersWithConversation | null, { id: number }>({
    channel_name: `user-status.${active_user?.id}`,
    events: [],
    dependency: active_user,
    memberHandler: (member, action_type) => {
      switch (action_type) {
        case "here":
          console.log(
            `value of ${action_type} data`,
            member.id,
            active_user?.id,
            member.id == active_user?.id
          );
          dispatch(updateActiveUserStatus(member.id == active_user?.id));
          break;
        case "added":
          console.log(
            `value of ${action_type} data`,
            member.id,
            active_user?.id,
            member.id == active_user?.id
          );
          dispatch(updateActiveUserStatus(member.id == active_user?.id));
        case "removed":
          console.log(
            `value of ${action_type} data`,
            member.id,
            active_user?.id,
            member.id == active_user?.id
          );
          dispatch(updateActiveUserStatus(!(member.id == active_user?.id)));
      }
    },
  });

  /**
   * For broadcasting the auth user status
   * for one to one conversation
   */

  usePresenceChannel<IUser | null, { id: number }>({
    channel_name: `user-status.${user?.id}`,
    events: [],
    dependency: user,
    memberHandler: () => {},
  });

  return (
    <ThemeProvider theme={_mode == "light" ? lightTheme : darkTheme}>
      {client_is_mobile || is_mobile ? (
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
