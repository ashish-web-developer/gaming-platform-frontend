// types
import type { NextPage } from "next";

// local components
import ChatContainer from "@/components/chat/chat-container";

// theme provider
import { ThemeProvider } from "styled-components";

// theme
import getTheme from "@/theme/chat.theme";

// redux
import { useAppSelector } from "@/hooks/redux";
import { mode } from "@/store/slice/common.slice";

const ChatPage: NextPage = () => {
  const _mode = useAppSelector(mode);
  const theme = getTheme(_mode);
  return (
    <ThemeProvider theme={theme}>
      <ChatContainer />
    </ThemeProvider>
  );
};

export default ChatPage;
