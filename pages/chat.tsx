// types
import type { NextPage, GetServerSideProps } from "next";
import type Colors from "@/types/data/colors";
import type { AxiosResponse } from "axios";
import type { User } from "@/types/user";

// Local components
import ChatContainer from "@/components/chat/chat-container";

// helpers package
import fs from "fs";
import path from "path";
import Cookies from "universal-cookie";
import axios from "axios";

// styled component
import { GlobalStyles } from "@/styles/pages/chat.style";

// redux
import { useAppDispatch } from "@/hooks/redux";
import { updateUsersList } from "@/store/slice/chat.slice";
import { useEffect } from "react";

const Chat: NextPage<{ colors: Colors; users: User[]; isMobile: boolean }> = ({
  colors,
  users,
  isMobile,
}) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(updateUsersList(users));
  }, []);
  return (
    <>
      <GlobalStyles />
      <ChatContainer colors={colors} users={users} isMobile={isMobile} />
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
    let colors:Colors|string = fs.readFileSync(dataFolderPath, "utf-8");
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
