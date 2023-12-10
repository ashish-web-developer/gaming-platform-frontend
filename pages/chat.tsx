// types
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";

// local components
import ChatContainer from "@/components/chat/chat-container";
import MobileChatContainer from "@/components/chat/mobile-chat-container";

// theme provider
import { ThemeProvider } from "styled-components";

// theme
import getTheme from "@/theme/chat.theme";

// redux
import { useAppSelector } from "@/hooks/redux";
import { mode } from "@/store/slice/common.slice";

export const getServerSideProps: GetServerSideProps<{
  is_mobile: boolean;
}> = async (context: GetServerSidePropsContext) => {
  const userAgent = context.req.headers["user-agent"] as string;
  const is_mobile = /mobile/i.test(userAgent);
  return {
    props: {
      is_mobile,
    },
  };
};
const ChatPage = ({
  is_mobile,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const _mode = useAppSelector(mode);
  const theme = getTheme(_mode);
  return (
    <ThemeProvider theme={theme}>
      {is_mobile ? <MobileChatContainer /> : <ChatContainer />}
    </ThemeProvider>
  );
};

export default ChatPage;
