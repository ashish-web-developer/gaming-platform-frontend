import dynamic from "next/dynamic";
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
import { useAppSelector } from "@/hooks/redux.hook";
import { mode } from "@/store/slice/common.slice";

// hooks
import { useIsMobile } from "@/hooks/common.hook";

const ChatPage = () => {
  const _mode = useAppSelector(mode);
  const is_mobile = useIsMobile();

  return (
    <ThemeProvider theme={_mode == "light" ? lightTheme : darkTheme}>
      {is_mobile ? <MobileChatContainer /> : <ChatContainer />}
    </ThemeProvider>
  );
};

export default ChatPage;
