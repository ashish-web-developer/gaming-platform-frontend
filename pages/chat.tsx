import dynamic from "next/dynamic";
// local components
import ChatContainer from "@/components/chat/chat-container";
const MobileChatContainer = dynamic(
  () => import("@/components/chat/mobile-chat-container"),
  {
    ssr: false,
  }
);

// theme provider
import { ThemeProvider } from "styled-components";

// theme
import getTheme from "@/theme/chat.theme";

// redux
import { useAppSelector } from "@/hooks/redux";
import { mode } from "@/store/slice/common.slice";

// hooks
import { useIsMobile } from "@/hooks/common.hook";

const ChatPage = () => {
  const _mode = useAppSelector(mode);
  const theme = getTheme(_mode);
  const is_mobile = useIsMobile();

  return (
    <ThemeProvider theme={theme}>
      {is_mobile ? <MobileChatContainer /> : <ChatContainer />}
    </ThemeProvider>
  );
};

export default ChatPage;
