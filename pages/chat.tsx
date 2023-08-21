import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, createContext } from "react";
// types
import type { NextPage, GetServerSideProps } from "next";
import type Colors from "@/types/data/colors";
import type { AxiosResponse } from "axios";
import type { User } from "@/types/user";
import type { Conversation } from "@/types/store/slice/chat";

// Local components
import ChatContainer from "@/components/chat/chat-container";
const MobileChat = dynamic(
  () => import("@/components/chat/mobile/mobile-chat"),
  {
    ssr: true,
  }
);

// helpers package
import fs from "fs";
import path from "path";
import Cookies from "universal-cookie";
import axios from "axios";

// styled component
import { GlobalStyles } from "@/styles/pages/chat.style";

// redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  updateUsersList,
  updateActiveUserConversation,
  updateActiveUser,
} from "@/store/slice/chat.slice";
import { user } from "@/store/slice/user.slice";
import { active_user } from "@/store/slice/chat.slice";
import {
  updateGamingUser,
  updateShowSnackbar,
  updateRoomId,
} from "@/store/slice/memory-game.slice";

// hooks
import { useConversation } from "@/hooks/chat";
import { usePrivateChannel } from "@/hooks/pusher";

export const ColorContext = createContext<Colors>([]);

const Chat: NextPage<{ colors: Colors; users: User[]; isMobile: boolean }> = ({
  colors,
  users,
  isMobile,
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const _user = useAppSelector(user);
  const _active_user = useAppSelector(active_user);
  usePrivateChannel(`chat.${_user.id}`, [
    {
      event: "ChatEvent",
      callback: (data: { user: User; conversation: Conversation }) => {
        if (data.user.id == _active_user?.id) {
          dispatch(updateActiveUserConversation(data.conversation));
        }
      },
    },
    {
      event: "PlayGameInvitationEvent",
      callback: (data: { game: string; user: User; room_id: string }) => {
        dispatch(updateShowSnackbar(true));
        dispatch(updateGamingUser(data.user));
        dispatch(updateRoomId(data.room_id));
      },
    },
    {
      event: "AcceptGameInvitationEvent",
      callback: (data: { user: User; is_accepted: boolean }) => {
        if (data.is_accepted) {
          dispatch(updateGamingUser(data.user));
          router.push("/memory-game");
        } else {
          dispatch(updateGamingUser(null));
          dispatch(updateRoomId(null));
        }
      },
    },
  ]);

  useConversation();
  useEffect(() => {
    dispatch(updateUsersList(users));
    if (users.length) {
      dispatch(updateActiveUser(users[0]));
    }
  }, []);
  return (
    <>
      <GlobalStyles />
      <ColorContext.Provider value={colors}>
        {isMobile ? (
          <MobileChat users={users} />
        ) : (
          <ChatContainer users={users} />
        )}
      </ColorContext.Provider>
    </>
  );
};

/**
 * fetching the default users data,
 * and list of the colors
 *
 */
export const getServerSideProps: GetServerSideProps<{
  users: User[];
  colors: any;
}> = async (context) => {
  // getting all the colors
  try {
    const dataFolderPath = path.join(process.cwd(), "./data/colors.json");
    let colors: Colors | string = fs.readFileSync(dataFolderPath, "utf-8");
    colors = JSON.parse(colors) as Colors;

    // Getting the list of default user;
    const cookies = new Cookies(context.req.headers.cookie);
    const token = cookies.get("token");
    const userAgent = context.req.headers["user-agent"] as string;
    const isMobile = /mobile/i.test(userAgent);
    const response: AxiosResponse<{
      success: boolean;
      users: User[];
    }> = await axios.get(
      `${process.env.NEXT_PUBLIC_API_END_POINT}/api/chat/get-user`,
      {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const users = response.data.users;
    return {
      props: {
        users,
        colors,
        isMobile,
      },
    };
  } catch (error) {
    return {
      props: {
        users: [],
        colors: [],
      },
    };
  }
};

export default Chat;
